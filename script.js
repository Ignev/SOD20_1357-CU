let banners = [
  { step: 0, bg: "./assets/img/bg-0.jpg" },
  { step: 1, bg: "./assets/img/bg-1.jpg" },
  {
    step: 2,
    bg: "./assets/img/bg-2.jpg",
    popupImg: "./assets/video/video-4.mp4",
    popupText:
      "Alles im Blick: Mit den neuen LED Frontscheinwerfern* und LED Rückleuchten* entgeht Ihnen nichts mehr.",
    top: "40%",
    right: "40px",
  },
  {
    step: 3,
    bg: "./assets/img/bg-3.jpg",
    popupImg: "./assets/video/video-1.mp4",
    popupText:
      "nnen überzeugt die fünfte Generation des Caddy Cargo mit neuen Hightech-Lösungen und deutlich mehr Platz.",
    top: "40%",
    right: "200px",
  },
  {
    step: 4,
    bg: "./assets/img/bg-4.jpg",
    popupImg: "./assets/video/video-2.mp4",
    popupText:
      "Dank extrabreiter Schiebetür* können jetzt Europaletten sogar seitlich eingeladen werden.",
    top: "30%",
    right: "100px",
  },
  {
    step: 5,
    bg: "./assets/img/bg-5.jpg",
    popupImg: "./assets/video/video-3.mp4",
    popupText:
      "Der Lane Assist* erfasst und korrigiert autonom bei drohender Überfahrung der Spurbegrenzungslinien.",
    top: "50%",
    right: "100px",
  },
];

const showBanner = (
  bannerSelector,
  bannerBtnArrowSelector,
  bannerBtnMicroSelector,
  popupOpenBtnSelector,
  popupSelector,
  popupVideoSelector,
  popupTextSelector
) => {
  const banner = document.querySelector(bannerSelector),
    bannerBtnArrow = document.querySelector(bannerBtnArrowSelector),
    bannerBtnMicro = document.querySelector(bannerBtnMicroSelector),
    popupOpenBtn = document.querySelector(popupOpenBtnSelector),
    popup = document.querySelector(popupSelector),
    popupVideo = document.querySelector(popupVideoSelector),
    popupText = document.querySelector(popupTextSelector);
  bannerBtnArrow.addEventListener("click", () => {
    if (banner.dataset.step <= 5) {
      console.log(banner.dataset.step++);
    }
    banners.forEach((item) => {
      if (banner.dataset.step == item.step) {
        banner.style.background = `url(${item.bg})`;
      }
      if (banner.dataset.step == item.step && item.popupImg) {
          popupVideo.setAttribute("src", item.popupImg);
          popupText.innerHTML = item.popupText;
          console.log(15);
      }
      if(banner.dataset.step == item.step && item.top){
        popupOpenBtn.style.display = "flex"
        popupOpenBtn.style.top = item.top;
        popupOpenBtn.style.right = item.right;
      }
    });
  });
};
const closePopup = (popupSelector, popupClose) => {
  const popup = document.querySelector(popupSelector),
    closeBtn = document.querySelector(popupClose);
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
};
const openPopup = (popupSelector, popupOpen) => {
  const popup = document.querySelector(popupSelector),
    openBtn = document.querySelector(popupOpen);
    openBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });
};

window.addEventListener("DOMContentLoaded", () => {
  showBanner(".banner", ".banner__arrow", ".banner__micro", ".popup__open", ".banner__popup", ".popup__video", ".popup__text");
  closePopup(".banner__popup", ".popup__close");
  openPopup(".banner__popup", ".popup__open");
});
