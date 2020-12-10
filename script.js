var user = detect.parse(navigator.userAgent);
console.log(user.browser.family);

// if (
//   user.browser.family === "Chrome" ||
//   user.browser.family === "Mobile Chrome"
// ) {
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
// }

var hellopreloader = document.getElementById("hellopreloader_preload");

function fadeOutnojquery(el) {
  el.style.opacity = 1;
  var interhellopreloader = setInterval(function () {
    el.style.opacity = el.style.opacity - 0.05;
    if (el.style.opacity <= 0.05) {
      clearInterval(interhellopreloader);
      hellopreloader.style.display = "none";
    }
  }, 16);
}
window.onload = function () {
  setTimeout(function () {
    fadeOutnojquery(hellopreloader);
    setTimeout(play, 250);
  }, 1000);
};

function play() {
  slide1.classList.add("activeSlide");
  text__Slide1.classList.add("activeText");
}

next__Slide1.addEventListener("click", function () {
  slide3Active();
  slide2.classList.remove("activeSlide");
  slide2.removeAttribute("style", "z-index: 1");
});
nextSlideBtn = (num) => {
  if (num === 3) {
    slide3Active();
  }
  if (num === 4) {
    slide4Active();
  }
  if (num === 5) {
    slide5Active();
  }
  if (num === 6) {
    slide6Active();
  }
  slide2.classList.remove("activeSlide");
  slide2.removeAttribute("style", "z-index: 1");
};

next__Slide3.addEventListener("click", function () {
  slide4Active();
  slide2.classList.remove("activeSlide");
  slide2.removeAttribute("style", "z-index: 1");
});

next__Slide4.addEventListener("click", function () {
  slide5Active();
  slide2.classList.remove("activeSlide");
  slide2.removeAttribute("style", "z-index: 1");
});

next__Slide5.addEventListener("click", function () {
  slide6Active();
  slide3.classList.remove("activeSlide");
  slide2.classList.remove("activeSlide");
  slide2.removeAttribute("style", "z-index: 1");
});

next__Slide6.addEventListener("click", function () {
  text__Slide3.classList.remove("activeText");
  slide3Active();
  slide4.setAttribute("style", "z-index: 10");
  slide5.setAttribute("style", "z-index: 11");
  slide6.setAttribute("style", "z-index: 12");
  slide1.setAttribute("style", "z-index: 5");
  slide2.removeAttribute("style", "z-index: 1");
  setTimeout(loopStart, 700);
});

function loopStart() {
  slide1.classList.remove("activeSlide");
  text__Slide1.classList.remove("activeText");
  text__Slide2.classList.remove("activeText");
  text__Slide3.classList.remove("activeText");
  text__Slide4.classList.remove("activeText");
  text__Slide5.classList.remove("activeText");
  text__Slide6.classList.remove("activeText");
  slide4.classList.remove("activeSlide");
  slide5.classList.remove("activeSlide");
  slide6.classList.remove("activeSlide");
  text__Slide2.classList.remove("activeText");
  slide2.classList.remove("activeSlide");
  slide2.removeAttribute("style", "z-index: 1");
  slide4.removeAttribute("style", "z-index: 10");
  slide5.removeAttribute("style", "z-index: 11");
  slide6.removeAttribute("style", "z-index: 12");
  slide1.setAttribute("style", "z-index: 5");
}

function slide2Active() {
  slide2.classList.add("activeSlide");
  slide2.removeAttribute("style", "z-index: 100");
  setTimeout(slide2Text, 750);
}

function slide2Text() {
  text__Slide2.classList.add("activeText");
}

function slide3Active() {
  slide3.classList.add("activeSlide");
  setTimeout(slide3Text, 750);
}

function slide3Text() {
  text__Slide3.classList.add("activeText");
}

function slide4Active() {
  slide4.classList.add("activeSlide");
  setTimeout(slide4Text, 750);
}

function slide4Text() {
  text__Slide4.classList.add("activeText");
}

function slide5Active() {
  slide5.classList.add("activeSlide");
  setTimeout(slide5Text, 750);
}

function slide5Text() {
  text__Slide5.classList.add("activeText");
}

function slide6Active() {
  slide6.classList.add("activeSlide");
  setTimeout(slide6Text, 750);
}

function slide6Text() {
  text__Slide6.classList.add("activeText");
}

modal__img__Slide3.addEventListener("click", function () {
  modal__Slide3.classList.add("active");
  mikro__img__Slide3.classList.add("hidden");
  modal__img__Slide3.classList.add("hidden");
  mikro__Slide3.classList.add("hidden");
  next__Slide3.classList.add("hidden");
  var playPromise = video__Slide3.play();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
});
close__Slide3.addEventListener("click", function () {
  modal__Slide3.classList.remove("active");
  mikro__img__Slide3.classList.remove("hidden");
  modal__img__Slide3.classList.remove("hidden");
  mikro__Slide3.classList.remove("hidden");
  next__Slide3.classList.remove("hidden");
  var playPromise = video__Slide3.pause();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
});
modal__img__Slide4.addEventListener("click", function () {
  modal__Slide4.classList.add("active");
  mikro__img__Slide4.classList.add("hidden");
  modal__img__Slide4.classList.add("hidden");
  mikro__Slide4.classList.add("hidden");
  next__Slide4.classList.add("hidden");
  var playPromise = video__Slide4.play();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
});
close__Slide4.addEventListener("click", function () {
  modal__Slide4.classList.remove("active");
  mikro__img__Slide4.classList.remove("hidden");
  modal__img__Slide4.classList.remove("hidden");
  mikro__Slide4.classList.remove("hidden");
  next__Slide4.classList.remove("hidden");
  var playPromise = video__Slide4.pause();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
});
modal__img__Slide5.addEventListener("click", function () {
  modal__Slide5.classList.add("active");
  mikro__img__Slide5.classList.add("hidden");
  modal__img__Slide5.classList.add("hidden");
  mikro__Slide5.classList.add("hidden");
  next__Slide5.classList.add("hidden");
  var playPromise = video__Slide5.play();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
});
close__Slide5.addEventListener("click", function () {
  modal__Slide5.classList.remove("active");
  mikro__img__Slide5.classList.remove("hidden");
  modal__img__Slide5.classList.remove("hidden");
  mikro__Slide5.classList.remove("hidden");
  next__Slide5.classList.remove("hidden");
  var playPromise = video__Slide5.pause();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
});
modal__img__Slide6.addEventListener("click", function () {
  modal__Slide6.classList.add("active");
  mikro__img__Slide6.classList.add("hidden");
  modal__img__Slide6.classList.add("hidden");
  mikro__Slide6.classList.add("hidden");
  next__Slide6.classList.add("hidden");
  var playPromise = video__Slide6.play();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
});
close__Slide6.addEventListener("click", function () {
  modal__Slide6.classList.remove("active");
  mikro__img__Slide6.classList.remove("hidden");
  modal__img__Slide6.classList.remove("hidden");
  mikro__Slide6.classList.remove("hidden");
  next__Slide6.classList.remove("hidden");
  var playPromise = video__Slide6.pause();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
}); //////////////////////////////////////////////////////
/////////////////////For Video////////////////////////
//////////////////////////////////////////////////////

muted__Slide3.addEventListener("click", function () {
  video__Slide3.muted = false;
  muted__Slide3.setAttribute("style", "visibility: hidden");
  sound__Slide3.setAttribute("style", "visibility: visible");
});
sound__Slide3.addEventListener("click", function () {
  video__Slide3.muted = true;
  sound__Slide3.setAttribute("style", "visibility: hidden");
  muted__Slide3.setAttribute("style", "visibility: visible");
});
replay__Slide3.addEventListener("click", function () {
  if (video__Slide3.muted) {
    sound__Slide3.setAttribute("style", "visibility: hidden");
    muted__Slide3.setAttribute("style", "visibility: visible");
  } else {
    muted__Slide3.setAttribute("style", "visibility: hidden");
    sound__Slide3.setAttribute("style", "visibility: visible");
  }

  replay__Slide3.setAttribute("style", "visibility: hidden");
  var playPromise = video__Slide3.play();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
});
muted__Slide4.addEventListener("click", function () {
  video__Slide4.muted = false;
  muted__Slide4.setAttribute("style", "visibility: hidden");
  sound__Slide4.setAttribute("style", "visibility: visible");
});
sound__Slide4.addEventListener("click", function () {
  video__Slide4.muted = true;
  sound__Slide4.setAttribute("style", "visibility: hidden");
  muted__Slide4.setAttribute("style", "visibility: visible");
});
replay__Slide4.addEventListener("click", function () {
  if (video__Slide4.muted) {
    sound__Slide4.setAttribute("style", "visibility: hidden");
    muted__Slide4.setAttribute("style", "visibility: visible");
  } else {
    muted__Slide4.setAttribute("style", "visibility: hidden");
    sound__Slide4.setAttribute("style", "visibility: visible");
  }

  replay__Slide4.setAttribute("style", "visibility: hidden");
  var playPromise = video__Slide4.play();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
});
muted__Slide5.addEventListener("click", function () {
  video__Slide5.muted = false;
  muted__Slide5.setAttribute("style", "visibility: hidden");
  sound__Slide5.setAttribute("style", "visibility: visible");
});
sound__Slide5.addEventListener("click", function () {
  video__Slide5.muted = true;
  sound__Slide5.setAttribute("style", "visibility: hidden");
  muted__Slide5.setAttribute("style", "visibility: visible");
});
replay__Slide5.addEventListener("click", function () {
  if (video__Slide5.muted) {
    sound__Slide5.setAttribute("style", "visibility: hidden");
    muted__Slide5.setAttribute("style", "visibility: visible");
  } else {
    muted__Slide5.setAttribute("style", "visibility: hidden");
    sound__Slide5.setAttribute("style", "visibility: visible");
  }

  replay__Slide5.setAttribute("style", "visibility: hidden");
  var playPromise = video__Slide5.play();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
});
muted__Slide6.addEventListener("click", function () {
  video__Slide6.muted = false;
  muted__Slide6.setAttribute("style", "visibility: hidden");
  sound__Slide6.setAttribute("style", "visibility: visible");
});
sound__Slide6.addEventListener("click", function () {
  video__Slide6.muted = true;
  sound__Slide6.setAttribute("style", "visibility: hidden");
  muted__Slide6.setAttribute("style", "visibility: visible");
});
replay__Slide6.addEventListener("click", function () {
  if (video__Slide6.muted) {
    sound__Slide6.setAttribute("style", "visibility: hidden");
    muted__Slide6.setAttribute("style", "visibility: visible");
  } else {
    muted__Slide6.setAttribute("style", "visibility: hidden");
    sound__Slide6.setAttribute("style", "visibility: visible");
  }

  replay__Slide6.setAttribute("style", "visibility: hidden");
  var playPromise = video__Slide6.play();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
});

let words = [
  "hallo",
  "hallo caddy, wechsle zum nächsten feature",
  "hallo caddy",
  "feature",
  "hallo käddi",
  "wechsle",
  "zum nächsten",
  "wechsle zum nächsten feature",
  "hallo caddy wechsle zum nächsten feature",
  "hallo katie",
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

let count;

let micro3Slid = () => {
  mikro__Slide1.addEventListener("click", function () {
    comics__Slide1.classList.remove("active");
    mikro__Slide1.classList.add("active");
    mikro__img__Slide1.classList.add("hidden");
    mikro__img1__Slide1.classList.add("visible");
    comics1__Slide1.classList.add("active");
    count = 3;
    recognition.start();
    recognition.onresult = function (event) {
      if (typeof event.results != "undefined") {
        var resString = event.results[0][0].transcript.toLowerCase();
        var arResult = resString.split(" ");
        console.log(resString);
        arResult.forEach(function (i, v) {
          if (words.indexOf(i) > -1 || words.indexOf(resString) > -1) {
            slide3Active();
          } else {
            text__Slide1.classList.remove("activeText");
            slide1.classList.remove("activeSlide");
            slide2Active();
          }
        });
      }
    };
    recognition.onspeechend = function () {
      recognition.stop();
      mikro__Slide1.classList.remove("active");
      mikro__img__Slide1.classList.remove("hidden");
      mikro__img1__Slide1.classList.remove("visible");
      comics1__Slide1.classList.remove("active");
    };
  });
};
micro3Slid();
let micro4Slid = () => {
  mikro__Slide3.addEventListener("click", function () {
    mikro__Slide3.classList.add("active");
    mikro__img__Slide3.classList.add("hidden");
    mikro__img1__Slide3.classList.add("visible");
    comics1__Slide3.classList.add("active");
    recognition.start();
    count = 4;

    recognition.onresult = function (event) {
      if (typeof event.results != "undefined") {
        var resString = event.results[0][0].transcript.toLowerCase();
        var arResult = resString.split(" ");
        console.log(resString);
        arResult.forEach(function (i, v) {
          if (words.indexOf(i) > -1 || words.indexOf(resString) > -1) {
            slide4Active();
          } else {
            text__Slide1.classList.remove("activeText");
            slide3.classList.remove("activeSlide");
            slide2Active();
          }
        });
      }
    };
    recognition.onspeechend = function () {
      recognition.stop();
      mikro__Slide3.classList.remove("active");
      mikro__img__Slide3.classList.remove("hidden");
      mikro__img1__Slide3.classList.remove("visible");
      comics1__Slide3.classList.remove("active");
    };
  });
};
micro4Slid();

let micro5Slid = () => {
  mikro__Slide4.addEventListener("click", function () {
    mikro__Slide4.classList.add("active");
    mikro__img__Slide4.classList.add("hidden");
    mikro__img1__Slide4.classList.add("visible");
    comics1__Slide4.classList.add("active");
    recognition.start();
    count = 5;

    recognition.onresult = function (event) {
      if (typeof event.results != "undefined") {
        var resString = event.results[0][0].transcript.toLowerCase();
        var arResult = resString.split(" ");
        console.log(resString);
        arResult.forEach(function (i, v) {
          if (words.indexOf(i) > -1 || words.indexOf(resString) > -1) {
            slide5Active();
          } else {
            text__Slide4.classList.remove("activeText");
            slide4.classList.remove("activeSlide");
            slide2Active();
          }
        });
      }
    };
    recognition.onspeechend = function () {
      recognition.stop();
      mikro__Slide4.classList.remove("active");
      mikro__img__Slide4.classList.remove("hidden");
      mikro__img1__Slide4.classList.remove("visible");
      comics1__Slide4.classList.remove("active");
    };
  });
};
micro5Slid();

let micro6Slid = () => {
  mikro__Slide5.addEventListener("click", function () {
    mikro__Slide5.classList.add("active");
    mikro__img__Slide5.classList.add("hidden");
    mikro__img1__Slide5.classList.add("visible");
    comics1__Slide5.classList.add("active");
    count = 6;
    recognition.start();

    recognition.onresult = function (event) {
      if (typeof event.results != "undefined") {
        var resString = event.results[0][0].transcript.toLowerCase();
        var arResult = resString.split(" ");
        console.log(resString);
        arResult.forEach(function (i, v) {
          if (words.indexOf(i) > -1 || words.indexOf(resString) > -1)  {
            slide6Active();
          } else {
            text__Slide5.classList.remove("activeText");
            slide5.classList.remove("activeSlide");
            slide2Active();
          }
        });
      }
    };
    recognition.onspeechend = function () {
      recognition.stop();
      mikro__Slide5.classList.remove("active");
      mikro__img__Slide5.classList.remove("hidden");
      mikro__img1__Slide5.classList.remove("visible");
      comics1__Slide5.classList.remove("active");
    };
  });
};
micro6Slid();

let micro31Slid = () => {
  mikro__Slide6.addEventListener("click", function () {
    mikro__Slide6.classList.add("active");
    mikro__img__Slide6.classList.add("hidden");
    mikro__img1__Slide6.classList.add("visible");
    comics1__Slide6.classList.add("active");
    recognition.start();
    count = 3;


    recognition.onresult = function (event) {
      if (typeof event.results != "undefined") {
        var resString = event.results[0][0].transcript.toLowerCase();
        var arResult = resString.split(" ");
        console.log(resString);
        arResult.forEach(function (i, v) {
          if (words.indexOf(i) > -1 || words.indexOf(resString) > -1) {
            slide3Active();
            slide4.setAttribute("style", "z-index: 10");
            slide5.setAttribute("style", "z-index: 11");
            slide6.setAttribute("style", "z-index: 12");
            slide1.setAttribute("style", "z-index: 5");
            setTimeout(loopStart, 700);
          } else {
            text__Slide6.classList.remove("activeText");
            slide6.classList.remove("activeSlide");
            slide2Active();
          }
        });
      }
    };
    recognition.onspeechend = function () {
      recognition.stop();
      mikro__Slide6.classList.remove("active");
      mikro__img__Slide6.classList.remove("hidden");
      mikro__img1__Slide6.classList.remove("visible");
      comics1__Slide6.classList.remove("active");
    };
  });
};
micro31Slid();

let nextSlid = () => {
  mikro__Slide2.addEventListener("click", function () {
    mikro__Slide2.classList.add("active");
    mikro__img__Slide2.classList.add("hidden");
    mikro__img1__Slide2.classList.add("visible");
    comics1__Slide2.classList.add("active");
    recognition.start();
    recognition.onresult = function (event) {
      if (event.results[0][0].confidence >= 0.7) {
        console.log(count);
        nextSlideBtn(count);
        text__Slide2.classList.remove("activeText");
        slide2.classList.remove("activeSlide");
        slide2.removeAttribute("style", "z-index: 1");
      } else {
        slide2Active();
      }
      console.log("Confidence: " + event.results[0][0].confidence);
    };
    recognition.onspeechend = function () {
      recognition.stop();
      mikro__Slide2.classList.remove("active");
      mikro__img__Slide2.classList.remove("hidden");
      mikro__img1__Slide2.classList.remove("visible");
      comics1__Slide2.classList.remove("active");
    };
  });
};
next__Slide2.addEventListener("click", function () {
  nextSlideBtn(count);
});
nextSlid();
