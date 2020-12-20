window.addEventListener("load", function () {
  // Iniciar y cerrar video
  var playVideo = document.getElementById("playVideo");
  var videoContainer = document.getElementById("videoContainer");
  var closeVideo = document.getElementById("closeVideo");

  function initVideo(e) {
    e.preventDefault();
    videoContainer.classList.remove("hidden");
  }

  function stopVideo(e) {
    e.preventDefault();
    videoContainer.classList.add("hidden");
  }
  playVideo.addEventListener("click", initVideo, false);
  closeVideo.addEventListener("click", stopVideo, false);

  var date = document.getElementsByClassName("timeline__year");
  var imageContainer = document.getElementById("imageContainer");

  function removeActiveClass() {
    var active = document.querySelector(".timeline__year--active");
    var contentActive = document.querySelector(".timeline__content--active");
    active.classList.remove("timeline__year--active");
    contentActive.classList.remove("timeline__content--active");
  }

  function showTimeline() {
    var yearTab = this.getAttribute("data-year");
    removeActiveClass();
    this.classList.add("timeline__year--active");
    // MOSTRANDO TAB SELECCIONADO
    var timelineContent = document.getElementById(yearTab);
    timelineContent.classList.add("timeline__content--active");
    // CAMBIANDO IMAGEN
    imageContainer.setAttribute("src", `img/${yearTab}.jpg`);
  }

  for (let i = 0; i < date.length; i++) {
    date[i].addEventListener("click", showTimeline, false);
  }
});
