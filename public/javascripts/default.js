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
    hideProfiles();
    setTimeout(showProfiles,2000);;
  });
}

function hideProfiles() {
  $('.profileSlider')
    .transition({
      animation: 'fly right',
      reverse: 'auto', // default setting
      interval: 400
    });
  setTimeout(removeProfile,1500);
}

function removeProfile(){
  $('.profileSlider')
  .remove();
}

function showProfiles(){
  setTimeout(getNewProfiles,300);
  $('.profileSlider')
    .transition({
      animation: 'fly left',
      reverse: 'auto', // default setting
      interval: 200
    });
}


function getNewProfiles() {
  axios.get('http://localhost:3000/api/profiles').then(response => {
    var newProfiles ='';
    for (var i = 0; i < 3; ++i) {
      newProfiles += createProfile(response.data[i]);
    }
    console.log(newProfiles)
    $('.ui.center.aligned.three.column.grid').append(newProfiles);
    
  }).catch(error => console.log(error));
}

function createProfile(profile, idName) {
  var profileCode = '<div class="column profileSlider">' +
  '<div class="ui circular image" >' +
  '<img src="'+profile.picture+'" style="width: 150px; height: 150px; border: 1.5px #FFD700 solid;">'+
  '</div>'+
  '<div class="ui small header">' + profile.name + '</div>'+
  '<a href="/profiles/'+profile.ID+'">View Profile</a>'+
   '</div>';

  return (profileCode);
}
