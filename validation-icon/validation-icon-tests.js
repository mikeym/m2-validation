'use strict';

describe('Tests for the show-validation-icon directive', function() {
  var rootScope,
      body = $('body'),
      html,
      directive,
      compile;

  beforeEach(module('iconDemoApp'));

  beforeEach(inject(function($rootScope, $compile) {
    rootScope = $rootScope;
    compile = $compile;
  }));

  afterEach(function() {
    body.empty(directive);
  });

  it('should throw if directive is not used on a child of a form element with a name attribute', function() {
    var receivedException;

    // valid except form lacks a 'name' attribute
    html = '<form id="form.test" novalidate>' +
           '  <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
           '         show-validation-icon required>' +
           '</form>';

    try {
      directive = compile(angular.element(html))(rootScope);
    } catch (e) {
      receivedException = e;
    }
    expect(receivedException).toEqual('showValidationIcon requires a name attribute be assigned to the ng-form containing the input field.');
  });

  it('should throw if directive is not used on an input element with a name attribute', function() {
    var receivedException;

    // valid except the input lacks a 'name' attribute
    html = '<form id="form.test" name="form.test" novalidate>' +
           '  <input type="text" id="testinput" ng-model="form.testinput"' +
           '         show-validation-icon required>' +
           '</form>';

    try {
      directive = compile(angular.element(html))(rootScope);
    } catch (e) {
      receivedException = e;
    }
    expect(receivedException).toEqual('showValidationIcon should only be set on a form element with a name attribute.');
  });

  it('should throw if directive is not used on an input element with an ng-model attribute', function() {
    var receivedException;

    // valid except the input lacks an 'ng-model' attribute
    html = '<form id="form.test" name="form.test" novalidate>' +
           '  <input type="text" id="testinput" name="testinput"' +
           '         show-validation-icon required>' +
           '</form>';

    try {
      directive = compile(angular.element(html))(rootScope);
    } catch (e) {
      receivedException = e;
    }
    expect(receivedException).toEqual('showValidationIcon should only be set on a form element with an ng-model attribute.');
  });

  it('should not create new validation icon elements if show-validation-icon is not used', function() {
    var iconElement;

    // directive not included
    html = '<form id="form.test" name="form.test" novalidate>' +
           '  <input type="text" id="testinput" name="testinput" ng-model="form.testinput">' +
           '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$digest();

    iconElement = $('.glyphicon');
    expect(iconElement.length).toEqual(0);
  });

  it('should create icon element that does not show a symbol when used correctly on a pristine non-required input', function() {
    var iconElement;

    // valid, basic, not required
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '         show-validation-icon>' +
        '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$digest();

    // should create the icon span, but should not have any of the three icon state classes
    iconElement = $('.glyphicon');
    expect(iconElement.attr('aria-hidden')).toEqual('true');
    expect(iconElement.prop('tagName').toLowerCase()).toEqual('span');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeFalsy();
  });

  it('should create icon element that shows a splat when used correctly on a pristine required input', function() {
    var iconElement;

    // valid, basic, required
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '         show-validation-icon required>' +
        '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$apply();

    // should create the icon span with the asterisk symbol visible
    iconElement = $('.glyphicon');
    expect(iconElement.attr('aria-hidden')).toEqual('true');
    expect(iconElement.prop('tagName').toLowerCase()).toEqual('span');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeTruthy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeFalsy();
  });

  it('should stop showing the splat on a required input once you change the field value', function() {
    var iconElement,
        inputElement;

    // valid, basic, required
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '         show-validation-icon required>' +
        '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$digest();

    // should create the icon span with the asterisk symbol visible
    iconElement = $('.glyphicon');
    expect(iconElement.attr('aria-hidden')).toEqual('true');
    expect(iconElement.prop('tagName').toLowerCase()).toEqual('span');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeTruthy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeFalsy();

    // set a value in the input field and check the splat is gone
    inputElement = directive.find('input');
    angular.element(inputElement).val('prunes').trigger('input');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeFalsy();
  });

  it('should show the check mark when a required field is valid', function() {
    var iconElement,
        inputElement;

    // valid, basic, required
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '         show-validation-icon required>' +
        '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$digest();

    // should create the icon span with the asterisk symbol visible
    iconElement = $('.glyphicon');
    expect(iconElement.attr('aria-hidden')).toEqual('true');
    expect(iconElement.prop('tagName').toLowerCase()).toEqual('span');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeTruthy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeFalsy();

    // set a value in the input field and check it shows a check mark
    inputElement = directive.find('input');
    angular.element(inputElement).val('prunes').trigger('input');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeTruthy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeFalsy();
  });

  it('should show the check mark when a non-required field has a valid entry', function() {
    var iconElement,
        inputElement;

    // valid, basic, not required
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '         show-validation-icon>' +
        '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$digest();

    // should create the icon span for the non-required field with no symbol visible
    iconElement = $('.glyphicon');
    expect(iconElement.attr('aria-hidden')).toEqual('true');
    expect(iconElement.prop('tagName').toLowerCase()).toEqual('span');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeFalsy();

    // set a value in the input field and check it shows a check mark
    inputElement = directive.find('input');
    angular.element(inputElement).val('prunes').trigger('input');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeTruthy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeFalsy();
  });

  it('should show an x when a required field is dirty and not valid', function() {
    var iconElement,
        inputElement;

    // valid, basic, required
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '         show-validation-icon required>' +
        '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$digest();

    // should create the icon span with the asterisk symbol visible
    iconElement = $('.glyphicon');
    expect(iconElement.attr('aria-hidden')).toEqual('true');
    expect(iconElement.prop('tagName').toLowerCase()).toEqual('span');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeTruthy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeFalsy();

    // set a value in the input field and check it shows a check mark
    inputElement = directive.find('input');
    angular.element(inputElement).val('prunes').trigger('input');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeTruthy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeFalsy();

    // now unset the value and should see the x
    angular.element(inputElement).val('').trigger('input');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeTruthy();
  });

  it('should show an x when a field is dirty and invalid for some other reason than required', function() {
    var iconElement,
        inputElement;

    // valid, basic, but needs a minimum 27 characters to be valid
    html = '<form id="form.test" name="form.test" novalidate>' +
        '  <input type="text" id="testinput" name="testinput" ng-model="form.testinput"' +
        '         show-validation-icon ng-minlength="27">' +
        '</form>';

    directive = compile(angular.element(html))(rootScope);
    body.append(directive);
    rootScope.$digest();

    // should create the icon span with no symbols visible
    iconElement = $('.glyphicon');
    expect(iconElement.attr('aria-hidden')).toEqual('true');
    expect(iconElement.prop('tagName').toLowerCase()).toEqual('span');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeFalsy();

    // set a value in the input field that's too short, should be invalid
    inputElement = directive.find('input');
    angular.element(inputElement).val('prunes').trigger('input');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeTruthy();

    // now put a really long value into the field and it should become valid
    angular.element(inputElement).val('blah blah this is a really long value with a lotta typing innit?').trigger('input');
    expect(iconElement.hasClass('glyphicon-asterisk')).toBeFalsy();
    expect(iconElement.hasClass('glyphicon-ok')).toBeTruthy();
    expect(iconElement.hasClass('glyphicon-remove')).toBeFalsy();
  });

});
