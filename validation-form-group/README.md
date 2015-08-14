# show-form-group-validation

## Synopsis

The `show-form-group-validation` Angular JS directive is used in an input field to add Bootstrap validation classes to an ancestor element with a `form-group` class. The conditionally-added validation classes affect an input field's label, border, add-ons and icons.

The Bootstrap validation classes applied by the directive mark an invalid field (plus labels & etc) in red, a valid field in green, and has no effect on non-validated or pristine fields.

The directive is intended for use on AngularJS forms styled with Bootstrap, and works fine on various form input fields.

### [Demo Page](http://htmlpreview.github.io/?https://github.com/mikeym/m2-validation/blob/master/validation-form-group/demos/demo.html)

## Code Example

The `show-form-group-validation` directive is added as an attribute to the input field, as shown below:

    <form role="form" name="form.test" id="form.test" novalidate>

      <div class="form-group">
        <label for="textwithvalidation" class="control-label">Required text field, form-group validation done using the directive</label>
        <input type="text" id="textwithvalidation" name="textwithvalidation" class="form-control"
               show-form-group-validation
               placeholder="type something" required aria-required="true"
               ng-model="model.textwithvalidation" ng-model-options="{ updateOn: 'blur' }">
      </div>

    </form>

The `show-form-group-validation` directive expects:

* To be used on an input element with a `name` attribute.
* To be used on an input element with an `ng-model` attribute.
* To be used on a child element of a form with a `name` attribute.
* To be used on a child of a parent element with a `form-group` class.

If any of the above conditions are not met, the directive will throw an exception that explains the problem. See more examples on the [demo page](http://htmlpreview.github.io/?https://github.com/mikeym/m2-validation/blob/master/validation-form-group/demos/demo.html).

## Motivation

I created this directive because I've been doing a bit of work with Angular and Bootstrap forms, and got tired of typing long clunky `ng-class` conditions in my views. Maybe this will save you a bit of time and trouble too.


## Installation

To use the `m2-validation-form-group` directive, you'll first need to install Angular JS and the Bootstrap CSS styles. Then:

1. Copy [validation-form-group.js](validation-form-group.js) to wherever it is you keep tiny open-source script files.
2. Load the script in your main `index.html` page.
3. Add the `m2-validation-form-group` module to your Angular app:

        angular.module('demoApp', [
          'm2-validation-form-group'
          ]);

4. Add `m2-validation-form-group` to your input fields. Please see the [demo page](http://htmlpreview.github.io/?https://github.com/mikeym/m2-validation/blob/master/validation-form-group/demos/demo.html) for more examples.

## Tests

Tested against AngularJS 1.4.3 and Bootstrap CSS 3.3.1 on Firefox 40, Chrome 44, Safari (Mac) 6.2, Safari (iOS 8.4 on my iPhone), IE 11.
 
Jasmine unit tests are in [validation-form-group-tests.js](validation-form-group-tests.js). Someday perhaps I'll figure out how to put up a clever automagical display here that shows these tests passing.

## Contributors

This is a little side project from Mikey Micheletti ([@mikeym](https://twitter.com/mikeym)) in Seattle. I write articles every so often on [deepgraysea.com](http://deepgraysea.com) and you can also contact me there. Thanks!

## License

This is free and unencumbered software released into the public domain under the UNLICENSE. See [UNLICENSE.txt](../UNLICENSE.txt) for complete fine print. I plan to name your firstborn son "Ebeneezer" BTW.



