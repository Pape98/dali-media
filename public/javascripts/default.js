$(document).ready(function () {
  initializeSticky();
  initializeCardHover();
  movePictureSlider() 
})

function initializeSticky() {
  $('.ui.sticky')
    .sticky({
      context: '#context',
      offset: 100
    });
}

function initializeCardHover() {
  $('.special.cards .image').dimmer({
    on: 'hover'
  });
}

function getWindowWidth() {
  var bodyWidth = $('body').innerWidth();
  return bodyWidth;
}

function modifyContent() {
  var bodyWidth = getWindowWidth();
  var leftPanel = $('#leftPanel');
  if (bodyWidth < 1125) {
    leftPanel.removeClass('twelve wide column');
    leftPanel.addClass('sixteen wide column');
  } else {
    leftPanel.removeClass('sixteen wide column');
    leftPanel.addClass('twelve wide column');
  }
}

function hideProfileCard(){
  $('.ui.special.card')
  .transition({
    animation : 'fade left',
    reverse   : 'auto', // default setting
    interval  : 400
  })
;
}

function movePictureSlider() {
  var rightAngle = $('.right.angle');
  rightAngle.click(function(){
    hideProfileCard()
  })
}

// id="<%='specialCard'+i%>"