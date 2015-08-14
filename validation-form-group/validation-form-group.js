'use strict';

// Sets appropriate success or error classes on the parent element of an input field
// Responds to model validity of the element its set on.
// Expects AngularJs and Bootstrap CSS.
angular.module('m2-validation-form-group', [])
    .directive('showFormGroupValidation', function($compile) {
      return {
        require: ['?ngModel', '^form'], // ngModel is ctrls[0], ngForm (in the current directive's ancestry) is ctrls[1]
        restrict: 'A',                  // attribute use only
        replace: false,                 // don't replace the input element
        scope: true,                    // create a new scope for the input element, inherit from parent scope

        link: function(scope, element, attr, ctrls) {
          var modelCtrl,                // ctrls[0], the model
              formCtrl,                 // ctrls[1], the form's controller
              parentElem,               // parent of the input element, should have a form-group class
              formGroupClass = '',      // validation class added to the parent element
              controlIsValid,           // true when the input is valid
              controlIsDirty,           // true when the input's value has been modified
              handleStateChange;        // function called whenever an input's state value changes

          if (!attr.name) {
            throw 'showFormGroupValidation should only be set on a form element with a name attribute.';
          }

          modelCtrl = ctrls[0];
          if (!modelCtrl) {
            throw 'showFormGroupValidation should only be set on a form element with an ng-model attribute.';
          }

          formCtrl = ctrls[1];
          if (!formCtrl || !formCtrl.$name) {
            throw 'showFormGroupValidation requires a name attribute be assigned to the ng-form containing the input field.';
          }

          // utility method to find an ancestor element with the class we're looking for
          function findParentWithFormGroupClass() {
            var parent = element.parent();

            while (parent.length > 0) {
              if (parent.hasClass('form-group')) {
                return parent;
              }
              parent = parent.parent();
            }
            return null;
          }

          parentElem = findParentWithFormGroupClass();
          if (parentElem === null) {
            throw 'showFormGroupValidation requires a parent element with a \'form-group\' class.'
          }

          // handler called whenever $valid or $dirty values change for the input
          handleStateChange = function () {

            // remove the old class, if any
            parentElem.removeClass(formGroupClass);

            // decide on the right class if any to show in the parent
            if (controlIsDirty && !controlIsValid) {
              formGroupClass = 'has-error';
            } else if (controlIsDirty && controlIsValid) {
              formGroupClass = 'has-success';
            } else {
              formGroupClass = '';
            }

            // add in the current value
            parentElem.addClass(formGroupClass);
          };

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
        }
      }
    });
