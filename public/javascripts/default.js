$(document).ready(function () {
  initializeSticky();
  initializeCardHover();
  movePictureSlider();
  activeTabs();
})

function activeTabs(){
  $('.tabular.menu .item').tab();
}
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
    leftPanel.removeClass('ten wide column');
    leftPanel.addClass('sixteen wide column');
  } else {
    leftPanel.removeClass('sixteen wide column');
    leftPanel.addClass('ten wide column');
  }
}

function movePictureSlider() {
  var rightAngle = $('.right.angle');
  rightAngle.click(function () {
    hideProfileCards();
    setTimeout(showProfileCards,2000);;
  });
}

function hideProfileCards() {
  $('.ui.special.card')
    .transition({
      animation: 'fly right',
      reverse: 'auto', // default setting
      interval: 400
    });
  setTimeout(removeCards,1500);
}

function removeCards(){
  $('.ui.special.card')
  .remove();
}

function showProfileCards(){
  setTimeout(getNewProfiles,300);
  $('.ui.special.card')
    .transition({
      animation: 'fly left',
      reverse: 'auto', // default setting
      interval: 200
    });
}


function getNewProfiles() {
  axios.get('http://localhost:3000/api/profiles').then(response => {
    var newCards ='';
    for (var i = 0; i < 3; ++i) {
      newCards += createCard(response.data[i]);
    }
    $('.ui.three.special.cards').append(newCards);
    
  }).catch(error => console.log(error));
}

function createCard(profile, idName) {
  var profileCode = '<div class="ui special card">' +
    '<div class="content">' +
    '<div class="right floated meta">Class of ' + profile.year + '</div>' +
    '<img src="'+profile.picture+'" class="ui avatar image">' +
    '</div>' +
    '<div class="image"> ' +
    '<img src="' + profile.picture + '" style="height: 160px !important;"> ' +
    '</div> ' +
    '<div class="content"> ' +
    '<a class="ui small header">' + profile.name + '</a> ' +
    '<a href="/profiles/'+profile.ID+'">View Profile</a>'+
    '</div> ' +
    '</div>';

  return (profileCode);
}