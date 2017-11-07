import Component from '@ember/component';
import layout from '../templates/components/cancelable-button';
import { later, cancel } from "@ember/runloop";
import { not } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNames: ['ember-cancelable-button'],

  timer: null,

  scheduledToSend: false,

  canSend: not('scheduledToSend'),

  actions: {
    sendWithDelay() {
      this.set('scheduledToSend', true);
      let delay = this.get('delay');
      let timer = later(() => {
        this.set('scheduledToSend', false);
        this.get('action')();
      }, delay);
      this.set('timer', timer);
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
