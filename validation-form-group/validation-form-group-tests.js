'use strict';

describe('Tests for the show-form-group-validation directive', function() {
  var rootScope,
      body = $('body'),
      html,
      directive,
      compile;

  beforeEach(module('formGroupDemoApp'));

  beforeEach(inject(function ($rootScope, $compile) {
    rootScope = $rootScope;
    compile = $compile;
  }));

  afterEach(function () {
    body.empty(directive);
  });

  it('should throw if directive is not used on a child of a form element with a name attribute', function () {
    var receivedException;

    // valid except form lacks a 'name' attribute
    html = '<form id="form.test" novalidate>' +
           '  <div class="form-group">' +
           '    <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
           '           show-form-group-validation required>' +
           '  </div>' +
           '</form>';

    try {
      directive = compile(angular.element(html))(rootScope);
    } catch (e) {
      receivedException = e;
    }
    expect(receivedException).toEqual('showFormGroupValidation requires a name attribute be assigned to the ng-form containing the input field.');
  });

  it('should throw if directive is not used on an input element with a name attribute', function () {
    var receivedException;

    // valid except input element lacks a 'name' attribute
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <div class="form-group">' +
        '    <input type="text" id="testinput" ng-model="form.testinput"' +
        '           show-form-group-validation required>' +
        '  </div>' +
        '</form>';

    try {
      directive = compile(angular.element(html))(rootScope);
    } catch (e) {
      receivedException = e;
    }
    expect(receivedException).toEqual('showFormGroupValidation should only be set on a form element with a name attribute.');
  });

  it('should throw if directive is not used on an input element with an ng-model attribute', function () {
    var receivedException;

    // valid except input element lacks an 'ng-model' attribute
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <div class="form-group">' +
        '    <input type="text" id="testinput" name="testinput"' +
        '           show-form-group-validation required>' +
        '  </div>' +
        '</form>';

    try {
      directive = compile(angular.element(html))(rootScope);
    } catch (e) {
      receivedException = e;
    }
    expect(receivedException).toEqual('showFormGroupValidation should only be set on a form element with an ng-model attribute.');
  });

  it('should throw if directive is not used on a child of an element with a form-group class', function () {
    var receivedException;

    // valid except parent element lacks a 'form-group' class
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <div>' +
        '    <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '           show-form-group-validation required>' +
        '  </div>' +
        '</form>';

    try {
      directive = compile(angular.element(html))(rootScope);
    } catch (e) {
      receivedException = e;
    }
    expect(receivedException).toEqual('showFormGroupValidation requires a parent element with a \'form-group\' class.');
  });

  it('should not affect validation classes if the directive is not used', function () {
    var formGroupElement,
        inputElement;

    // no directive, otherwise valid
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <div class="form-group">' +
        '    <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '           required>' +
        '  </div>' +
        '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$digest();

    // no immediate effect
    formGroupElement = $('.form-group');
    expect(formGroupElement.hasClass('has-error')).toBeFalsy();
    expect(formGroupElement.hasClass('has-success')).toBeFalsy();

    // enter something into the required field
    inputElement = directive.find('input');
    angular.element(inputElement).val('prunes').trigger('input');

    // no change without the directive
    expect(formGroupElement.hasClass('has-error')).toBeFalsy();
    expect(formGroupElement.hasClass('has-success')).toBeFalsy();
  });

  it('should set the has-success class on the form-group element when a valid entry is made', function () {
    var formGroupElement,
        inputElement;

    // directive, all good
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <div class="form-group">' +
        '    <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '           show-form-group-validation required>' +
        '  </div>' +
        '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$digest();

    // no immediate effect
    formGroupElement = $('.form-group');
    expect(formGroupElement.hasClass('has-error')).toBeFalsy();
    expect(formGroupElement.hasClass('has-success')).toBeFalsy();

    // enter something into the required field
    inputElement = directive.find('input');
    angular.element(inputElement).val('prunes').trigger('input');

    // adds the has-success class
    expect(formGroupElement.hasClass('has-error')).toBeFalsy();
    expect(formGroupElement.hasClass('has-success')).toBeTruthy();
  });

  it('should set the has-error class on the form-group element when an invalid entry is made', function () {
    var formGroupElement,
        inputElement;

    // directive, all good
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <div class="form-group">' +
        '    <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '           show-form-group-validation required>' +
        '  </div>' +
        '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$digest();

    // no immediate effect
    formGroupElement = $('.form-group');
    expect(formGroupElement.hasClass('has-error')).toBeFalsy();
    expect(formGroupElement.hasClass('has-success')).toBeFalsy();

    // enter something into the required field
    inputElement = directive.find('input');
    angular.element(inputElement).val('prunes').trigger('input');

    // adds the has-success class
    expect(formGroupElement.hasClass('has-error')).toBeFalsy();
    expect(formGroupElement.hasClass('has-success')).toBeTruthy();

    // now clear the required field and retest, should see error
    angular.element(inputElement).val('').trigger('input');
    expect(formGroupElement.hasClass('has-error')).toBeTruthy();
    expect(formGroupElement.hasClass('has-success')).toBeFalsy();
  });

  it('should set the has-success and has-error classes even if the form-group element is not a direct parent of the input', function () {
    var formGroupElement,
        inputElement;

    // directive, nested a couple layers down from the element with the form-group class
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <div class="form-group">' +
        '    <div id="whatever">' +
        '      <span class="low">' +
        '        <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '               show-form-group-validation required>' +
        '      </span>' +
        '   </div>' +
        '  </div>' +
        '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$digest();

    // no immediate effect
    formGroupElement = $('.form-group');
    expect(formGroupElement.hasClass('has-error')).toBeFalsy();
    expect(formGroupElement.hasClass('has-success')).toBeFalsy();

    // enter something into the required field
    inputElement = directive.find('input');
    angular.element(inputElement).val('prunes').trigger('input');

    // adds the has-success class
    expect(formGroupElement.hasClass('has-error')).toBeFalsy();
    expect(formGroupElement.hasClass('has-success')).toBeTruthy();

    // now clear the required field and retest, should see error
    angular.element(inputElement).val('').trigger('input');
    expect(formGroupElement.hasClass('has-error')).toBeTruthy();
    expect(formGroupElement.hasClass('has-success')).toBeFalsy();
  });

  it('should set the has-success and has-error classes for other kinds of validation besides required', function () {
    var formGroupElement,
        inputElement;

    // directive, nested a couple layers down from the element with the form-group class
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <div class="form-group">' +
        '    <div id="whatever">' +
        '      <span class="low">' +
        '        <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '               show-form-group-validation ng-minlength="27">' +
        '      </span>' +
        '   </div>' +
        '  </div>' +
        '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$digest();

    // no immediate effect
    formGroupElement = $('.form-group');
    expect(formGroupElement.hasClass('has-error')).toBeFalsy();
    expect(formGroupElement.hasClass('has-success')).toBeFalsy();

    // enter something into the required field
    inputElement = directive.find('input');
    angular.element(inputElement).val('prunes').trigger('input');

    // input value is too short, should see error applied
    expect(formGroupElement.hasClass('has-error')).toBeTruthy();
    expect(formGroupElement.hasClass('has-success')).toBeFalsy();

    // now type in a whole buncha stuff to meet the minlength requirement and should be happy
    angular.element(inputElement).val('If the river were whiskey and I were a duck I\'d dive to the bottom and never come up').trigger('input');
    expect(formGroupElement.hasClass('has-error')).toBeFalsy();
    expect(formGroupElement.hasClass('has-success')).toBeTruthy();
  });

});
