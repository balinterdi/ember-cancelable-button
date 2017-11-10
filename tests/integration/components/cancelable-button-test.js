import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { later } from "@ember/runloop";

moduleForComponent('cancelable-button', 'Integration | Component | cancelable button', {
  integration: true
});

test("It calls the action upon timeout - if the action wasn't canceled", function(assert) {
  assert.expect(1);

  let proposalSubmitted = false;
  this.on('submitProposal', function() {
    proposalSubmitted = true;
  });

  this.render(hbs`
    {{#cancelable-button action=(action 'submitProposal') delay=2000}}
      Submit proposal
    {{/cancelable-button}}
  `);
  this.$('.action-button').click();

  let done = assert.async();
  later(() => {
    assert.ok(proposalSubmitted, 'Action was called');
    done();
  }, 2100);
});

test("It shows a different button text when the action is scheduled", function(assert) {
  assert.expect(4);

  this.on('doNothing', () => {});

  this.render(hbs`
    {{#cancelable-button action=(action 'doNothing') delay=1000 as |isSending|}}
      {{#if isSending}}
        Doing nothing...
      {{else}}
        Do nothing
      {{/if}}
    {{/cancelable-button}}
  `);

  assert.equal(this.$('.cancel-button').length, 0, 'The cancel button doesn\'t show when no action is scheduled');

  this.$('.action-button').click();

  assert.equal(this.$('.cancel-button').length, 1, 'The cancel button shows when the action is about to be sent');
  assert.equal(this.$('.action-button').text().trim(), 'Doing nothing...');

  let done = assert.async();
  later(() => {
    assert.equal(this.$('.action-button').text().trim(), 'Do nothing');
    done();
  }, 1100);
});

test("It doesn't call the action if it's canceled within the timeout", function(assert) {
  assert.expect(1);

  let done = assert.async();

  let proposalSubmitted = false;
  this.on('submitProposal', function() {
    proposalSubmitted = true;
  });

  this.render(hbs`
    {{#cancelable-button action=(action 'submitProposal') delay=1000}}
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
  }, 1100);
});

test("It doesn't call the action (or throw error) if it's unrendered within the delay", function(assert) {
  assert.expect(1);

  let done = assert.async();

  let proposalSubmitted = false;
  this.on('submitProposal', function() {
    proposalSubmitted = true;
  });

  this.set('cool', true);

  this.render(hbs`
    {{#if cool}}
      {{#cancelable-button action=(action 'submitProposal') delay=1000}}
        Submit proposal
      {{/cancelable-button}}
    {{/if}}
  `);

  this.$('.action-button').click();
  this.set('cool', false);

  later(() => {
    assert.notOk(proposalSubmitted, 'Action wasn\'t called');
    done();
  }, 1050);
});
