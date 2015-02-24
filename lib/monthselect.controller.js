'use strict';

goog.provide('leodido.controller.MonthSelect');

goog.require('leodido.controller.GenericSelect');

/**
 * MonthSelect directive controller
 *
 * @param {!angular.Scope} $scope
 * @param {!angular.JQLite} $element
 * @param {!angular.Attributes} $attrs
 * @constructor
 * @extends {leodido.controller.GenericSelect}
 * @ngInject
 */
leodido.controller.MonthSelect = function ($scope, $element, $attrs) {
  goog.DEBUG && console.log('MonthSelectController::constructor', $scope);
  var date = $element.injector().get('dateFilter');
  // Privileged methods
  /**
   * Format a month
   * Input have to be expressed as a zero indexed integer.
   *
   * @param {!number} month
   * @return {!string}
   */
  this.formatMonth = function (month) {
    /** @type {string} */
    $scope.format;
    return date(new Date().setMonth(month), $scope.format);
  };
  //
  goog.base(this, $scope, $element, $attrs);
};
goog.inherits(leodido.controller.MonthSelect, leodido.controller.GenericSelect);

/**
 * @inheritDoc
 */
leodido.controller.MonthSelect.prototype.getValue = function (index) {
  return (index + 1).toString();
};

/**
 * @inheritDoc
 */
leodido.controller.MonthSelect.prototype.getLabel = function (index) {
  return this.formatMonth(index);
};
