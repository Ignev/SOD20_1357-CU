let banners = [
  {
    step: 0,
    bg: "./assets/img/bg-0.jpg",
    bannerText:
      "<strong>Oh, eine Sprachpanne.</strong> <br/> <span>Sprechen Sie noch einmal</span>",
    subtext: "Abbildung zeigt Sonderausstattung gegen Mehrpreis",
  },
  {
    step: 1,
    bg: "./assets/img/bg-1.jpg",
    bannerText:
      "<strong>Der neue <br /> Caddy Cargo</strong> <br/> <span>ereit für alles, <br />was kommt</span>",
    subtext: "Abbildung zeigt Sonderausstattung gegen Mehrpreis",
  },
  {
    step: 2,
    bg: "./assets/img/bg-2.jpg",
    bannerText:
      "<strong>Der neue <br /> Caddy Cargo</strong> <br/> <span>LED Scheinwerfer*</span>",
    popupImg: "./assets/video/video-4.mp4",
    popupText:
      "Alles im Blick: Mit den neuen LED Frontscheinwerfern* <br/> und LED Rückleuchten* entgeht Ihnen nichts mehr.",
    top: "40%",
    right: "40px",
    subtext:
      "Abbildung zeigt Sonderausstattung gegen Mehrpreis.<br/> *Sonderausstattung gegen Mehrpreis.",
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
    subtext: "Abbildungen zeigen Sonderausstattung gegen Mehrpreis.",
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
    subtext:
      "Abbildung zeigt Sonderausstattung gegen Mehrpreis.<br/> *Sonderausstattung gegen Mehrpreis.",
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
  popupSelector,
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
    popup = document.querySelector(popupSelector),
    popupVideo = document.querySelector(popupVideoSelector),
    popupText = document.querySelector(popupTextSelector),
    bannerSubtext = document.querySelector(bannerSubtextSelector),
    popupOpenBtnWrapper = document.querySelector(popupOpenBtnWrapperSelector),
    bubble = document.querySelector(bubbleSelector);
    
  const nextBanner = () => {
    if (banner.dataset.step <= 4) {
      banner.dataset.step++;
    }
    if (banner.dataset.step == 5) {
      banner.dataset.step = 2;
    }
    if(banner.dataset.step>= 2){
      bannerBtnMicro.classList.add('banner__micro-animate');
    }
    bannerBtnMicro.addEventListener('click', () => {
      bubble.classList.remove('bunner__bubble');
      bubble.classList.add('bunner__bubble-active');
      bubble.innerHTML = '<img src="./assets/img/comics1.svg" alt="" class="bubble__media"/>'
    })
    bannerBtnArrow.addEventListener('click', () => {
      bubble.classList.remove('bunner__bubble');
      bubble.classList.add('bunner__bubble-active');
      bubble.innerHTML = '<img src="./assets/img/comics1.svg" alt="" class="bubble__media"/>'
    })
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
  };
  const errorBanner = () => {
    banner.style.background = `url(./assets/img/bg-0.jpg)`;
    bannerText.innerHTML = "<strong>Oh, eine Sprachpanne.</strong> <br/> <span>Sprechen Sie noch einmal</span>";
    bannerSubtext.innerHTML = "Abbildung zeigt Sonderausstattung gegen Mehrpreis";
    popupOpenBtnWrapper.style.display = "none";
  }
  bannerBtnMicro.addEventListener("click", () => {
    bannerBtnMicro.innerHTML = '<img class="micro__media-action "src="./assets/img/soundWaveForm.gif" alt="microphone"/>'
  });

  let words = ["feature", "hallo", "käddi", "wechsle", "zum", "nächsten","feature hallo käddi wechsle zum nächsten", "hallo käddi wechsle zum nächsten"];

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
    bannerBtnMicro.innerHTML = '<img class="micro__media-action "src="./assets/img/soundWaveForm.gif" alt="microphone"/>';
    bannerBtnMicro.setAttribute('disabled' , 'disabled');
    bannerBtnArrow.setAttribute('disabled' , 'disabled');
  });

  recognition.onresult = function (event) {
    if(event.results[0][0].confidence >= 0.70){
    nextBanner();
    }
    else{
      errorBanner();
      }
    console.log("Confidence: " + event.results[0][0].confidence);
  };
  recognition.onspeechend = function () {
    recognition.stop();
    bannerBtnMicro.innerHTML = '<img class="micro__media "src="./assets/img/micro.svg" alt="microphone"/>'
    bannerBtnMicro.removeAttribute('disabled');
    bannerBtnArrow.removeAttribute('disabled');
  };
  bannerBtnArrow.addEventListener("click", () => {
    nextBanner();
  });
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
    ".banner__popup",
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
