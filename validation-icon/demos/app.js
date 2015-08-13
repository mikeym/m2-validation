// Simple AngularJS controller for show-validation-icon demo page and tests
angular.module('iconDemoApp', [
  'm2-validation-icon'
  ])

  // only the one controller in this little example
  .controller('AppCtrl', ['$scope', function($scope) {

    // Page data model, initially blank ('pristine') with our own status tracking
    $scope.model = {
      customvalidation: '',
      nonrequiredfield: '',
      requiredemail: '',
      requiredpassword: '',
      money: null,
      numbers: null,
      thehardway: '',
      formstatus: 'unsubmitted'         // status display
    };

    // Declare a reference to the form, which will be 'form.test' on the page
    $scope.form = { };

    // Form submit function for the demo. Just test validity and report back
    $scope.submitForm = function() {
      if ($scope.form.test.$valid) {
        $scope.model.formstatus = "valid";    // that was a happy form
      } else {
        $scope.model.formstatus = "invalid";  // sad trombone
      }
    };

    // Form clear function for the demo
    $scope.clearForm = function() {
      // clear the demo fields
      $scope.model.customvalidation = '';
      $scope.model.nonrequiredfield = '';
      $scope.model.requiredemail = '';
      $scope.model.requiredpassword = '';
      $scope.model.money = null;
      $scope.model.numbers = null;
      $scope.model.thehardway = '';
      // reset our internal state
      $scope.model.formstatus = 'unsubmitted';
      // reset the field validation for the form
      $scope.form.test.$setPristine();
    };
  }]);
