// https://seblee.me/2010/11/javascript-html5-canvas-snow-in-3d/
// Particle3D class

Particle3D = function (material ) {

  THREE.Particle.call( this, material );
  
  //this.material = material instanceof Array ? material : [ material ];
  
  // define properties
  this.velocity = new THREE.Vector3(0,-8,0);
  this.velocity.rotateX(randomRange(-45,45)); 
  this.velocity.rotateY(randomRange(0,360)); 
  this.gravity = new THREE.Vector3(0,0,0); 
  this.drag = 1; 
  // methods... 
  
};

Particle3D.prototype = new THREE.Particle();
Particle3D.prototype.constructor = Particle3D;

Particle3D.prototype.updatePhysics = function() {
  
  this.velocity.multiplyScalar(this.drag); 
  this.velocity.addSelf(this.gravity);
  this.position.addSelf(this.velocity);

}

var TO_RADIANS = Math.PI/180; 

THREE.Vector3.prototype.rotateY = function(angle){
          
  cosRY = Math.cos(angle * TO_RADIANS);
  sinRY = Math.sin(angle * TO_RADIANS);
  
  var tempz = this.z;; 
  var tempx = this.x; 

  this.x= (tempx*cosRY)+(tempz*sinRY);
  this.z= (tempx*-sinRY)+(tempz*cosRY);


}

THREE.Vector3.prototype.rotateX = function(angle){
          
  cosRY = Math.cos(angle * TO_RADIANS);
  sinRY = Math.sin(angle * TO_RADIANS);
  
  var tempz = this.z;; 
  var tempy = this.y; 

  this.y= (tempy*cosRY)+(tempz*sinRY);
  this.z= (tempy*-sinRY)+(tempz*cosRY);


}

THREE.Vector3.prototype.rotateZ = function(angle){
          
  cosRY = Math.cos(angle * TO_RADIANS);
  sinRY = Math.sin(angle * TO_RADIANS);
  
  var tempx = this.x;; 
  var tempy = this.y; 

  this.y= (tempy*cosRY)+(tempx*sinRY);
  this.x= (tempy*-sinRY)+(tempx*cosRY);
    

}



// returns a random number between the two limits provided 
function randomRange(min, max)
{
  return ((Math.random()*(max-min)) + min); 
}

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var container;

var particle;

var camera;
var scene;
var renderer;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var particles = []; 
var particleImage = new Image();
particleImage.src = 'data:image/png;base64,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'; 

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
  camera.position.z = 1000;

  scene = new THREE.Scene();
  scene.add(camera);

  renderer = new THREE.CanvasRenderer();
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  var material = new THREE.ParticleBasicMaterial({ map: new THREE.Texture(particleImage) });

  for (var i = 0; i < 150; i++) {
    particle = new Particle3D(material);
    particle.position.x = Math.random() * 2000 - 1000;
    particle.position.y = Math.random() * 2000 - 1000;
    particle.position.z = Math.random() * 2000 - 1000;
    particle.scale.x = particle.scale.y = 1;
    scene.add(particle);

    particles.push(particle);
  }

  container.appendChild(renderer.domElement);
  container.addEventListener('touchstart', function(e) { e.preventDefault(); });
  container.addEventListener('touchmove', function(e) { e.preventDefault(); });
  container.addEventListener('touchend', function(e) { e.preventDefault(); });

  container.className = "snow-panel";

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);

  // setInterval( loop, 2000 / 60 );

  function animate() {
    requestAnimationFrame(animate);
    loop();
  }
  animate();
}


function onDocumentMouseMove(event) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {

  if (event.touches.length == 1) {

    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function onDocumentTouchMove(event) {

  if (event.touches.length == 1) {

    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function loop() {

  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    particle.updatePhysics();

    with(particle.position) {
      if (y < -1000) y += 2000;
      if (x > 1000) x -= 2000;
      else if (x < -1000) x += 2000;
      if (z > 1000) z -= 2000;
      else if (z < -1000) z += 2000;
    }
  }

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

function isEnabled(page, array) {
  if (!Array.isArray(array)) {
    return true;
  } else {
    for (var i = 0; i < array.length; i++) {
      if (page.indexOf(array[i]) >= 0) {
        return true;
      }
    }
  }
  return false;
}

function onWindowResize() {
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;

  // Обновление размеров камеры
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();

  // Обновление размеров рендера
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
}

jQuery(document).ready(function() {
  var $ = jQuery;
  // инициализация снега
  init();

  // Обновление размеров рендера при изменении размеров окна
  $(window).on("resize", onWindowResize);
});
