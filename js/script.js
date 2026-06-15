$(document).ready(function() {
  const controls = {
    audio: $("#musica")[0],
    playpause: $("#playpause")
  };
  controls.playpause.on("click", function() {
    const isPaused = controls.audio.paused;
    if (isPaused) {
      controls.audio.play();
    } else {
      controls.audio.pause();
      controls.audio.currentTime = 0;
    }
    $(this).find(".icon-play").toggle(!isPaused).end().find(".icon-pause").toggle(isPaused);
  });
  const modal = $('.modal');
  const modalClose = $('.modal_close');

  function closeModal() {
    modal.removeClass('active');
  }
  $(controls.audio).on("ended", function() {
    controls.playpause.find(".icon-play").show();
    controls.playpause.find(".icon-pause").hide();
    modal.addClass('active');
  });
  modalClose.on('click', closeModal);
  modal.on('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });
  $(document).on('keyup', function(e) {
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
  var year = function() {
    return new Date().getFullYear();
  };
  $('.year').text(year());
});