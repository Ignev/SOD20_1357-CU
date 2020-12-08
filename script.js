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

var $f0a5fc76378d1581cc7b$var$hellopreloader = document.getElementById(
  "hellopreloader_preload"
);

function $f0a5fc76378d1581cc7b$var$fadeOutnojquery(el) {
  el.style.opacity = 1;
  var interhellopreloader = setInterval(function () {
    el.style.opacity = el.style.opacity - 0.05;

    if (el.style.opacity <= 0.05) {
      clearInterval(interhellopreloader);
      $f0a5fc76378d1581cc7b$var$hellopreloader.style.display = "none";
    }
  }, 16);
}

window.onload = function () {
  setTimeout(function () {
    $f0a5fc76378d1581cc7b$var$fadeOutnojquery(
      $f0a5fc76378d1581cc7b$var$hellopreloader
    );
    setTimeout($f0a5fc76378d1581cc7b$var$play, 250);
  }, 1000);
};

const $f0a5fc76378d1581cc7b$var$selectSlideById = (slideId) => {
  let currentSlideId = slideId;
  const defaults = {
    selectors: {
      activeSlide: "activeSlide",
      activeText: "activeText",
    },
    fadeHeaderDelay: 750,
  };
  const slides = [slide1, slide3, slide4, slide5, slide6];
  const headers = [
    text__Slide1,
    text__Slide3,
    text__Slide4,
    text__Slide5,
    text__Slide6,
  ];

  if (currentSlideId === 0) {
    slides.forEach((slide) => {
      slide.classList.remove(defaults.selectors.activeSlide);
    });
    $f0a5fc76378d1581cc7b$var$selectSlideById(1);
  }

  slides.forEach((slide, slideId) => {
    if (currentSlideId === slideId) {
      slide.classList.add(defaults.selectors.activeSlide);
      setTimeout(() => {
        headers[slideId].classList.add(defaults.selectors.activeText);
      }, defaults.fadeHeaderDelay);
    } else {
      headers[slideId].classList.remove(defaults.selectors.activeText);
    }
  });
};

function $f0a5fc76378d1581cc7b$var$play() {
  const slide1 = document.querySelector(".slide1");
  slide1.classList.add("activeSlide");
  text__Slide1.classList.add("activeText"); ////////
} ////////////////////////////////////////////////////
///////////////// functions for switching screens by buttons
////////////////////////////////////////////////////////////

next__Slide1.addEventListener("click", function () {
  $f0a5fc76378d1581cc7b$var$slide3Active();
});
next__Slide2.addEventListener("click", function () {
  $f0a5fc76378d1581cc7b$var$slide5Active();
});
next__Slide3.addEventListener("click", function () {
  $f0a5fc76378d1581cc7b$var$slide4Active();
});
next__Slide4.addEventListener("click", function () {
  $f0a5fc76378d1581cc7b$var$slide5Active();
});
next__Slide5.addEventListener("click", function () {
  $f0a5fc76378d1581cc7b$var$slide6Active();
  slide3.classList.remove("activeSlide");
});
next__Slide6.addEventListener("click", function () {
  $f0a5fc76378d1581cc7b$var$selectSlideById(0);
  slide1.classList.remove("activeSlide");
});
////////////////////////////////////////////////////////////
///////////////// Second screen
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
///////////////// Third screen
////////////////////////////////////////////////////////////
function $f0a5fc76378d1581cc7b$var$slide3Active() {
  $f0a5fc76378d1581cc7b$var$selectSlideById(1);
} ////////////////////////////////////////////////////////////
///////////////// Fourth screen
////////////////////////////////////////////////////////////

function $f0a5fc76378d1581cc7b$var$slide4Active() {
  $f0a5fc76378d1581cc7b$var$selectSlideById(2);
} ////////////////////////////////////////////////////////////
///////////////// Fifth screen
////////////////////////////////////////////////////////////

function $f0a5fc76378d1581cc7b$var$slide5Active() {
  $f0a5fc76378d1581cc7b$var$selectSlideById(3);
} ////////////////////////////////////////////////////////////
///////////////// Sixth screen
////////////////////////////////////////////////////////////

function $f0a5fc76378d1581cc7b$var$slide6Active() {
  $f0a5fc76378d1581cc7b$var$selectSlideById(4);
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

let count;

let micro3Slid = () => {
  mikro__Slide1.addEventListener("click", function () {
    mikro__Slide1.classList.add("active");
    mikro__img__Slide1.classList.add("hidden");
    mikro__img1__Slide1.classList.add("visible");
    comics1__Slide1.classList.add("active");
    count = 1;
    recognition.start();
    recognition.onresult = function (event) {
      if (event.results[0][0].confidence >= 0.7) {
          slide1.classList.remove('activeSlide');
          text__Slide1.classList.remove('activeText');
        $f0a5fc76378d1581cc7b$var$slide3Active();
      }
      else{
        slide1.classList.remove('activeSlide');
        text__Slide1.classList.remove('activeText');
        slide2.classList.remove("activeSlide");
        text__Slide2.classList.remove("activeText");
        slide2.classList.add('activeSlide');
        text__Slide2.classList.add('activeText');
      }
      console.log("Confidence: " + event.results[0][0].confidence);
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
    count = 3;
    recognition.onresult = function (event) {
      if (event.results[0][0].confidence >= 0.7) {
        slide3.classList.remove('activeSlide');
        text__Slide3.classList.remove('activeText');
        $f0a5fc76378d1581cc7b$var$slide4Active();
      }
      else{
        slide3.classList.remove('activeSlide');
        text__Slide3.classList.remove('activeText');
        slide2.classList.remove("activeSlide");
        text__Slide2.classList.remove("activeText");
        slide2.classList.add('activeSlide');
        text__Slide2.classList.add('activeText');
      }
      console.log("Confidence: " + event.results[0][0].confidence);
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
    count = 4;
    recognition.onresult = function (event) {
      if (event.results[0][0].confidence >= 0.7) {
        slide4.classList.remove('activeSlide');
        text__Slide4.classList.remove('activeText');
        $f0a5fc76378d1581cc7b$var$slide5Active();
      }
      else{
        slide4.classList.remove('activeSlide');
        text__Slide4.classList.remove('activeText');
        slide2.classList.remove("activeSlide");
        text__Slide2.classList.remove("activeText");
        slide2.classList.add('activeSlide');
        text__Slide2.classList.add('activeText');
      }
      console.log("Confidence: " + event.results[0][0].confidence);
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
    count = 2;
    recognition.start();
    recognition.onresult = function (event) {
      if (event.results[0][0].confidence >= 0.7) {
        slide5.classList.remove('activeSlide');
        text__Slide5.classList.remove('activeText');
        $f0a5fc76378d1581cc7b$var$slide6Active();
      }
      else{
        slide5.classList.remove('activeSlide');
        text__Slide5.classList.remove('activeText');
        slide2.classList.remove("activeSlide");
        text__Slide2.classList.remove("activeText");
        slide2.classList.add('activeSlide');
        text__Slide2.classList.add('activeText');
      }
      console.log("Confidence: " + event.results[0][0].confidence);
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
    count = 0;
    recognition.onresult = function (event) {
      if (event.results[0][0].confidence >= 0.7) {
        slide6.classList.remove('activeSlide');
        text__Slide6.classList.remove('activeText');
        $f0a5fc76378d1581cc7b$var$selectSlideById(0);
      }
      else{
        slide6.classList.remove('activeSlide');
        text__Slide6.classList.remove('activeText');
        slide2.classList.remove("activeSlide");
        text__Slide2.classList.remove("activeText");
        slide2.classList.add('activeSlide');
        text__Slide2.classList.add('activeText');
      }
      console.log("Confidence: " + event.results[0][0].confidence);
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
        $f0a5fc76378d1581cc7b$var$selectSlideById(count++);
        slide2.classList.remove("activeSlide");
        text__Slide2.classList.remove("activeText");
      }
      else{
        slide2.classList.remove("activeSlide");
        text__Slide2.classList.remove("activeText");
        slide2.classList.add('activeSlide');
        text__Slide2.classList.add('activeText');
      }
      console.log("Confidence: " + event.results[0][0].confidence);
      
    };
    ecognition.onspeechend = function () {
      recognition.stop();
      mikro__Slide2.classList.remove("active");
      mikro__img__Slide2.classList.remove("hidden");
      mikro__img1__Slide2.classList.remove("visible");
      comics1__Slide2.classList.remove("active");
    };
  });
  
};

nextSlid();