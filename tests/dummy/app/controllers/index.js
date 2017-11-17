import Controller from '@ember/controller';

export default Controller.extend({
  proposalSubmitted: false,
  groceriesOrdered: false,
  bookBought: false,

  actions: {
    submitProposal() {
      this.set('proposalSubmitted', true);
    },

    orderGroceries() {
      this.set('groceriesOrdered', true);
    },

    buyBook() {
      this.set('bookBought', true);
    }
  }
});
