$(document).ready(function() {
  var controls = {
    audio: $("#musica"),
    playpause: $("#playpause")
  };
  var audio = controls.audio[0];
  controls.playpause.click(function() {
    if (audio.paused) {
      audio.play();
      $(this).addClass("start");
    } else {
      audio.pause();
      $(this).removeClass("start");
      audio.currentTime = 0;
    }
  });
  $(audio).on('ended', function() {
    audio.pause();
    controls.playpause.addClass("stop");
    controls.playpause.toggleClass("start");
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