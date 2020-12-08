

(function () {
  // ASSET: /home/user/Yard/SOD20_1357-DU/src/components/index.ts
  // ASSET: /home/user/Yard/SOD20_1357-DU/src/components/dom.ts
  const $c0527cd97f1bbea4f78bc197480fc721$export$$DOM = {
    set onLoad(startup) {
      if (/complete|interactive/.test(document.readyState)) {
        startup();
      } else {
        document.addEventListener('DOMContentLoaded', startup, false);
      }
    },

    hasClass(target, className) {
      return target.classList.contains(className);
    },

    removeClass(target, className) {
      target.classList.remove(className);
    }

  };
  var $ee5b091d6d519a5a38d5dee7764e19a7$var$ObserveChangesType;

  (function (ObserveChangesType) {
    ObserveChangesType["UPDATE"] = "UPDATE";
    ObserveChangesType["CLICK"] = "CLICK";
  })($ee5b091d6d519a5a38d5dee7764e19a7$var$ObserveChangesType || ($ee5b091d6d519a5a38d5dee7764e19a7$var$ObserveChangesType = {}));

  const $ee5b091d6d519a5a38d5dee7764e19a7$export$observe = (ui, dispatcher) => {
    const policy = {
      attributes: true,
      childList: false,
      subtree: false
    };

    const getInternalName = name => {
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
        target.addEventListener('click', () => {
          const target = selector;
          const selectionName = getInternalName(target.id);
          let selection = {
            name: selectionName
          };
          dispatcher(selection, $ee5b091d6d519a5a38d5dee7764e19a7$var$ObserveChangesType.CLICK);
        });
      });
    };

    const mo = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        const target = mutation.target;
        const selectionName = getInternalName(target.id);
        let selection = {
          name: selectionName
        };
        mo.disconnect();
        dispatcher(selection, $ee5b091d6d519a5a38d5dee7764e19a7$var$ObserveChangesType.UPDATE);
        listenMutationChanges();
      });
    });
    listenMutationChanges();
    listenClickEvents();
  };

  // Copied from https://github.com/chris-rudmin/Recorderjs
  var $ba0e39d252e14be1a89a9ee918390053$export$default = () => {
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
      let view = new DataView(wav.buffer); // RIFF identifier 'RIFF'

      view.setUint32(0, 1380533830, false); // file length minus RIFF identifier length and file description length

      view.setUint32(4, 36 + length, true); // RIFF type 'WAVE'

      view.setUint32(8, 1463899717, false); // format chunk identifier 'fmt '

      view.setUint32(12, 1718449184, false); // format chunk length

      view.setUint32(16, 16, true); // sample format (raw)

      view.setUint16(20, 1, true); // channel count

      view.setUint16(22, 1, true); // sample rate

      view.setUint32(24, sampleRate, true); // byte rate (sample rate * block align)

      view.setUint32(28, sampleRate * BYTES_PER_SAMPLE, true); // block align (channel count * bytes per sample)

      view.setUint16(32, BYTES_PER_SAMPLE, true); // bits per sample

      view.setUint16(34, 8 * BYTES_PER_SAMPLE, true); // data chunk identifier 'data'

      view.setUint32(36, 1684108385, false); // data chunk length

      view.setUint32(40, length, true); // eslint-disable-next-line unicorn/no-for-loop

      for (let i = 0; i < recorded.length; i++) {
        wav.set(recorded[i], i * bufferLength + 44);
      }

      recorded = [];
      postMessage(wav.buffer, [wav.buffer]);
    }

    onmessage = e => {
      if (e.data[0] === 'encode') {
        encode(e.data[1]);
      } else if (e.data[0] === 'dump') {
        dump(e.data[1]);
      }
    };
  };

  let $d6ce34dc838697cb43980476b5e48736$var$AudioContext = window.AudioContext || window.webkitAudioContext;

  let $d6ce34dc838697cb43980476b5e48736$var$createWorker = fn => {
    let js = fn.toString().replace(/^(\(\)\s*=>|function\s*\(\))\s*{/, '').replace(/}$/, '');
    let blob = new Blob([js]);
    return new Worker(URL.createObjectURL(blob));
  };

  let $d6ce34dc838697cb43980476b5e48736$var$error = method => {
    let event = new Event('error');
    event.data = new Error('Wrong state for ' + method);
    return event;
  };

  let $d6ce34dc838697cb43980476b5e48736$var$context;
  /**
   * Audio Recorder with MediaRecorder API.
   *
   * @example
   * navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
   *   let recorder = new MediaRecorder(stream)
   * })
   */

  class $d6ce34dc838697cb43980476b5e48736$export$default {
    /**
     * @param {MediaStream} stream The audio stream to record.
     */
    constructor(stream, config = null) {
      /**
       * The `MediaStream` passed into the constructor.
       * @type {MediaStream}
       */
      this.stream = stream;
      this.config = config;
      /**
       * The current state of recording process.
       * @type {"inactive"|"recording"|"paused"}
       */

      this.state = 'inactive';
      this.em = document.createDocumentFragment();
      this.encoder = $d6ce34dc838697cb43980476b5e48736$var$createWorker($d6ce34dc838697cb43980476b5e48736$export$default.encoder);
      let recorder = this;
      this.encoder.addEventListener('message', e => {
        let event = new Event('dataavailable');
        event.data = new Blob([e.data], {
          type: recorder.mimeType
        });
        recorder.em.dispatchEvent(event);

        if (recorder.state === 'inactive') {
          recorder.em.dispatchEvent(new Event('stop'));
        }
      });
    }
    /**
     * Begins recording media.
     *
     * @param {number} [timeslice] The milliseconds to record into each `Blob`.
     *                             If this parameter isn’t included, single `Blob`
     *                             will be recorded.
     *
     * @return {undefined}
     *
     * @example
     * recordButton.addEventListener('click', () => {
     *   recorder.start()
     * })
     */


    start(timeslice) {
      if (this.state !== 'inactive') {
        return this.em.dispatchEvent($d6ce34dc838697cb43980476b5e48736$var$error('start'));
      }

      this.state = 'recording';

      if (!$d6ce34dc838697cb43980476b5e48736$var$context) {
        $d6ce34dc838697cb43980476b5e48736$var$context = new $d6ce34dc838697cb43980476b5e48736$var$AudioContext(this.config);
      }

      this.clone = this.stream.clone();
      this.input = $d6ce34dc838697cb43980476b5e48736$var$context.createMediaStreamSource(this.clone);
      this.processor = $d6ce34dc838697cb43980476b5e48736$var$context.createScriptProcessor(2048, 1, 1);
      this.encoder.postMessage(['init', $d6ce34dc838697cb43980476b5e48736$var$context.sampleRate]);

      this.processor.onaudioprocess = e => {
        if (this.state === 'recording') {
          this.encoder.postMessage(['encode', e.inputBuffer.getChannelData(0)]);
        }
      };

      this.input.connect(this.processor);
      this.processor.connect($d6ce34dc838697cb43980476b5e48736$var$context.destination);
      this.em.dispatchEvent(new Event('start'));

      if (timeslice) {
        this.slicing = setInterval(() => {
          if (this.state === 'recording') this.requestData();
        }, timeslice);
      }

      return undefined;
    }
    /**
     * Stop media capture and raise `dataavailable` event with recorded data.
     *
     * @return {undefined}
     *
     * @example
     * finishButton.addEventListener('click', () => {
     *   recorder.stop()
     * })
     */


    stop() {
      if (this.state === 'inactive') {
        return this.em.dispatchEvent($d6ce34dc838697cb43980476b5e48736$var$error('stop'));
      }

      this.requestData();
      this.state = 'inactive';
      this.clone.getTracks().forEach(track => {
        track.stop();
      });
      this.processor.disconnect();
      this.input.disconnect();
      return clearInterval(this.slicing);
    }
    /**
     * Pauses recording of media streams.
     *
     * @return {undefined}
     *
     * @example
     * pauseButton.addEventListener('click', () => {
     *   recorder.pause()
     * })
     */


    pause() {
      if (this.state !== 'recording') {
        return this.em.dispatchEvent($d6ce34dc838697cb43980476b5e48736$var$error('pause'));
      }

      this.state = 'paused';
      return this.em.dispatchEvent(new Event('pause'));
    }
    /**
     * Resumes media recording when it has been previously paused.
     *
     * @return {undefined}
     *
     * @example
     * resumeButton.addEventListener('click', () => {
     *   recorder.resume()
     * })
     */


    resume() {
      if (this.state !== 'paused') {
        return this.em.dispatchEvent($d6ce34dc838697cb43980476b5e48736$var$error('resume'));
      }

      this.state = 'recording';
      return this.em.dispatchEvent(new Event('resume'));
    }
    /**
     * Raise a `dataavailable` event containing the captured media.
     *
     * @return {undefined}
     *
     * @example
     * this.on('nextData', () => {
     *   recorder.requestData()
     * })
     */


    requestData() {
      if (this.state === 'inactive') {
        return this.em.dispatchEvent($d6ce34dc838697cb43980476b5e48736$var$error('requestData'));
      }

      return this.encoder.postMessage(['dump', $d6ce34dc838697cb43980476b5e48736$var$context.sampleRate]);
    }
    /**
     * Add listener for specified event type.
     *
     * @param {"start"|"stop"|"pause"|"resume"|"dataavailable"|"error"}
     * type Event type.
     * @param {function} listener The listener function.
     *
     * @return {undefined}
     *
     * @example
     * recorder.addEventListener('dataavailable', e => {
     *   audio.src = URL.createObjectURL(e.data)
     * })
     */


    addEventListener(...args) {
      this.em.addEventListener(...args);
    }
    /**
     * Remove event listener.
     *
     * @param {"start"|"stop"|"pause"|"resume"|"dataavailable"|"error"}
     * type Event type.
     * @param {function} listener The same function used in `addEventListener`.
     *
     * @return {undefined}
     */


    removeEventListener(...args) {
      this.em.removeEventListener(...args);
    }
    /**
     * Calls each of the listeners registered for a given event.
     *
     * @param {Event} event The event object.
     *
     * @return {boolean} Is event was no canceled by any listener.
     */


    dispatchEvent(...args) {
      this.em.dispatchEvent(...args);
    }

  }
  /**
   * The MIME type that is being used for recording.
   * @type {string}
   */


  $d6ce34dc838697cb43980476b5e48736$export$default.prototype.mimeType = 'audio/wav';
  /**
   * Returns `true` if the MIME type specified is one the polyfill can record.
   *
   * This polyfill supports `audio/wav` and `audio/mpeg`.
   *
   * @param {string} mimeType The mimeType to check.
   *
   * @return {boolean} `true` on `audio/wav` and `audio/mpeg` MIME type.
   */

  $d6ce34dc838697cb43980476b5e48736$export$default.isTypeSupported = mimeType => {
    return $d6ce34dc838697cb43980476b5e48736$export$default.prototype.mimeType === mimeType;
  };
  /**
   * `true` if MediaRecorder can not be polyfilled in the current browser.
   * @type {boolean}
   *
   * @example
   * if (MediaRecorder.notSupported) {
   *   showWarning('Audio recording is not supported in this browser')
   * }
   */


  $d6ce34dc838697cb43980476b5e48736$export$default.notSupported = !navigator.mediaDevices || !$d6ce34dc838697cb43980476b5e48736$var$AudioContext;
  /**
   * Converts RAW audio buffer to compressed audio files.
   * It will be loaded to Web Worker.
   * By default, WAVE encoder will be used.
   * @type {function}
   *
   * @example
   * MediaRecorder.prototype.mimeType = 'audio/ogg'
   * MediaRecorder.encoder = oggEncoder
   */

  $d6ce34dc838697cb43980476b5e48736$export$default.encoder = $ba0e39d252e14be1a89a9ee918390053$export$default;

  function $b42280256d2946bcfd3ae612517c9d$var$_defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  class $b42280256d2946bcfd3ae612517c9d$export$SpeechKit {
    constructor() {
      $b42280256d2946bcfd3ae612517c9d$var$_defineProperty(this, "dictionary", ["Hallo", "Hallo Caddy, wechsle zum nächsten Feature", "Hallo Caddy", "Feature", "hallo Käddi", "wechsle", "zum nächsten", "wechsle zum nächsten Feature", "Hallo Caddy wechsle zum nächsten Feature"]);
    }

    async recognize() {
      try {
        return new Promise(resolve => {
          navigator.mediaDevices.getUserMedia({
            audio: true
          }).then(stream => {
            this.recorder = new $d6ce34dc838697cb43980476b5e48736$export$default(stream);
            this.recorder.addEventListener('dataavailable', e => {
              const reader = new FileReader();
              reader.readAsDataURL(e.data);
              reader.addEventListener('loadend', async () => {
                // @ts-ignore
                const audioChunk = reader.result.split(',')[1];
                const payload = await this.request(audioChunk);
                const result = this.match(payload);
                resolve(result);
              }, false);
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
          error: true
        };
      }
    }

    stopRecorder() {
      if (typeof this.recorder !== 'undefined') {
        this.recorder.stop();
        this.recorder.stream.getTracks().forEach(track => track.stop());
      }
    }

    match(payload) {
      if (typeof payload.results !== 'undefined') {
        let matches = [];
        payload.results.forEach(record => {
          record.alternatives.forEach(sample => {
            if (this.dictionary.includes(sample.transcript)) {
              matches.push(sample.transcript);
            }
          });
        });
        return {
          success: matches.length > 0
        };
      } else {
        return {
          success: false
        };
      }
    }

    async request(chunk) {
      const URL = `${$b42280256d2946bcfd3ae612517c9d$export$SpeechKit.URL}${$b42280256d2946bcfd3ae612517c9d$export$SpeechKit.KEY}`;
      const payload = {
        audio: {
          content: chunk
        },
        config: {
          enableAutomaticPunctuation: false,
          encoding: "LINEAR16",
          languageCode: "de-DE",
          model: "default"
        }
      };
      return new Promise(async resolve => {
        try {
          const response = await fetch(URL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            resolve(response.json());
          } else {
            resolve({
              error: true
            });
          }
        } catch (e) {
          resolve({
            error: true
          });
        }
      });
    }

  }

  $b42280256d2946bcfd3ae612517c9d$var$_defineProperty($b42280256d2946bcfd3ae612517c9d$export$SpeechKit, "URL", "//speech.googleapis.com/v1p1beta1/speech:recognize?key=");
  $b42280256d2946bcfd3ae612517c9d$var$_defineProperty($b42280256d2946bcfd3ae612517c9d$export$SpeechKit, "KEY", "AIzaSyB0prP56MBRzjZPVMLJHL408pTxzRtKJok");

  function $c0f86f4d28d50758fd5b0d656c6b9641$var$_defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  class $c0f86f4d28d50758fd5b0d656c6b9641$export$Signal {
    set on(listener) {
      this.listeners.push(listener);
    }

    constructor(props) {
      $c0f86f4d28d50758fd5b0d656c6b9641$var$_defineProperty(this, "listeners", []);
      $c0f86f4d28d50758fd5b0d656c6b9641$var$_defineProperty(this, "isLocked", false);
      $c0f86f4d28d50758fd5b0d656c6b9641$var$_defineProperty(this, "props", {
        lockUntilFinish: false
      });
      this.props = props;
    }

    async emit(payload = {}) {
      return new Promise(resolve => {
        if (!this.isLocked) {
          this.isLocked = true;

          if (this.props.lockUntilFinish) {
            // TODO: autoresolve due no resolver in listener
            const signals = this.listeners.map(listener => {
              return new Promise(resolve => {
                listener(resolve, payload);
              });
            });
            Promise.all(signals).then(() => {
              resolve(true);
              this.isLocked = false;
            });
          } else {
            this.listeners.forEach(listener => {
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

  $c0527cd97f1bbea4f78bc197480fc721$export$$DOM.onLoad = () => {
    let totalSlides = 4;
    let currentSlide = 0;
    const SlidesUI = {
      slideId1: document.querySelector('#slide1'),
      slideId3: document.querySelector('#slide3'),
      slideId4: document.querySelector('#slide4'),
      slideId5: document.querySelector('#slide5'),
      slideId6: document.querySelector('#slide6')
    };
    const MicrophoneButtonsUI = {
      microButton1: document.querySelector('#mikro__img1__Slide1'),
      microButton2: document.querySelector('#mikro__img1__Slide2'),
      microButton3: document.querySelector('#mikro__img1__Slide3'),
      microButton4: document.querySelector('#mikro__img1__Slide4'),
      microButton5: document.querySelector('#mikro__img1__Slide5'),
      microButton6: document.querySelector('#mikro__img1__Slide6')
    };
    const ModalDialogButtonsUI = {
      modalDialogButton3: document.querySelector('#modal__img__Slide3'),
      modalDialogButton4: document.querySelector('#modal__img__Slide4'),
      modalDialogButton5: document.querySelector('#modal__img__Slide5'),
      modalDialogButton6: document.querySelector('#modal__img__Slide6')
    };
    const SlideNextButtonsUI = {
      next__Slide1: document.querySelector('#next__Slide1'),
      next__Slide2: document.querySelector('#next__Slide2'),
      next__Slide3: document.querySelector('#next__Slide3'),
      next__Slide4: document.querySelector('#next__Slide4'),
      next__Slide5: document.querySelector('#next__Slide5'),
      next__Slide6: document.querySelector('#next__Slide6')
    };
    const speech = new $b42280256d2946bcfd3ae612517c9d$export$SpeechKit();
    const hooks = {
      recognizeSpeech: new $c0f86f4d28d50758fd5b0d656c6b9641$export$Signal({
        lockUntilFinish: true
      })
    };

    const SlideNext = () => {
      const currentSlideId = currentSlide;
      const {
        selector,
        id
      } = Object.entries(SlidesUI).map(([slideName, slideHTMLElement], $slideId) => {
        if (currentSlideId === $slideId) {
          const slideId = parseInt(slideName.slice(-1));
          return {
            id: slideId,
            selector: slideHTMLElement
          };
        } else {
          return {
            id: undefined,
            selector: undefined
          };
        }
      }).filter(selector => typeof selector.id !== 'undefined')[0];

      if (typeof selector !== 'undefined') {
        // @ts-ignore
        selector === null || selector === void 0 ? void 0 : selector.querySelector(`.next__Slide${id}`).click();
      }
    };

    hooks.recognizeSpeech.on = async complete => {
      const respond = await speech.recognize(); // slide next

      if ("success" in respond && respond.success === true) {
        SlideNext();
      }

      resetMicrophoneIcons();
      complete();
    };

    const resetMicrophoneIcons = () => {
      Object.values(MicrophoneButtonsUI).forEach(element => {
        const target = element;

        if ($c0527cd97f1bbea4f78bc197480fc721$export$$DOM.hasClass(target, 'visible')) {
          target.click();
        }
      });
    };

    $ee5b091d6d519a5a38d5dee7764e19a7$export$observe(MicrophoneButtonsUI, () => {
      hooks.recognizeSpeech.emit();
    }); // Changes observers

    $ee5b091d6d519a5a38d5dee7764e19a7$export$observe(SlideNextButtonsUI, () => {
      currentSlide = totalSlides > currentSlide ? currentSlide + 1 : 0;
      resetMicrophoneIcons();
    });
    $ee5b091d6d519a5a38d5dee7764e19a7$export$observe(ModalDialogButtonsUI, () => {
      resetMicrophoneIcons();
    });
  };
})();
