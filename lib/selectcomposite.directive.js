'use strict';

goog.provide('leodido.directive.SelectCompositeFactory');

/**
 * A directive for composite selects
 * It allows the construction of a group of select directives
 *
 * @constructor
 */
leodido.directive.SelectComposite = function () {
  goog.DEBUG && console.log('SelectCompositeDirective::constructor');
};

/**
 * Retrieve the DDO
 *
 * @return {!angular.Directive}
 */
leodido.directive.SelectComposite.prototype.getDefinition = function () {
  return {
    restrict: 'AC',
    transclude: true,
    replace: false,
    template: '<div ng-transclude></div>',
    controller: this.controller
  };
};

/**
 * SelectComposite controller
 *
 * @param {!angular.Scope} $scope
 * @param {!angular.Attributes} $attrs
 * @ngInject
 */
leodido.directive.SelectComposite.prototype.controller = function ($scope, $attrs) {
  goog.DEBUG && console.log('SelectCompositeDirective::controller');
  /** @type {string} */
  $attrs.options;
  /**
   * Contains the value of the options attribute's expression
   *
   * @expose
   */
  $scope.options = $scope.$eval($attrs.options);
  /**
   * Keeps track of the selects
   *
   * @type {!Array<angular.Scope>}
   */
  this.selects = [];
  /**
   * Add a select to the select list
   * Use it from the select directive to add itself to the select list.
   *
   * @param {!angular.Scope} selectScope
   * @expose
   */
  this.addSelect = function (selectScope) {
    var that = this;
    //
    this.selects.push(selectScope);
    // Handle destroy
    selectScope.$on('$destroy', function (event) {
      that.removeSelect(selectScope);
    });
  };
  /**
   * Remove a select from the select list
   * Called from the select directive when to remove itself (i.e., on destroy).
   *
   * @param {!angular.Scope} selectScope
   * @expose
   */
  this.removeSelect = function (selectScope) {
    var index = this.selects.indexOf(selectScope);
    if (index !== -1) {
      this.selects.splice(index, 1);
    }
  };
};

/**
 * SelectComposite directive factory
 *
 * @returns {!angular.Directive} Directive definition object
 * @constructor
 */
leodido.directive.SelectCompositeFactory = function () {
  goog.DEBUG && console.log('SelectCompositeFactory::constructor');
  return (new leodido.directive.SelectComposite()).getDefinition();
};
