# ember-cancelable-button

This add-on provides a `cancelable-button` component. When you click the button
and you realize you don't want to take that action, you can just cancel it
within the given timeout by clicking on the "cancel" part of the button.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-cancelable-button`
* `yarn install`

## Usage

You have to provide the action to take and the delay after which it's taken:

```hbs
{{#cancelable-button action=(action 'submitProposal') delay=2000}}
  Submit proposal to EmberConf
{{/cancelable-button}}
```

`delay` should be given in milliseconds.

## Example app

Please take a look at the dummy app contained within this repo to see it working
in action:

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

## Coming features/improvements (so these don't work yet)

* Pass an old-style (non-closure) action as the `action`
* Better customization of the button style (pruning down the provided styles)
* Allow using it with ember-concurrency if it's already a dependency of the
  project

