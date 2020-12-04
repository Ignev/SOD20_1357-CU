
let banners = [
  {
    step: 0,
    bg: "./assets/img/bg-0.jpg",
    bannerText:
    '<img style="width: 155px; height: 63px;" src="./assets/fonts/Oh-eine-Sprachpanne.svg" alt="" class="text__strong"><img src="./assets/fonts/Sprechen-Sie-noch-einmal.svg" style="width: 160px; height: 50px;" alt="" class="text__span">',
    subtext: '<img style="width: 210px; height: 15px;" src="./assets/fonts/Abbildung-zeigt-Sonderausstattung-gegen-Mehrpreis.svg" alt="" class="banner__first-media">',
  },
  {
    step: 1,
    bg: "./assets/img/bg-1.jpg",
    bannerText:
      '<img style="width: 155px; height: 63px;" src="./assets/fonts/Der-neue-Caddy-Cargo.svg" alt="" class="text__strong"><img src="./assets/fonts/Bereit-fur-alles-was-kommt.svg" style="width: 160px; height: 50px;" alt="" class="text__span">',
    subtext: '<img style="width: 210px; height: 10px;" src="./assets/fonts/Abbildung-zeigt-Sonderausstattung-gegen-Mehrpreis.svg" alt="" class="banner__first-media">',
  },
  {
    step: 2,
    bg: "./assets/img/bg-2.jpg",
    bannerText:
      '<img src="./assets/fonts/Der-neue-Caddy-Cargo.svg" alt="" class="text__strong"><img style="width: 210px; height: 20px; " src="./assets/fonts/LED-Scheinwerfer.svg" alt="" class="text__span">',
    popupImg: "./assets/video/video-4.mp4",
    popupText:
      "Alles im Blick: Mit den neuen LED Frontscheinwerfern* <br/> und LED Rückleuchten* entgeht Ihnen nichts mehr.",
    top: "40%",
    right: "40px",
    subtext:
    '<img style="width: 210px; height: 10px;" src="./assets/fonts/Abbildung-zeigt-Sonderausstattung-gegen-Mehrpreis.svg" alt="" class="banner__first-media"><img style="width: 150px; height: 10px;" src="./assets/fonts/Sonderausstattung-gegen-Mehrpreis.svg" alt="" class="second-media">',
  },
  {
    step: 3,
    bg: "./assets/img/bg-3.jpg",
    bannerText:
    '<img src="./assets/fonts/Der-neue-Caddy-Cargo.svg" alt="" class="text__strong"><img style="width: 200px; height: 20px;" src="./assets/fonts/Großer-Laderaum.svg" alt="" class="text__span">',
    popupImg: "./assets/video/video-1.mp4",
    popupText:
      "Innen überzeugt die fünfte Generation des Caddy Cargo <br/> mit neuen Hightech-Lösungen und deutlich mehr Platz.",
    top: "40%",
    right: "100px",
    subtext: '<img style="width: 210px; height: 10px;" src="./assets/fonts/Abbildung-zeigt-Sonderausstattung-gegen-Mehrpreis.svg" alt="" class="banner__first-media">',
  },
  {
    step: 4,
    bg: "./assets/img/bg-4.jpg",
    bannerText:
    '<img src="./assets/fonts/Der-neue-Caddy-Cargo.svg" alt="" class="text__strong"><img style="width: 125px; height: 50px;" src="./assets/fonts/Breitere-Schiebetur.svg" alt="" class="text__span">',
    popupImg: "./assets/video/video-2.mp4",
    popupText:
      "Dank extrabreiter Schiebetür* können jetzt <br/> Europaletten sogar seitlich eingeladen werden.",
    top: "30%",
    right: "50px",
    subtext:
    '<img style="width: 210px; height: 10px;" src="./assets/fonts/Abbildung-zeigt-Sonderausstattung-gegen-Mehrpreis.svg" alt="" class="banner__first-media"><img style="width: 150px; height: 10px;" src="./assets/fonts/Sonderausstattung-gegen-Mehrpreis.svg" alt="" class="second-media">',
  },
  {
    step: 5,
    bg: "./assets/img/bg-5.jpg",
    bannerText:
    '<img src="./assets/fonts/Der-neue-Caddy-Cargo.svg" alt="" class="text__strong"><img style="width: 125px; height: 20px;" src="./assets/fonts/Lane-Assist.svg" alt="" class="text__span">',
    popupImg: "./assets/video/video-3.mp4",
    popupText:
      "Der Lane Assist* erfasst und korrigiert autonom bei drohender Überfahrung der Spurbegrenzungslinien.",
    top: "30%",
    right: "50px",
    subtext:'<img style="width: 210px; height: 10px;" src="./assets/fonts/Abbildung-zeigt-Sonderausstattung-gegen-Mehrpreis.svg" alt="" class="banner__first-media"><img style="width: 150px; height: 10px;" src="./assets/fonts/Sonderausstattung-gegen-Mehrpreis.svg" alt="" class="second-media">'
  },
];
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  var SpeechRecognitionEvent =
    SpeechRecognitionEvent || webkitSpeechRecognitionEvent;


const showBanner = (
  bannerSelector,
  bannerBtnArrowSelector,
  bannerBtnMicroSelector,
  bannerTextSelectoe,
  popupOpenBtnSelector,
  popupVideoSelector,
  popupTextSelector,
  bannerSubtextSelector,
  popupOpenBtnWrapperSelector,
  bubbleSelector
) => {
  const banner = document.querySelector(bannerSelector),
    bannerBtnArrow = document.querySelector(bannerBtnArrowSelector),
    bannerBtnMicro = document.querySelector(bannerBtnMicroSelector),
    bannerText = document.querySelector(bannerTextSelectoe),
    popupOpenBtn = document.querySelector(popupOpenBtnSelector),
    popupVideo = document.querySelector(popupVideoSelector),
    popupText = document.querySelector(popupTextSelector),
    bannerSubtext = document.querySelector(bannerSubtextSelector),
    popupOpenBtnWrapper = document.querySelector(popupOpenBtnWrapperSelector),
    bubble = document.querySelector(bubbleSelector);
    bannerBtnMicro.addEventListener('click', ()=> {
      console.log(1);
      bubble.innerHTML = '<img src="./assets/img/comics1.svg" alt="" class="bubble__media"/>';
      bubble.classList.add('bunner__bubble-active');
    })
  const nextBanner = () => {
    bubble.classList.add('bunner__bubble-active');
      setTimeout(() => {
        bubble.classList.remove('bunner__bubble-active');
      }, 2130);
    if (banner.dataset.step <= 5) {
      banner.dataset.step++;
    }
    if (banner.dataset.step == 6) {
      banner.dataset.step = 2;
    }
    if (banner.dataset.step >= 2) {
      setTimeout(() => {
        bannerBtnMicro.classList.add("banner__micro-animate");
      }, 1000);
      bubble.innerHTML = '<img src="./assets/img/comics1.svg" alt="" class="bubble__media"/>';
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
        popupOpenBtn.style.animation = "showOpenPopup 1.5s ease";
      }
      if (banner.dataset.step == item.step && item.top) {
        popupOpenBtnWrapper.style.display = "flex";
        popupOpenBtnWrapper.style.top = item.top;
        popupOpenBtnWrapper.style.right = item.right;
        popupOpenBtnWrapper.innerHTML = `
      <button class="popup__open">
        <img src="./assets/img/plus.svg" alt="open" class="open__media" />
      </button>`;
      }
    });
    banner.classList.add("banner-animate");
    setTimeout(() => {
      banner.classList.remove("banner-animate");
    }, 1400);
  };
  const errorBanner = () => {
    banner.style.background = `url(./assets/img/bg-0.jpg)`;
    bannerText.innerHTML =
    '<img style="width: 220px; height: 60px;" src="./assets/fonts/Oh-eine-Sprachpanne.svg" alt="" class="text__strong"><img style="width: 150x; height: 57px;" src="./assets/fonts/Sprechen-Sie-noch-einmal.svg"  alt="" class="text__span">';
    bannerSubtext.innerHTML =
    '<img style="width: 210px; height: 15px;" src="./assets/fonts/Abbildung-zeigt-Sonderausstattung-gegen-Mehrpreis.svg" alt="" class="banner__first-media">';
    popupOpenBtnWrapper.style.display = "none";
  };
  bannerBtnMicro.addEventListener("click", () => {
    bannerBtnMicro.innerHTML =
      '<img class="micro__media micro__media-action "src="./assets/img/soundWaveForm.gif" alt="microphone"/>';
  });

    let words = [
      "feature",
      "hallo",
      "käddi",
      "wechsle",
      "zum",
      "nächsten",
      "feature hallo käddi wechsle zum nächsten",
      "hallo käddi wechsle zum nächsten",
    ];

    let grammar =
      "#JSGF V1.0; grammar words; public <word> = " + words.join(" | ") + " ;";
    let recognition = new SpeechRecognition();
    let speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = "de-DE";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    bannerBtnMicro.addEventListener("click", () => {
      recognition.start();
      bannerBtnMicro.innerHTML =
        '<img class="micro__media micro__media-action "src="./assets/img/soundWaveForm.gif" alt="microphone"/>';
      bannerBtnMicro.setAttribute("disabled", "disabled");
      bannerBtnArrow.setAttribute("disabled", "disabled");
      if (banner.dataset.step >= 2) {
        bannerBtnMicro.classList.remove("banner__micro-animate");
      }
    });

    recognition.onresult = function (event) {
      if (event.results[0][0].confidence >= 0.7) {
        nextBanner();
      } else {
        errorBanner();
      }
      console.log("Confidence: " + event.results[0][0].confidence);
    };
    recognition.onspeechend = function () {
      recognition.stop();
      bannerBtnMicro.innerHTML =
        '<img class="micro__media-noaction "src="./assets/img/micro.svg" alt="microphone"/>';
      bannerBtnMicro.removeAttribute("disabled");
      bannerBtnArrow.removeAttribute("disabled");
    };
  

  bannerBtnArrow.addEventListener("click", () => {
    nextBanner();
  });
  if (banner.dataset.step >= 2) {
    setTimeout(() => {
      bannerBtnMicro.classList.add("banner__micro-animate");
    }, 1000);
  }
};

const closePopup = (popupSelector, popupClose) => {
  const popup = document.querySelector(popupSelector),
    closeBtn = document.querySelector(popupClose);
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    popup.classList.remove("open");
    popup.classList.add("close");
  });
};
const openPopup = (popupSelector, popupOpen) => {
  const popup = document.querySelector(popupSelector),
    openBtn = document.querySelector(popupOpen);
  openBtn.addEventListener("click", () => {
    popup.style.display = "flex";
    popup.classList.remove("close");
    popup.classList.add("open");
  });
};
const muteSound = (
  btnSoundSelector,
  videoSelector,
  imgSelector,
  popupClose
) => {
  const video = document.querySelector(videoSelector),
    btnSound = document.querySelector(btnSoundSelector),
    img = document.querySelector(imgSelector),
    closeBtn = document.querySelector(popupClose);

  btnSound.addEventListener("click", () => {
    if (btnSound.classList.contains("sound-off")) {
      btnSound.classList.remove("sound-off");
      btnSound.classList.add("sound-on");
      img.setAttribute("src", "./assets/img/sound-on.png");
      video.muted = false;

      video.removeAttribute(muted);
    }
    if (btnSound.classList.contains("sound-on")) {
      btnSound.classList.remove("sound-on");
      btnSound.classList.add("sound-off");
      img.setAttribute("src", "./assets/img/sound-off.png");
      video.muted = true;
    }
  });
  closeBtn.addEventListener("click", () => {
    video.muted = true;
    btnSound.classList.remove("sound-on");
    btnSound.classList.add("sound-off");
    img.setAttribute("src", "./assets/img/sound-off.png");
  });
};
window.addEventListener("DOMContentLoaded", () => {
  showBanner(
    ".banner",
    ".banner__arrow",
    ".banner__micro",
    ".banner__text",
    ".popup__open",
    ".popup__video",
    ".popup__text",
    ".banner__subtext",
    ".popup__open-wrapp",
    ".bunner__bubble"
  );
  closePopup(".banner__popup", ".popup__close");
  openPopup(".banner__popup", ".popup__open-wrapp");
  muteSound(".video__btn", ".popup__video", ".video__img", ".popup__close");
});
