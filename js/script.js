$(document).ready(function() {
  const controls = {
    audio: $("#musica")[0],
    playpause: $("#playpause"),
    wakeLock: null
  };
  async function requestWakeLock() {
    if (!controls.wakeLock) {
      controls.wakeLock = await navigator.wakeLock.request('screen');
    }
  }

  function releaseWakeLock() {
    if (controls.wakeLock) {
      controls.wakeLock.release();
      controls.wakeLock = null;
    }
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
  });
  controls.playpause.on("click", () => {
    const isPaused = controls.audio.paused;
    if (isPaused) {
      controls.audio.play();
    } else {
      controls.audio.pause();
      controls.audio.currentTime = 0;
    }
  });
  $(controls.audio).on("play", () => {
    requestWakeLock();
    controls.playpause.find(".icon-play").hide();
    controls.playpause.find(".icon-pause").show();
  });
  $(controls.audio).on("pause", () => {
    releaseWakeLock();
    controls.playpause.find(".icon-play").show();
    controls.playpause.find(".icon-pause").hide();
  });
  const modal = $('.modal');
  const modalClose = $('.modal_close');

  function closeModal() {
    modal.removeClass('active');
  }
  $(controls.audio).on("ended", () => {
    releaseWakeLock();
    controls.playpause.find(".icon-play").show();
    controls.playpause.find(".icon-pause").hide();
    modal.addClass('active');
  });
  modalClose.on('click', closeModal);
  // modal.on('click', function(e) {
  //   if (e.target === this) {
  //     closeModal();
  //   }
  // });
  modal.on('click', (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  });
  $(document).on('keyup', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  const inverno = $('#inverno');
  const pupazzo = $('#pupazzo_di_neve');
  inverno.on('click', function() {
    inverno.animate({ bottom: '-155px' }, 700, function() {
      pupazzo.css('bottom', '0').addClass('animate').one('animationend', function() {
        $(this).removeClass('animate');
      });
    });
  });
  pupazzo.on('click', function() {
    $(this).animate({ bottom: '-96px' }, 700);
    inverno.animate({ bottom: '0' }, 700);
  });
  var year = () => {
    return new Date().getFullYear();
  };
  $('.year').text(year());
});