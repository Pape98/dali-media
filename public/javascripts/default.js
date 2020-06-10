$(document).ready(function () {
  movePictureSlider();
  initializeSticky();
  activeTabs();
  modifyContent() ;
})

function activeTabs(){
  $('.tabular.menu .item').tab();
}
function initializeSticky() {
  var mySticky =  $('.ui.sticky');
 
 if (mySticky.is(":hidden") === false);
    
  mySticky
    .sticky({
      context: '#context',
      offset: 100
    });

}


function getWindowWidth() {
  var bodyWidth = $('body').innerWidth();
  return bodyWidth;
}

function modifyContent() {
  var bodyWidth = getWindowWidth();
  var middlePanel = $('#middlePanel');
  console.log(bodyWidth);
  if (bodyWidth < 1445) {
    console.log("here");
    middlePanel.removeClass('eight wide column');
    middlePanel.addClass('sixteen wide column');
  } else {
    middlePanel.removeClass('sixteen wide column');
    middlePanel.addClass('eight wide column');
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
      animation: 'slide down',
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
  '<img src="'+profile.picture+'" style="width: 150px; height: 150px; border: 1.5px black solid;">'+
  '</div>'+
  '<div class="ui small header">' + profile.name + '</div>'+
  '<a href="/profiles/'+profile.ID+'">View Profile</a>'+
   '</div>';

  return (profileCode);
}
