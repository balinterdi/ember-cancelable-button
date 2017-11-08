import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { later } from "@ember/runloop";

moduleForComponent('cancelable-button', 'Integration | Component | cancelable button', {
  integration: true
});

test("It calls the action upon timeout - if the action wasn't canceled", function(assert) {
  assert.expect(1);

  let done = assert.async();

  let proposalSubmitted = false;
  this.on('submitProposal', function() {
    proposalSubmitted = true;
  });

  this.render(hbs`
    {{#cancelable-button action=(action 'submitProposal') delay=100}}
      Submit proposal
    {{/cancelable-button}}
  `);
  this.$('.action-button').click();


  later(() => {
    assert.ok(proposalSubmitted, 'Action was called');
    done();
  }, 200);
});

test("It shows a different button text when the action is scheduled", function(assert) {
  assert.expect(2);

  this.on('doNothing', () => {});

  this.render(hbs`
    {{#cancelable-button action=(action 'doNothing') delay=100 as |isSending|}}
      {{#if isSending}}
        Doing nothing...
      {{else}}
        Do nothing
      {{/if}}
    {{/cancelable-button}}
  `);

  this.$('.action-button').click();

  assert.equal(this.$('.action-button').text().trim(), 'Doing nothing...');

  let done = assert.async();
  later(() => {
    assert.equal(this.$('.action-button').text().trim(), 'Do nothing');
    done();
  }, 200);
});

test("It doesn't call the action if it's canceled within the timeout", function(assert) {
  assert.expect(1);

  let done = assert.async();

  let proposalSubmitted = false;
  this.on('submitProposal', function() {
    proposalSubmitted = true;
  });

  this.render(hbs`
    {{#cancelable-button action=(action 'submitProposal') delay=200}}
      Submit proposal
    {{/cancelable-button}}
  `);

  this.$('.action-button').click();
  later(() => {
    this.$('.cancel-button').click();
  }, 100);

  later(() => {
    assert.notOk(proposalSubmitted, 'Action wasn\'t called');
    done();
  }, 250);
});
