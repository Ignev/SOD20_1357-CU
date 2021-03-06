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
  var $6370119a8dc8fbf7417c36c6d344843e$var$ObserveChangesType;

  (function (ObserveChangesType) {
    ObserveChangesType["UPDATE"] = "UPDATE";
    ObserveChangesType["CLICK"] = "CLICK";
  })(
    $6370119a8dc8fbf7417c36c6d344843e$var$ObserveChangesType ||
      ($6370119a8dc8fbf7417c36c6d344843e$var$ObserveChangesType = {})
  );

  const $6370119a8dc8fbf7417c36c6d344843e$export$observe = (ui, dispatcher) => {
    const policy = {
      attributes: true,
      childList: false,
      subtree: false,
    };

    const getInternalName = (name) => {
      return Object.entries(ui).filter(([_, selector]) => {
        const e = selector;
        return e.id === name;
      })[0][0];
    };

    const listenMutationChanges = () => {
      Object.entries(ui).forEach(([_, selector]) => {
        const target = selector;
        mo.observe(target, policy);
      });
    };

    const listenClickEvents = () => {
      Object.entries(ui).forEach(([_, selector]) => {
        const target = selector;
        target.addEventListener("click", () => {
          const target = selector;
          const selectionName = getInternalName(target.id);
          let selection = {
            name: selectionName,
          };
          dispatcher(
            selection,
            $6370119a8dc8fbf7417c36c6d344843e$var$ObserveChangesType.CLICK
          );
        });
      });
    };

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const target = mutation.target;
        const selectionName = getInternalName(target.id);
        let selection = {
          name: selectionName,
        };
        mo.disconnect();
        dispatcher(
          selection,
          $6370119a8dc8fbf7417c36c6d344843e$var$ObserveChangesType.UPDATE
        );
        listenMutationChanges();
      });
    });
    listenMutationChanges();
    listenClickEvents();
  };

  var $2d1c8bfbd916d682b57d9ff567cdddcd$export$default = () => {
    let BYTES_PER_SAMPLE = 2;
    let recorded = [];

    function encode(buffer) {
      let length = buffer.length;
      let data = new Uint8Array(length * BYTES_PER_SAMPLE);

      for (let i = 0; i < length; i++) {
        let index = i * BYTES_PER_SAMPLE;
        let sample = buffer[i];

        if (sample > 1) {
          sample = 1;
        } else if (sample < -1) {
          sample = -1;
        }

        sample = sample * 32768;
        data[index] = sample;
        data[index + 1] = sample >> 8;
      }

      recorded.push(data);
    }

    function dump(sampleRate) {
      let bufferLength = recorded.length ? recorded[0].length : 0;
      let length = recorded.length * bufferLength;
      let wav = new Uint8Array(44 + length);
      let view = new DataView(wav.buffer);

      view.setUint32(0, 1380533830, false);

      view.setUint32(4, 36 + length, true);

      view.setUint32(8, 1463899717, false);

      view.setUint32(12, 1718449184, false);

      view.setUint32(16, 16, true);

      view.setUint16(20, 1, true);

      view.setUint16(22, 1, true);

      view.setUint32(24, sampleRate, true);

      view.setUint32(28, sampleRate * BYTES_PER_SAMPLE, true);

      view.setUint16(32, BYTES_PER_SAMPLE, true);
      view.setUint16(34, 8 * BYTES_PER_SAMPLE, true);

      view.setUint32(36, 1684108385, false);

      view.setUint32(40, length, true);

      for (let i = 0; i < recorded.length; i++) {
        wav.set(recorded[i], i * bufferLength + 44);
      }

      recorded = [];
      postMessage(wav.buffer, [wav.buffer]);
    }

    onmessage = (e) => {
      if (e.data[0] === "encode") {
        encode(e.data[1]);
      } else if (e.data[0] === "dump") {
        dump(e.data[1]);
      }
    };
  };

  let $44711b2d0319185f369ef7d4c1b0c4b3$var$AudioContext =
    window.AudioContext || window.webkitAudioContext;

  let $44711b2d0319185f369ef7d4c1b0c4b3$var$createWorker = (fn) => {
    let js = fn
      .toString()
      .replace(/^(\(\)\s*=>|function\s*\(\))\s*{/, "")
      .replace(/}$/, "");
    let blob = new Blob([js]);
    return new Worker(URL.createObjectURL(blob));
  };

  let $44711b2d0319185f369ef7d4c1b0c4b3$var$error = (method) => {
    let event = new Event("error");
    event.data = new Error("Wrong state for " + method);
    return event;
  };

  let $44711b2d0319185f369ef7d4c1b0c4b3$var$context;

  class $44711b2d0319185f369ef7d4c1b0c4b3$export$default {
    constructor(stream, config = null) {
      this.stream = stream;
      this.config = config;

      this.state = "inactive";
      this.em = document.createDocumentFragment();
      this.encoder = $44711b2d0319185f369ef7d4c1b0c4b3$var$createWorker(
        $44711b2d0319185f369ef7d4c1b0c4b3$export$default.encoder
      );
      let recorder = this;
      this.encoder.addEventListener("message", (e) => {
        let event = new Event("dataavailable");
        event.data = new Blob([e.data], {
          type: recorder.mimeType,
        });
        recorder.em.dispatchEvent(event);

        if (recorder.state === "inactive") {
          recorder.em.dispatchEvent(new Event("stop"));
        }
      });
    }

    start(timeslice) {
      if (this.state !== "inactive") {
        return this.em.dispatchEvent(
          $44711b2d0319185f369ef7d4c1b0c4b3$var$error("start")
        );
      }

      this.state = "recording";

      if (!$44711b2d0319185f369ef7d4c1b0c4b3$var$context) {
        $44711b2d0319185f369ef7d4c1b0c4b3$var$context = new $44711b2d0319185f369ef7d4c1b0c4b3$var$AudioContext(
          this.config
        );
      }

      this.clone = this.stream.clone();
      this.input = $44711b2d0319185f369ef7d4c1b0c4b3$var$context.createMediaStreamSource(
        this.clone
      );
      this.processor = $44711b2d0319185f369ef7d4c1b0c4b3$var$context.createScriptProcessor(
        2048,
        1,
        1
      );
      this.encoder.postMessage([
        "init",
        $44711b2d0319185f369ef7d4c1b0c4b3$var$context.sampleRate,
      ]);

      this.processor.onaudioprocess = (e) => {
        if (this.state === "recording") {
          this.encoder.postMessage(["encode", e.inputBuffer.getChannelData(0)]);
        }
      };

      this.input.connect(this.processor);
      this.processor.connect(
        $44711b2d0319185f369ef7d4c1b0c4b3$var$context.destination
      );
      this.em.dispatchEvent(new Event("start"));

      if (timeslice) {
        this.slicing = setInterval(() => {
          if (this.state === "recording") this.requestData();
        }, timeslice);
      }

      return undefined;
    }

    stop() {
      if (this.state === "inactive") {
        return this.em.dispatchEvent(
          $44711b2d0319185f369ef7d4c1b0c4b3$var$error("stop")
        );
      }

      this.requestData();
      this.state = "inactive";
      this.clone.getTracks().forEach((track) => {
        track.stop();
      });
      this.processor.disconnect();
      this.input.disconnect();
      return clearInterval(this.slicing);
    }

    pause() {
      if (this.state !== "recording") {
        return this.em.dispatchEvent(
          $44711b2d0319185f369ef7d4c1b0c4b3$var$error("pause")
        );
      }

      this.state = "paused";
      return this.em.dispatchEvent(new Event("pause"));
    }

    resume() {
      if (this.state !== "paused") {
        return this.em.dispatchEvent(
          $44711b2d0319185f369ef7d4c1b0c4b3$var$error("resume")
        );
      }

      this.state = "recording";
      return this.em.dispatchEvent(new Event("resume"));
    }

    requestData() {
      if (this.state === "inactive") {
        return this.em.dispatchEvent(
          $44711b2d0319185f369ef7d4c1b0c4b3$var$error("requestData")
        );
      }

      return this.encoder.postMessage([
        "dump",
        $44711b2d0319185f369ef7d4c1b0c4b3$var$context.sampleRate,
      ]);
    }

    addEventListener(...args) {
      this.em.addEventListener(...args);
    }

    removeEventListener(...args) {
      this.em.removeEventListener(...args);
    }

    dispatchEvent(...args) {
      this.em.dispatchEvent(...args);
    }
  }

  $44711b2d0319185f369ef7d4c1b0c4b3$export$default.prototype.mimeType =
    "audio/wav";

  $44711b2d0319185f369ef7d4c1b0c4b3$export$default.isTypeSupported = (
    mimeType
  ) => {
    return (
      $44711b2d0319185f369ef7d4c1b0c4b3$export$default.prototype.mimeType ===
      mimeType
    );
  };

  $44711b2d0319185f369ef7d4c1b0c4b3$export$default.notSupported =
    !navigator.mediaDevices ||
    !$44711b2d0319185f369ef7d4c1b0c4b3$var$AudioContext;

  $44711b2d0319185f369ef7d4c1b0c4b3$export$default.encoder = $2d1c8bfbd916d682b57d9ff567cdddcd$export$default;

  function $a740749464dd2996fbc56ddf6602277c$var$_defineProperty(
    obj,
    key,
    value
  ) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  class $a740749464dd2996fbc56ddf6602277c$export$SpeechKit {
    constructor() {
      $a740749464dd2996fbc56ddf6602277c$var$_defineProperty(
        this,
        "dictionary",
        [
          "hallo",
          "hallo caddy, wechsle zum nächsten feature",
          "hallo caddy",
          "feature",
          "hallo käddi",
          "wechsle",
          "zum nächsten",
          "wechsle zum nächsten feature",
          "hallo caddy wechsle zum nächsten feature",
        ]
      );
    }

    async recognize() {
      try {
        return new Promise((resolve) => {
          navigator.mediaDevices
            .getUserMedia({
              audio: true,
            })
            .then((stream) => {
              this.recorder = new $44711b2d0319185f369ef7d4c1b0c4b3$export$default(
                stream
              );
              this.recorder.addEventListener("dataavailable", (e) => {
                const reader = new FileReader();
                reader.readAsDataURL(e.data);
                reader.addEventListener(
                  "loadend",
                  async () => {
                    // @ts-ignore
                    const audioChunk = reader.result.split(",")[1];
                    const payload = await this.request(audioChunk);
                    const result = this.match(payload);
                    resolve(result);
                  },
                  false
                );
              });
              this.recorder.start();
              setTimeout(() => {
                this.stopRecorder();
              }, 4000);
            });
        });
      } catch {
        this.stopRecorder();
        return {
          error: true,
        };
      }
    }

    stopRecorder() {
      if (typeof this.recorder !== "undefined") {
        this.recorder.stop();
        this.recorder.stream.getTracks().forEach((track) => track.stop());
      }
    }

    match(payload) {
      if (typeof payload.results !== "undefined") {
        let matches = [];
        payload.results.forEach((record) => {
          record.alternatives.forEach((sample) => {
            if (this.dictionary.includes(sample.transcript.toLowerCase())) {
              console.log(sample.transcript);
              matches.push(sample.transcript);
            }
          });
        });
        return {
          success: matches.length > 0,
        };
      } else {
        return {
          success: false,
        };
      }
    }

    async request(chunk) {
      const URL = `${$a740749464dd2996fbc56ddf6602277c$export$SpeechKit.URL}${$a740749464dd2996fbc56ddf6602277c$export$SpeechKit.KEY}`;
      const payload = {
        audio: {
          content: chunk,
        },
        config: {
          enableAutomaticPunctuation: false,
          encoding: "LINEAR16",
          languageCode: "de-DE",
          model: "default",
        },
      };
      return new Promise(async (resolve) => {
        try {
          const response = await fetch(URL, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            resolve(response.json());
          } else {
            resolve({
              error: true,
            });
          }
        } catch (e) {
          resolve({
            error: true,
          });
        }
      });
    }
  }

  $a740749464dd2996fbc56ddf6602277c$var$_defineProperty(
    $a740749464dd2996fbc56ddf6602277c$export$SpeechKit,
    "URL",
    "//speech.googleapis.com/v1p1beta1/speech:recognize?key="
  );
  $a740749464dd2996fbc56ddf6602277c$var$_defineProperty(
    $a740749464dd2996fbc56ddf6602277c$export$SpeechKit,
    "KEY",
    "AIzaSyB0prP56MBRzjZPVMLJHL408pTxzRtKJok"
  );

  function $7838bf76636aa22fb410e64ce4f1f3b0$var$_defineProperty(
    obj,
    key,
    value
  ) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  class $7838bf76636aa22fb410e64ce4f1f3b0$export$Signal {
    set on(listener) {
      this.listeners.push(listener);
    }

    constructor(props) {
      $7838bf76636aa22fb410e64ce4f1f3b0$var$_defineProperty(
        this,
        "listeners",
        []
      );
      $7838bf76636aa22fb410e64ce4f1f3b0$var$_defineProperty(
        this,
        "isLocked",
        false
      );
      $7838bf76636aa22fb410e64ce4f1f3b0$var$_defineProperty(this, "props", {
        lockUntilFinish: false,
      });
      this.props = props;
    }

    async emit(payload = {}) {
      return new Promise((resolve) => {
        if (!this.isLocked) {
          this.isLocked = true;

          if (this.props.lockUntilFinish) {
            const signals = this.listeners.map((listener) => {
              return new Promise((resolve) => {
                listener(resolve, payload);
              });
            });
            Promise.all(signals).then(() => {
              resolve(true);
              this.isLocked = false;
            });
          } else {
            this.listeners.forEach((listener) => {
              const resolver = () => void listener(resolver, payload);
            });
            resolve(true);
            this.isLocked = false;
          }
        } else {
          resolve(false);
        }
      });
    }
  }

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
    const MicrophoneButtonsUI = {
      microButton1: document.querySelector("#mikro__img1__Slide1"),
      microButton2: document.querySelector("#mikro__img1__Slide2"),
      microButton3: document.querySelector("#mikro__img1__Slide3"),
      microButton4: document.querySelector("#mikro__img1__Slide4"),
      microButton5: document.querySelector("#mikro__img1__Slide5"),
      microButton6: document.querySelector("#mikro__img1__Slide6"),
    };
    const ModalDialogButtonsUI = {
      modalDialogButton3: document.querySelector("#modal__img__Slide3"),
      modalDialogButton4: document.querySelector("#modal__img__Slide4"),
      modalDialogButton5: document.querySelector("#modal__img__Slide5"),
      modalDialogButton6: document.querySelector("#modal__img__Slide6"),
    };
    const SlideNextButtonsUI = {
      next__Slide1: document.querySelector("#next__Slide1"),
      next__Slide2: document.querySelector("#next__Slide2"),
      next__Slide3: document.querySelector("#next__Slide3"),
      next__Slide4: document.querySelector("#next__Slide4"),
      next__Slide5: document.querySelector("#next__Slide5"),
      next__Slide6: document.querySelector("#next__Slide6"),
    };

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

    const resetMicrophoneIcons = () => {
      Object.values(MicrophoneButtonsUI).forEach((element) => {
        const target = element;

        if (
          $779d36fd802b6fc89e0815fd814c00e4$export$$DOM.hasClass(
            target,
            "visible"
          )
        ) {
          target.click();
        }
      });
    };

    $6370119a8dc8fbf7417c36c6d344843e$export$observe(
      MicrophoneButtonsUI,
      () => {}
    );

    $6370119a8dc8fbf7417c36c6d344843e$export$observe(SlideNextButtonsUI, () => {
      resetMicrophoneIcons();
    });
    $6370119a8dc8fbf7417c36c6d344843e$export$observe(
      ModalDialogButtonsUI,
      () => {
        resetMicrophoneIcons();
      }
    );
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
(function () {
  var $4d8a99e31ff559eeebf0200ec7849325$var$hellopreloader = document.getElementById(
    "hellopreloader_preload"
  );

  function $4d8a99e31ff559eeebf0200ec7849325$var$fadeOutnojquery(el) {
    el.style.opacity = 1;
    var interhellopreloader = setInterval(function () {
      el.style.opacity = el.style.opacity - 0.05;

      if (el.style.opacity <= 0.05) {
        clearInterval(interhellopreloader);
        $4d8a99e31ff559eeebf0200ec7849325$var$hellopreloader.style.display =
          "none";
      }
    }, 16);
  }

  window.onload = function () {
    setTimeout(function () {
      $4d8a99e31ff559eeebf0200ec7849325$var$fadeOutnojquery(
        $4d8a99e31ff559eeebf0200ec7849325$var$hellopreloader
      );
      setTimeout($4d8a99e31ff559eeebf0200ec7849325$var$play, 250);
    }, 1000);
  };

  const $4d8a99e31ff559eeebf0200ec7849325$var$selectSlideById = (slideId) => {
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
      slideList.append(slides[1]);
      $4d8a99e31ff559eeebf0200ec7849325$var$selectSlideById(1);
      return false;
    }

    slideList.append(slides[currentSlideId]);
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

  function $4d8a99e31ff559eeebf0200ec7849325$var$play() {
    const slide1 = document.querySelector(".slide1");
    slide1.classList.add("activeSlide");
    text__Slide1.classList.add("activeText");
  }

  next__Slide1.addEventListener("click", function () {
    $4d8a99e31ff559eeebf0200ec7849325$var$slide3Active();
  });
  next__Slide2.addEventListener("click", function () {
    $4d8a99e31ff559eeebf0200ec7849325$var$slide5Active();
  });
  next__Slide3.addEventListener("click", function () {
    $4d8a99e31ff559eeebf0200ec7849325$var$slide4Active();
  });
  next__Slide4.addEventListener("click", function () {
    $4d8a99e31ff559eeebf0200ec7849325$var$slide5Active();
  });
  next__Slide5.addEventListener("click", function () {
    $4d8a99e31ff559eeebf0200ec7849325$var$slide6Active();
    slide3.classList.remove("activeSlide");
  });
  next__Slide6.addEventListener("click", function () {
    $4d8a99e31ff559eeebf0200ec7849325$var$selectSlideById(0);
  });

  function $4d8a99e31ff559eeebf0200ec7849325$var$slide3Active() {
    $4d8a99e31ff559eeebf0200ec7849325$var$selectSlideById(1);
  }

  function $4d8a99e31ff559eeebf0200ec7849325$var$slide4Active() {
    $4d8a99e31ff559eeebf0200ec7849325$var$selectSlideById(2);
  }

  function $4d8a99e31ff559eeebf0200ec7849325$var$slide5Active() {
    $4d8a99e31ff559eeebf0200ec7849325$var$selectSlideById(3);
  }

  function $4d8a99e31ff559eeebf0200ec7849325$var$slide6Active() {
    $4d8a99e31ff559eeebf0200ec7849325$var$selectSlideById(4);
  }
})();
(function () {
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
  });
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
})();
