import Controller from '@ember/controller';

export default Controller.extend({

  proposalSubmitted: false,

  actions: {
    submitProposal() {
      this.set('proposalSubmitted', true);
    },
  }
});
