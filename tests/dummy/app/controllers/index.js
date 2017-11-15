import Controller from '@ember/controller';

export default Controller.extend({
  proposalSubmitted: false,
  bookBought: false,

  actions: {
    submitProposal() {
      this.set('proposalSubmitted', true);
    },
    buyBook() {
      this.set('bookBought', true);
    }
  }
});
