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
  $(controls.audio).on("ended", function() {
    controls.playpause.find(".icon-play").show();
    controls.playpause.find(".icon-pause").hide();
    $('.modal').css({ 'opacity': '1', 'visibility': 'visible' });
  });
  $('.modal_close,.modal_bg').click(function() {
    $('.modal').css({ 'opacity': '0', 'visibility': 'hidden' });
  });
  $(document).keyup(function(e) {
    if (e.keyCode === 27) $('.modal').css({ 'opacity': '0', 'visibility': 'hidden' }); // esc
  });
  $('#inverno').click(function() {
    $(this).animate({ bottom: "-155px" }, 700, function() {
      const pupazzo = $('#pupazzo_di_neve');
      pupazzo.addClass('animate');
      setTimeout(() => {
        pupazzo.removeClass('animate');
        pupazzo.css('bottom', '0');
      }, 500);
    });
  });
  $('#pupazzo_di_neve').click(function() {
    $('#inverno').animate({ bottom: "0" }, 700);
    $(this).animate({ bottom: "-96px" }, 700);
  });
  var year = function() {
    return new Date().getFullYear();
  };
  $('.year').text(year());
});