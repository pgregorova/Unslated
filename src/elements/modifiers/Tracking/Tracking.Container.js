class Tracking {
  constructor(options) {
    this.settings = {
      eventTypes: [
        'load',
        'pageload',
        'beforeunload',
        'unload',
        'reset',
        'submit',
        'resize',
        'scroll',
        'cut',
        'copy',
        'paste',
        'drag',
        'dragend',
        'dragover',
        'dragleave',
        'drop',
        'mouseenter',
        'mouseover',
        'mousemove',
        'mousedown',
        'mouseup',
        'mouseout',
        'mouseleave',
        'auxclick',
        'click',
        'dblclick',
        'contextmenu',
        'select',
        'pointerlockchange',
        'pointerlockerror',
        'select',
        'keyup',
        'keypress',
        'keydown',
        'focus',
        'blur',
        'play',
        'pause',
        'seeking',
        'seeked',
        'volumechange',
        'ratechange',
        'stalled',
        'ended',
        'waiting',
        'complete',
        'change',
        'input'
      ]
    };

    this.debounceList = [
      'keydown',
      'waiting',
      'mousemove',
      'keypress',
      'scroll'
    ];

    this.ui = {
      trackingAttrs: document.querySelectorAll('[data-tracking]')
    };

    this.init(options);
    this.debounceWait = undefined;
  }

  setupGoogleTagManager = (id) => {
    if (!id) {
      console.log('Error: Google Tag Manager requires an account id to complete tracking setup.'); // eslint-disable-line
      return;
    }

    // Google Tag Manager Setup Code
    ((w, d, s, l, i) => {
      const f = d.getElementsByTagName(s)[0];
      if (!f) { return; }
      const j = d.createElement(s);
      const dl = l !== 'dataLayer' ? ['&l=', l].join('') : '';

      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      j.async = true;
      j.src = ['https://www.googletagmanager.com/gtm.js?id=', i, dl].join('');
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', id);
  }

  setupVendors = (vendors) => {
    let v = vendors.length;
    while (v--) {
      if (vendors[v].type.match('Google')) {
        this.setupGoogleTagManager(vendors[v].id);
      }
    }
  }

  validateFormatting = (formatting) => {
    try {
      return JSON.parse(formatting.replace(/'/g, '"'));
    } catch (err) {
      console.log('Error: It appears this element has a malformatted data-tracking value. Please correct syntax issues.'); // eslint-disable-line
      return false;
    }
  }

  validateSelector = (query) => {
    const attr = query.split(':attr');
    let selector;
    try {
      selector = document.querySelector(attr[0]);
      // if element selector contained a attribute selection
      if (attr[1]) {
        return selector[attr[1].replace('(', '').replace(')', '')];
      }

      return selector.innerHTML;
    } catch (e) {
      return false;
    }
  }

  validateDate = (data) => {
    // for the sakes of re-usability, we boil down data to a collection variable
    let collection = null; // prep collection to be null for null based data

    if (data) {
      collection = data; // catch for null or string based data

      // if data is a potential JSON object
      if (typeof data === 'object') {
        // when data is a JSON object
        collection = [];
        const keys = Object.keys(data).reverse();
        let j = keys.length;

        while (j--) {
          if (this.validateSelector(data[keys[j]])) {
            // selector for value of data spread
            collection[keys[j]] = this.validateSelector(data[keys[j]]);
          } else {
            // string for value of data spread
            collection[keys[j]] = data[keys[j]];
          }
        }
      // if data is a potential element selector
      } else if (this.validateSelector(data)) {
        collection = this.validateSelector(data);
      }
    }

    // returns collection as null, string, element innerHTML (string), element attribute (string) or object
    return collection;
  }

  execute = (elm, eventType, debounceBool) => {
    // first we validate dataset.tracking
    if (!this.validateFormatting(elm.dataset.tracking)) {
      return;
    }
    // we always do a debouce clear incase we are using debounce default events
    clearTimeout(this.debounceWait);
    // hook into the debounceWait variable to set a debounce or non-debounce timeout
    if (debounceBool > -1) {
      this.debounceWait = setTimeout(() => {
        // scrub the incoming data against data tracking requirements
        this.eventScrub(this.validateFormatting(elm.dataset.tracking), eventType, elm);
        // conditional debounce or non-debounce period
      }, 250);
    } else {
      this.eventScrub(this.validateFormatting(elm.dataset.tracking), eventType, elm);
    }
  }

  eventScrub = (dataset, type, elm) => {
    // mutli-event track looping
    let i = dataset.length;
    while (i--) {
      const { elements } = dataset[i];
      const { event } = dataset[i];
      let { label } = dataset[i];
      let { data } = dataset[i];

      label = label.replace(/ /g, '');

      // multi-element track check
      if (elements) {
        // because the element that got us here was orignally a child of our then re-focused target
        // looping over dataset.tracking.elements and checking if lack of parent with dataset.tracking attribute is sufficent
        const elms = elm.querySelectorAll(elements);
        let j = elms.length;
        while (j--) {
          // again, if a single element doesn't have a parent with tracking, we break out of eventScrub.
          if (!this.getParent(elms[j])) {
            console.log('Error: There appears to be mult-element tracking setup on non-existent children.'); // eslint-disable-line
            return;
          }
        }
      }

      // if we don't have do tracking
      if (event === type) {
        if (global.dataLayer) { // Google Tag Manager
          // when no data is supplied we only push out event
          data = this.validateDate(data);
          if (typeof data === 'string') {
            global.dataLayer.push({
              event: label,
              data
            });
          } else {
            global.dataLayer.push({
              event: label,
              ...data
            });
          }
        }
      }
    }
  }

  // search parents with tracking data attribute
  getParent = (el) => {
    while (el.parentNode) {
      el = el.parentNode;
      if (el === document) { return false; }

      if (el.hasAttribute('data-tracking')) {
        return el;
      }
    }
    return false;
  }

  // init the watcher
  init = (options) => {
    this.setupVendors(options.vendors);

    // Installs event based tracking
    let i = this.settings.eventTypes.length;
    while (i--) {
      document.body.addEventListener(this.settings.eventTypes[i], (e) => {
        const { target } = e;
        const { type } = e;
        const { tracking } = target.dataset;

        // if clicked target or parent element has tracking
        if (tracking || this.getParent(target)) {
          // finally execute tracking method
          this.execute(
            (this.getParent(target) ? this.getParent(target) : target),
            type,
            this.debounceList.indexOf(type)
          );
        }
      }, true, true);
    }

    // Performs pageload tracking by locating them and executing them without user interaction
    Object.keys(this.ui.trackingAttrs).map((elmIndex) => {
      // Validate prior to parsing
      if (!this.validateFormatting(this.ui.trackingAttrs[elmIndex].dataset.tracking)) {
        return null;
      }
      // Parse tracking attribute into object
      const trackingAttr = JSON.parse(this.ui.trackingAttrs[elmIndex].dataset.tracking.replace(/'/g, '"'));
      // Because we can have more multiple tracking events in a single tracking attribute, we must loop over each event entry
      Object.keys(trackingAttr).map((attrIndex) => {
        // Now that we are down to a single tracking entry, lets condition for only pageload events
        const trackingEntry = trackingAttr[attrIndex];
        const trackingEvent = trackingEntry.event;

        if (trackingEvent === 'pageload') {
          // finally we return the execute method with our found pageload tracking record to perform tracking.
          return this.execute(this.ui.trackingAttrs[elmIndex], trackingEvent, this.debounceList.indexOf(trackingEvent));
        }
        return null;
      });
      return null;
    });

    // Allows for direct data layer pushing from API.
    this.send = (data) => {
      global.dataLayer.push(data);
    };

    this.sent = global.dataLayer;
  }
}

export default Tracking;
