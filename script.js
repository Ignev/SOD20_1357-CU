let banners = [
  {
    step: 0,
    bg: "./assets/img/bg-0.jpg",
    bannerText:
      "<strong>Oh, eine Sprachpanne.</strong> <br/> <span>Sprechen Sie noch einmal</span>",
      subtext:"Abbildung zeigt Sonderausstattung gegen Mehrpreis"
  },
  {
    step: 1,
    bg: "./assets/img/bg-1.jpg",
    bannerText:
      "<strong>Der neue <br /> Caddy Cargo</strong> <br/> <span>ereit für alles, <br />was kommt</span>",
      subtext:"Abbildung zeigt Sonderausstattung gegen Mehrpreis"
  },
  {
    step: 2,
    bg: "./assets/img/bg-2.jpg",
    bannerText:
      "<strong>Der neue <br /> Caddy Cargo</strong> <br/> <span>LED Scheinwerfer</span>",
    popupImg: "./assets/video/video-4.mp4",
    popupText:
      "Alles im Blick: Mit den neuen LED Frontscheinwerfern* <br/> und LED Rückleuchten* entgeht Ihnen nichts mehr.",
    top: "40%",
    right: "40px",
    subtext:"Abbildung zeigt Sonderausstattung gegen Mehrpreis.<br/> *Sonderausstattung gegen Mehrpreis."
  },
  {
    step: 3,
    bg: "./assets/img/bg-3.jpg",
    bannerText:
      "<strong>Der neue Caddy Cargo</strong> <br/> <span>Großer Laderaum</span>",
    popupImg: "./assets/video/video-1.mp4",
    popupText:
      "Innen überzeugt die fünfte Generation des Caddy Cargo <br/> mit neuen Hightech-Lösungen und deutlich mehr Platz.",
    top: "40%",
    right: "100px",
    subtext:"Abbildungen zeigen Sonderausstattung gegen Mehrpreis."
  },
  {
    step: 4,
    bg: "./assets/img/bg-4.jpg",
    bannerText:
      "<strong>Der neue <br/>Caddy Cargo Maxi</strong> <br/> <span>Breitere <br/>Schiebetür*</span>",
    popupImg: "./assets/video/video-2.mp4",
    popupText:
      "Dank extrabreiter Schiebetür* können jetzt <br/> Europaletten sogar seitlich eingeladen werden.",
    top: "30%",
    right: "50px",
    subtext:"Abbildung zeigt Sonderausstattung gegen Mehrpreis.<br/> *Sonderausstattung gegen Mehrpreis."
  },
  {
    step: 5,
    bg: "./assets/img/bg-5.jpg",
    bannerText:
      "<strong>Der neue <br/>Caddy Cargo</strong> <br/> <span>Lane Assist*</span>",
    popupImg: "./assets/video/video-3.mp4",
    popupText:
      "Der Lane Assist* erfasst und korrigiert autonom bei <br/> drohender Überfahrung der Spurbegrenzungslinien.",
    top: "30%",
    right: "50px",
    subtext:"Abbildung zeigt Sonderausstattung gegen Mehrpreis.<br/> *Sonderausstattung gegen Mehrpreis."
  },
];

const showBanner = (
  bannerSelector,
  bannerBtnArrowSelector,
  bannerBtnMicroSelector,
  bannerTextSelectoe,
  popupOpenBtnSelector,
  popupSelector,
  popupVideoSelector,
  popupTextSelector,
  bannerSubtextSelector
) => {
  const banner = document.querySelector(bannerSelector),
    bannerBtnArrow = document.querySelector(bannerBtnArrowSelector),
    bannerBtnMicro = document.querySelector(bannerBtnMicroSelector),
    bannerText = document.querySelector(bannerTextSelectoe),
    popupOpenBtn = document.querySelector(popupOpenBtnSelector),
    popup = document.querySelector(popupSelector),
    popupVideo = document.querySelector(popupVideoSelector),
    popupText = document.querySelector(popupTextSelector),
    bannerSubtext = document.querySelector(bannerSubtextSelector);
  bannerBtnArrow.addEventListener("click", () => {
    if (banner.dataset.step < 5) {
      banner.dataset.step++
    }
    banners.forEach((item) => {
      if (banner.dataset.step == item.step) {
        banner.style.background = `url(${item.bg})`;
        bannerText.innerHTML = item.bannerText;
        bannerSubtext.innerHTML = item.subtext;
      }
      if (banner.dataset.step == item.step && item.popupImg) {
        popupVideo.setAttribute("src", item.popupImg);
        popupText.innerHTML = item.popupText;
      }
      if (banner.dataset.step == item.step && item.top) {
        popupOpenBtn.style.display = "flex";
        popupOpenBtn.style.top = item.top;
        popupOpenBtn.style.right = item.right;
      }
    });
  });
  // bannerBtnMicro.addEventListener('click', ()=>{
  //   bannerBtnMicro.style.animation = "bigBtn 1s ease";
  // });
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
  showBanner(
    ".banner",
    ".banner__arrow",
    ".banner__micro",
    ".banner__text",
    ".popup__open",
    ".banner__popup",
    ".popup__video",
    ".popup__text",
    ".banner__subtext"
  );
  closePopup(".banner__popup", ".popup__close");
  openPopup(".banner__popup", ".popup__open");
});
