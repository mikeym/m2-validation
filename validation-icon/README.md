# show-validation-icon

## Synopsis

The `show-validation-icon` is an Angular JS directive used in an input field to add a validation icon. The icon conditionally displays:

* An asterisk if the input field is required and unchanged
* A check mark icon if the input field has been changed and is valid
* An "x" icon if the input field has been changed but is not valid
* No icon if the input field is unchanged and is not required

The directive is intended for use on AngularJS forms styled with Bootstrap, and works best on text-based input fields with `text`, `password`, `email` and similar types.

## Code Example

The `show-validation-icon` directive is added as an attribute to the input field, as shown below:

    ```html
    <form role="form" name="form.test" id="form.test" novalidate>

      <div class="form-group has-feedback"
           ng-class="{ 'has-error' : form.test.requiredfield.$invalid && !form.test.requiredfield.$pristine,
                       'has-success' : form.test.requiredfield.$valid && !form.test.requiredfield.$pristine }">
        <label for="requiredfield" class="control-label">Required text field</label>
      
        <input type="text" id="requiredfield" name="requiredfield" class="form-control"
               placeholder="type something" required aria-required="true"
               show-validation-icon
               ng-model="model.requiredfield" ng-model-options="{ updateOn: 'blur' }">
      </div>

    </form>
    ```

The `show-validation-icon` directive expects:

* To be used on a form element with a `name` attribute.
* To be used on a form element with an `ng-model` attribute.
* To be used on a child element of a form with a `name` attribute.

If any of the above conditions are not met, the directive will throw an exception. See more examples on the [demo page](demos/demo.html).

## Motivation

I created this directive because I've been doing a bit of work with Angular and Bootstrap forms, and got
tired of typing long clunky `ng-class` conditions in my views to show little validation icons. Maybe this will
save you a bit of time and trouble too.


## Installation

To use the `show-validation-icon` directive, you'll first need to install Angular JS and the Bootstrap CSS styles. Then:

1. Copy [validation-icon.js](validation-icon.js) to wherever it is you want to put such things.
2. Add the `m2-validation-icon` module to your Angular app:

        ````javascript
        angular.module('demoApp', [
          'm2-validation-icon'
          ]);
        ````
3. Add `show-validation-icon` to your input fields. Please see the [demo page](demos/demo.html) for more examples.

## Tests

Tested against AngularJS 1.4.3 and Bootstrap CSS 3.3.1 on Firefox 40, Chrome 44, Safari (Mac) 6.2, Safari (iOS 8.4 on my iPhone), IE 11.
 
Jasmine unit tests are in [validation-icon-tests.js](validation-icon-tests.js). If I can figure out how to put up some sort of automatic thingy that shows the tests pass, I will, but not tonight.

## Contributors

This is a little side project from Mikey Micheletti ([@mikeym](https://twitter.com/mikeym)) in Seattle. I write articles every so often on [deepgraysea.com](http://deepgraysea.com) and you can also contact me there. Thanks!

## License

This is free and unencumbered software released into the public domain under the UNLICENSE. See [UNLICENSE.txt](../UNLICENSE.txt) for complete blah-blah-blah, otherwise just have at it.

## Inspiration

Two posts from Shannon Deminick ([@shazwazza](https://twitter.com/Shazwazza)) were especially helpful in this project:

* [Reference the current form controller in AngularJS](http://shazwazza.com/post/Reference-the-current-form-controller-in-AngularJS)
* [Listening for validation changes in AngularJS](http://shazwazza.com/post/Listening-for-validation-changes-in-AngularJS)


