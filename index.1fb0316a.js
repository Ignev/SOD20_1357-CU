(function () {
  const $779d36fd802b6fc89e0815fd814c00e4$export$$DOM = {
    set onLoad(startup) {
      if (/complete|interactive/.test(document.readyState)) {
        startup();
      } else {
        document.addEventListener("DOMContentLoaded", startup, false);
      }
    },

    hasClass(target, className) {
      return target.classList.contains(className);
    },

    removeClass(target, className) {
      target.classList.remove(className);
    },
  };

  $779d36fd802b6fc89e0815fd814c00e4$export$$DOM.onLoad = () => {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var SpeechRecognitionEvent =
      SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
    dictionary = [
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
      "#JSGF V1.0; grammar words; public <word> = " +
      dictionary.join(" | ") +
      " ;";
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = "de-DE";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    let currentSlide = 0;

    const selectSlideById = (slideId) => {
      let currentSlideId = slideId;
      const defaults = {
        selectors: {
          activeSlide: "activeSlide",
          activeText: "activeText",
        },
        fadeHeaderDelay: 750,
      };
      const slides = [slide1, slide3, slide4, slide5, slide6, slide2];
      const headers = [
        text__Slide1,
        text__Slide3,
        text__Slide4,
        text__Slide5,
        text__Slide6,
        text__Slide2,
      ];

      if (currentSlideId === 0) {
        slideList.append(slides[1]);
        selectSlideById(1);
        return false;
      }

      if (currentSlideId === -1) {
        slideList.append(slides[1]);
        selectSlideById(5);
        return false;
      }

      slideList.append(slides[currentSlideId]);
      headers.forEach((slide, slideId) => {
        slide.classList.remove(defaults.selectors.activeText);
      });
      setTimeout(function () {
        slides[currentSlideId].classList.add(defaults.selectors.activeSlide);
        headers[slideId].classList.add(defaults.selectors.activeText);
      }, 100);
      setTimeout(function () {
        slides.forEach((slide, slideId) => {
          if (slideId == currentSlideId) {
            return true;
          }

          slide.classList.remove(defaults.selectors.activeSlide);
        });
      }, 750);
    };
    recognition.onresult = function (event) {
      console.log("Confidence: " + event.results[0][0].confidence);

      var found = false;

      if (typeof event.results != "undefined") {
        var resString = event.results[0][0].transcript.toLowerCase();
        var arResult = resString.split(" ");
        console.log(resString);
        arResult.forEach(function (i, v) {
          if (
            dictionary.indexOf(i) > -1 ||
            dictionary.indexOf(resString) > -1
          ) {
            selectSlideById(currentSlide);
            found = true;
            return false;
          }
        });
      }

      if (!found) {
        selectSlideById(-1);
      }

      resetMicrophoneIcons();
    };

    recognition.onspeechend = function () {
      recognition.stop();
    };

    recognition.onerror = function (event) {
      console.error("error" + event);
    };

    var bool1 = false;
    var bool2 = false;
    var bool3 = false;
    var bool4 = false;
    var bool5 = false;
    var bool6 = false;
    comics__Slide1.classList.add("active");
    mikro__Slide1.addEventListener("click", function () {
      currentSlide = 0;

      if (!bool1) {
        recognition.start();
        setTimeout(function () {
          recognition.stop();
          resetMicrophoneIcons();
        }, 4000);
        mikro__Slide1.classList.add("active");
        mikro__img__Slide1.classList.add("hidden");
        mikro__img1__Slide1.classList.add("visible");
        comics__Slide1.classList.remove("active");
        comics1__Slide1.classList.add("active");
        bool1 = true;
      } else {
        mikro__Slide1.classList.remove("active");
        mikro__img__Slide1.classList.remove("hidden");
        mikro__img1__Slide1.classList.remove("visible");
        comics__Slide1.classList.add("active");
        comics1__Slide1.classList.remove("active");
        bool1 = false;
      }
    });
    mikro__Slide2.addEventListener("click", function () {
      currentSlide = 1;

      if (!bool2) {
        recognition.start();
        setTimeout(function () {
          recognition.stop();
          resetMicrophoneIcons();
        }, 4000);
        mikro__img__Slide2.classList.add("hidden");
        mikro__img1__Slide2.classList.add("visible");
        comics1__Slide2.classList.add("active");
        bool2 = true;
      } else {
        mikro__img__Slide2.classList.remove("hidden");
        mikro__img1__Slide2.classList.remove("visible");
        comics1__Slide2.classList.remove("active");
        bool2 = false;
      }
    });
    mikro__Slide3.addEventListener("click", function () {
      currentSlide = 2;

      if (!bool3) {
        recognition.start();
        setTimeout(function () {
          recognition.stop();
          resetMicrophoneIcons();
        }, 4000);
        mikro__Slide3.classList.add("active");
        mikro__img__Slide3.classList.add("hidden");
        mikro__img1__Slide3.classList.add("visible");
        comics1__Slide3.classList.add("active");
        bool3 = true;
      } else {
        mikro__Slide3.classList.remove("active");
        mikro__img__Slide3.classList.remove("hidden");
        mikro__img1__Slide3.classList.remove("visible");
        comics1__Slide3.classList.remove("active");
        bool3 = false;
      }
    });
    mikro__Slide4.addEventListener("click", function () {
      currentSlide = 3;

      if (!bool4) {
        recognition.start();
        setTimeout(function () {
          recognition.stop();
          resetMicrophoneIcons();
        }, 4000);
        mikro__Slide4.classList.add("active");
        mikro__img__Slide4.classList.add("hidden");
        mikro__img1__Slide4.classList.add("visible");
        comics1__Slide4.classList.add("active");
        bool4 = true;
      } else {
        mikro__Slide4.classList.remove("active");
        mikro__img__Slide4.classList.remove("hidden");
        mikro__img1__Slide4.classList.remove("visible");
        comics1__Slide4.classList.remove("active");
        bool4 = false;
      }
    });
    mikro__Slide5.addEventListener("click", function () {
      currentSlide = 4;

      if (!bool5) {
        recognition.start();
        setTimeout(function () {
          recognition.stop();
          resetMicrophoneIcons();
        }, 4000);
        mikro__Slide5.classList.add("active");
        mikro__img__Slide5.classList.add("hidden");
        mikro__img1__Slide5.classList.add("visible");
        comics1__Slide5.classList.add("active");
        bool5 = true;
      } else {
        mikro__Slide5.classList.remove("active");
        mikro__img__Slide5.classList.remove("hidden");
        mikro__img1__Slide5.classList.remove("visible");
        comics1__Slide5.classList.remove("active");
        bool5 = false;
      }
    });
    mikro__Slide6.addEventListener("click", function () {
      currentSlide = 1;

      if (!bool6) {
        recognition.start();
        setTimeout(function () {
          recognition.stop();
          resetMicrophoneIcons();
        }, 4000);
        mikro__Slide6.classList.add("active");
        mikro__img__Slide6.classList.add("hidden");
        mikro__img1__Slide6.classList.add("visible");
        comics1__Slide6.classList.add("active");
        bool6 = true;
      } else {
        mikro__Slide6.classList.remove("active");
        mikro__img__Slide6.classList.remove("hidden");
        mikro__img1__Slide6.classList.remove("visible");
        comics1__Slide6.classList.remove("active");
        bool6 = false;
      }
    });
  };
})();
