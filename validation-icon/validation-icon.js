'use strict';

// Displays a small icon on the right side of an input field under appropriate circumstances.
// The input must have a name and an ng-model attribute, and must be within a form that has a name.
// Expects AngularJs and Bootstrap CSS.
angular.module('m2-validation-icon', [])
  .directive('showValidationIcon', function($compile) {
    return {
      require: ['?ngModel', '^form'], // ngModel is ctrls[0], ngForm (in the current directive's ancestry) is ctrls[1]
      restrict: 'A',                  // attribute use only
      replace: false,                 // don't replace the input element, we'll add something to the end
      scope: true,                    // create a new scope for the input element, inherit from parent scope

      link: function(scope, element, attr, ctrls) {
        var iconTemplate = '<span class="glyphicon form-control-feedback" aria-hidden="true" ng-class="statusIconClass"></span>',
            iconElement,              // iconTemplate after compiling
            modelCtrl,                // ctrls[0], the model
            formCtrl,                 // ctrls[1], the form's controller
            controlIsValid,           // true when the input is valid
            controlIsRequired,        // true when the input has a 'required' attribute
            controlIsDirty,           // true when the input's value has been modified
            handleStateChange;        // function called whenever an input's state value changes

        if (!attr.name) {
          throw 'showValidationIcon should only be set on a form element with a name attribute.';
        }

        modelCtrl = ctrls[0];
        if (!modelCtrl) {
          throw 'showValidationIcon should only be set on a form element with an ng-model attribute.';
        }

        formCtrl = ctrls[1];
        if (!formCtrl || !formCtrl.$name) {
          throw 'showValidationIcon requires a name attribute be assigned to the ng-form containing the input field.';
        }

        scope.statusIconClass = ''; // class value, bound into element scope, used by ng-class in template

        // called whenever $valid or $dirty values change for the input
        handleStateChange = function () {
          if (controlIsRequired && !controlIsDirty) {
            scope.statusIconClass = 'glyphicon-asterisk';
          } else if (controlIsDirty && !controlIsValid) {
            scope.statusIconClass = 'glyphicon-remove';
          } else if (controlIsDirty && controlIsValid) {
            scope.statusIconClass = 'glyphicon-ok';
          } else {
            scope.statusIconClass = '';
          }
        };

        // not expecting dynamic changes to the field's 'required' attribute
        controlIsRequired = attr.required;

        // watch the form's validation state for the control
        scope.$watch(formCtrl.$name + '.' + ctrls[0].$name + '.$valid', function(isValid) {
          controlIsValid = isValid;
          handleStateChange();
        });

        // watch the form's dirty state for the control
        scope.$watch(formCtrl.$name + '.' + ctrls[0].$name + '.$dirty', function(isDirty) {
          controlIsDirty = isDirty;
          handleStateChange();
        });

        // compile the icon into the element's scope, then add it to the DOM following the input.
        iconElement = angular.element(iconTemplate);
        $compile(iconElement)(scope);
        element.after(iconElement);

      }
    }
  });
