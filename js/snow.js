const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = "snow-canvas";
document.body.appendChild(renderer.domElement);
// круглая снежинка
function createSnowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.5, "rgba(255,255,255,.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}
// снег
const snowCount = 5000;
const positions = new Float32Array(snowCount * 3);
const speeds = [];
for (let i = 0; i < snowCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 3000;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 3000;
  speeds.push(1 + Math.random() * 3);
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({
  map: createSnowTexture(),
  size: 10,
  transparent: true,
  depthWrite: false
});
const snow = new THREE.Points(geometry, material);
scene.add(snow);
// камера
let targetYaw = 0;
let yaw = 0;
$(window).on("mousemove", function(e) {
  const percent = e.clientX / window.innerWidth;
  targetYaw = (percent - 0.5) * Math.PI / 2;
});
// animate
function animate() {
  requestAnimationFrame(animate);
  yaw += (targetYaw - yaw) * 0.05;
  const radius = 600;
  camera.position.x = Math.sin(yaw) * radius;
  camera.position.z = Math.cos(yaw) * radius;
  camera.lookAt(0, 0, 0);
  const pos = geometry.attributes.position.array;
  for (let i = 0; i < snowCount; i++) {
    const x = i * 3;
    const y = x + 1;
    pos[y] -= speeds[i];
    pos[x] += Math.sin(performance.now() * 0.001 + i) * 0.03;
    if (pos[y] < -1000) {
      pos[y] = 1000;
      pos[x] = (Math.random() - 0.5) * 3000;
    }
  }
  geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}
animate();
// resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});