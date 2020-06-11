import { getData } from "./DALI_Data.js";

$(document).ready(function () {
  movePictureSlider();
  initializeSticky();
  activeTabs();
  modifyContent();
  activateSidebar();
  quoteSlideShow();
  searchProfile();
  activatePopup();
  activateModal();
});

var slideShowCounter = 0;
var profileData = getData();

function searchProfile() {
  $(".ui.search").search({
    // change search endpoint to a custom endpoint by manipulating apiSettings
    apiSettings: {
      url: "/api/profiles/search/?q={query}",
    },
    showNoResults: true,
  });
}

function changeQuote() {
  $("#quote").empty();
  $(".ui.circular.image.quote").empty();
  $("#quote").append(profileData[slideShowCounter].quote);
  $(".ui.circular.image.quote").append(
    '<img src="' + profileData[slideShowCounter].picture + '">'
  );
  ++slideShowCounter;
}

function quoteSlideShow() {
  setInterval(changeQuote, 4000);
}

function activeTabs() {
  $(".tabular.menu .item").tab();
}

function activateModal() {
  $(".viewPost.item").click(function () {
    $(".long.modal").modal("show");
  });
}

function activateSidebar() {
  $(".hamburger").click(function () {
    $(".ui.sidebar").sidebar("toggle");
  });
}

function activatePopup() {
  $(".prompt").popup({
    on: "focus",
  });

  $(".post.item").popup({
    popup: $("#newPostPopup"),
    on: "click",
  });

  $(".search.item").popup({
    popup: $("#searchPopup"),
    on: "click",
  });

  // $(".viewPost.item").popup({
  //   popup: $("#viewPostPopup"),
  //   on: "click",
  // });

  // $('.search.item').click(function(){
  //   $(this).popup();
  // })
}

function initializeSticky() {
  var mySticky = $(".ui.sticky");

  if (mySticky.is(":hidden") === false);

  mySticky.sticky({
    context: "#context",
    offset: 100,
    bottomOffset: 10000,
  });
}

function getWindowWidth() {
  var bodyWidth = $("body").innerWidth();
  return bodyWidth;
}

function modifyContent() {
  var bodyWidth = getWindowWidth();
  var middlePanel = $("#middlePanel");
  if (bodyWidth < 1445) {
    middlePanel.removeClass("eight wide column");
    middlePanel.addClass("sixteen wide column");
  } else {
    middlePanel.removeClass("sixteen wide column");
    middlePanel.addClass("eight wide column");
    $(".ui.sticky").sticky("refresh");
  }
}

function movePictureSlider() {
  var rightAngle = $(".right.angle");
  rightAngle.click(function () {
    hideProfiles();
    setTimeout(showProfiles, 2000);
  });
}

function hideProfiles() {
  $(".profileSlider").transition({
    animation: "slide down",
    reverse: "auto", // default setting
    interval: 400,
  });
  setTimeout(removeProfile, 1500);
}

function removeProfile() {
  $(".profileSlider").remove();
}

function showProfiles() {
  setTimeout(getNewProfiles, 300);
  $(".profileSlider").transition({
    animation: "fly left",
    reverse: "auto", // default setting
    interval: 200,
  });
}

function getNewProfiles() {
  axios
    .get("http://localhost:3000/api/profiles/3")
    .then((response) => {
      var newProfiles = "";
      for (var i = 0; i < 3; ++i) {
        newProfiles += createProfile(response.data[i]);
      }
      $(".ui.center.aligned.three.column.grid").append(newProfiles);
    })
    .catch((error) => console.log(error));
}

function createProfile(profile, idName) {
  var bodyWidth = getWindowWidth();
  var profileStyle;
  if (bodyWidth > 1445) {
    profileStyle =
      'style ="width: 8vw;height: 150px;border: 2px #fcbc09  solid;"';
  } else {
    profileStyle =
      'style ="width: 82px;height: 82px;border: 2px #fcbc09  solid;"';
  }
  var profileCode =
    '<div class="column profileSlider">' +
    '<div class="ui circular image" >' +
    '<img src="' +
    profile.picture +
    '"' +
    profileStyle +
    ">" +
    "</div>" +
    '<div class="ui small header">' +
    profile.name +
    "</div>" +
    '<a href="/profiles/' +
    profile.ID +
    '">View Profile</a>' +
    "</div>";

  return profileCode;
}
