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
    assert("If given, `delay` should be a value in milliseconds, divisible by 1000", !delay || delay % 1000 === 0);
  },

  willDestroyElement() {
    this._super(...arguments);
    cancel(this.get('timer'));
  },

  _countdownToSend() {
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

  actions: {
    sendWithDelay() {
      this.set('scheduledToSend', true);
      this.set('sendingIn', this.get('delay') || 5000);
      this._countdownToSend();
    },

    cancel() {
      let timer = this.get('timer');
      if (timer) {
        this.set('scheduledToSend', false);
        cancel(timer);
      }
    }
  }
});
