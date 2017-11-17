# ember-cancelable-button

This add-on provides a `cancelable-button` component. When you click the button
and you realize you don't want to take that action, you can just cancel it
within the given timeout by clicking on the "cancel" part of the button.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-cancelable-button`
* `yarn install`

## Demo site

Check out examples at https://balinterdi.github.io/ember-cancelable-button.

## Usage

At a minimum, the action to take should be passed in:

```hbs
{{#cancelable-button action=(action 'submitProposal')}}
  Submit proposal to EmberConf
{{/cancelable-button}}
```

### Customizing the button text

The component yields out whether the action is scheduled to be sent and the
number of seconds it will be sent in.

You can, for example, use that to modify the button's text:

```hbs
{{#cancelable-button action=(action 'submitProposal') as |isSending sendingIn|}}
  {{#if isSending}}
    Submitting in {{sendingIn}}...
  {{else}}
    Submit proposal to EmberConf
  {{/if}}
{{/cancelable-button}}
```

### Custom delay

By default, the action is sent in 5 seconds, but a custom `delay` can be passed
in for the number of seconds (only an integer value will be accepted).

```hbs
{{#cancelable-button action=(action 'buyBook') delay=2 as |isSending sendingIn|}}
  {{#if isSending}}
    Buying in {{sendingIn}}...
  {{else}}
    Buy Rock & Roll with Ember.js
  {{/if}}
{{/cancelable-button}}
```

## Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

## Coming features/improvements (so these don't work yet)

* ~~Only show the X when the action is about to be taken (isSending)~~
* ~~Have a default delay of 5 seconds~~
* ~~Also yield the time left so that the button can be customized to display it ("Sending in 3, 2, 1... ")~~
* ~~Guard against passing in non-integer values for `delay`~~
* While the cancel part is not shown, have rounded corners on the right side, too.
* Allow customization of where the cancel part is shown (Gumroad puts it on the left, for example)
* Let the button know when the action is being carried out (so there should
  be 3 states: start (same as canceled), scheduled-to-send, and sending. Maybe even a fourth one, which is `sent`.
  So a button could go even show "Submitted" (or "Bought") after the action has been carried out.
* Pass an old-style (non-closure) action as the `action`
* Better customization of the button style (pruning down the provided styles)
* Allow using it with ember-concurrency if it's already a dependency of the project
* Have a non-block form where the text when the button is about to send is the gerundive form of the verb: "Send proposal" => "Sending in 3, 2, 1"
* Also yield a value that is true right after the action is taken so that it can be used for feedback: "Sent."

