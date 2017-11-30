import Component from '@ember/component';
import layout from '../templates/components/cancelable-button';
import { computed } from "@ember/object";
import { later, cancel } from "@ember/runloop";
import { not } from '@ember/object/computed';
import { assert } from "@ember/debug";

export default Component.extend({
  layout,
  classNames: ['ember-cancelable-button'],

  timer: null,

  scheduledToSend: false,

  canSend: not('scheduledToSend'),

  sendingIn: null,
  sendingInSeconds: computed('sendingIn', function() {
    return this.get('sendingIn') / 1000;
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    let delay = this.get('delay');
    assert("If given, `delay` should be an integer", !delay || Number.isInteger(delay));
    if (delay && delay < 3) {
      // eslint-disable-next-line no-console
      console.warn(`You provided a delay of ${delay} seconds, which might be too little time for the user to cancel.`);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    this._cancelTimer();
  },

  _countdownToSend() {
    this._cancelTimer();

    let timerDecrement = 1000;
    let sendingIn = this.get('sendingIn');
    if (sendingIn === 0) {
      this.set('scheduledToSend', false);
      this.get('action')();
    }
    let timer = later(() => {
      this.set('sendingIn', sendingIn - timerDecrement);
      this._countdownToSend();
    }, timerDecrement);

    this.set('timer', timer);
  },

  _cancelTimer() {
    let timer = this.get('timer');
    if (timer) {
      cancel(timer);
    }
  },

  actions: {
    sendWithDelay() {
      this.set('scheduledToSend', true);
      let delay = this.get('delay');
      this.set('sendingIn', delay ? (delay * 1000) : 5000);
      this._countdownToSend();
    },

    cancel() {
      this.set('scheduledToSend', false);
      this._cancelTimer();
    }
  }
});
