'use strict';

goog.provide('leodido.controller.YearSelect');

goog.require('leodido.controller.GenericSelect');

/**
 * YearSelect directive controller
 *
 * @param {!angular.Scope} $scope
 * @param {!angular.JQLite} $element
 * @param {!angular.Attributes} $attrs
 * @constructor
 * @extends {leodido.controller.GenericSelect}
 * @ngInject
 */
leodido.controller.YearSelect = function ($scope, $element, $attrs) {
  goog.DEBUG && console.log('YearSelectController::constructor', $scope);
  var date = $element.injector().get('dateFilter');
  // Privileged methods
  /**
   * Format a year
   * Year have to be expressed as a 4 digit integer.
   *
   * @param {!number} year
   * @return {!string}
   */
  this.formatYear = function (year) {
    /** @type {string} */
    $scope.format;
    return date(new Date(year.toString()), $scope.format);
  };
  //
  goog.base(this, $scope, $element, $attrs);
};
goog.inherits(leodido.controller.YearSelect, leodido.controller.GenericSelect);

/**
 * @inheritDoc
 */
leodido.controller.YearSelect.prototype.getValue = function (index) {
  return index.toString();
};

/**
 * @inheritDoc
 */
leodido.controller.YearSelect.prototype.getLabel = function (index) {
  return this.formatYear(index);
};
