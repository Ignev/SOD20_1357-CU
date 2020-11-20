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

var recorder = null;
var words = {
  ".module__1": [
    "hallo ",
    "caddye",
    "wechsle",
    "zum",
    "nächsten",
    "feature",
  ],
  ".module__2": [
    "hallo",
    "caddye",
    "wechsle",
    "zum",
    "nächsten",
    "feature",
  ],
  ".module__3": [
    "hallo ",
    "caddye",
    "wechsle",
    "zum",
    "nächsten",
    "feature",
  ],
  ".module__4": [
    "hallo ",
    "caddye",
    "wechsle",
    "zum",
    "nächsten",
    "feature",
  ],
};

const onGetUserMedia = (stream) => {
  recorder = new MediaRecorder(stream);
  recorder.addEventListener("dataavailable", (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.data);
    reader.onloadend = () => {
      let ajax = new XMLHttpRequest();
      ajax.open(
        "POST",
        "https://speech.googleapis.com/v1p1beta1/speech:recognize?key=AIzaSyB0prP56MBRzjZPVMLJHL408pTxzRtKJok",
        true
      );
      ajax.setRequestHeader("Content-type", "application/json");
      let params = {
        audio: {
          content: reader.result.split(",")[1],
        },
        config: {
          enableAutomaticPunctuation: false,
          encoding: "LINEAR16",
          languageCode: "de-DE",
          model: "default",
        },
      };
      ajax.send(JSON.stringify(params));
      ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
          let data = JSON.parse(ajax.responseText);
          let found = false;
          if (typeof data.results != "undefined") {
            let resString = data.results[0].alternatives[0].transcript.toLowerCase();
            let arResult = resString.split(" ");
            console.log(resString);
            arResult.foreach((i, v) => {
              words.foreach((j, w) => {
                if (
                  words[j].indexOf(v) > -1 ||
                  words[j].indexOf(resString) > -1
                ) {
                  nextBanner();
                  found = true;
                  return false;
                }
              });
            });
          }
          if (!found) {
            document.querySelector(".banner__micro").classList.add("fail");
            setTimeout(function () {
              document
                .querySelector(".banner__micro")
                .classList.remove("fail");
            }, 1000);
          }
        }
      };
    };
  });
  recorder.start();
};

function onGetUserMediaError() {}

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
  popupOpenBtnWrapperSelector
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
    popupOpenBtnWrapper = document.querySelector(popupOpenBtnWrapperSelector);
  bannerBtnMicro.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    bannerBtnMicro.classList.add("active");

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      null;
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(onGetUserMedia, onGetUserMediaError);
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { audio: true },
        onGetUserMedia,
        onGetUserMediaError
      );
    }
    bannerBtnMicro.innerHTML =
      '<img class="micro__media micro__media-action" src="./assets/img/soundWaveForm.gif" alt="microphone"/>';

    setTimeout(() => {
      bannerBtnMicro.innerHTML =
        '<img class="micro__media micro__media" src="./assets/img/micro.svg" alt="microphone"/>';
      // recorder.stop();
      nextBanner();
    }, 3000);
  });
const nextBanner =()=> {
  if (banner.dataset.step <= 4) {
    banner.dataset.step++;
  }
  if (banner.dataset.step == 5) {
    banner.dataset.step = 2;
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
}
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
    ".popup__open-wrapp"
  );
  closePopup(".banner__popup", ".popup__close");
  openPopup(".banner__popup", ".popup__open-wrapp");
  muteSound(".video__btn", ".popup__video", ".video__img", ".popup__close");
});
