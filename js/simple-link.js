AFRAME.registerComponent('simple-link', {
  schema: {
    active: {
      default: true,
      type: 'boolean'
    },
    href: {
      default: '',
      type: 'string'
    },
    on: {
      default: 'click'
    }
  },

  multiple: false,

  init: function init() {
    this.navigate = this.navigate.bind(this);
    var el = this.el;
  },

  update: function update(oldData) {
    var data = this.data;

    if (data.on !== oldData.on) {
      this.updateEventListener();
    }
  },

  remove: function remove() {
    this.removeEventListener();
  },

  pause: function pause() {},

  play: function play() {
    this.updateEventListener();
  },
  updateEventListener: function updateEventListener() {
    var el = this.el;

    if (!el.isPlaying) {
      return;
    }

    this.removeEventListener();
    el.addEventListener(this.data.on, this.navigate);
  },
  removeEventListener: function removeEventListener() {
    var on = this.data.on;

    if (on) {
      this.el.removeEventListener(on, this.navigate);
    }
  },

  navigate: function navigate() {
    if (this.data.active) {
      window.location = this.data.href;
    }
  }
});