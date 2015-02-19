'use strict';

goog.provide('leodido.controller.MonthSelect');

goog.require('leodido.controller.GenericSelect');
goog.require('leodido.constants.MonthSelect');

/**
 * Month select directive controller
 *
 * @param $scope
 * @param $element
 * @param $attrs
 * @param $filter
 * @constructor
 * @extends {leodido.controller.GenericSelect}
 * @ngInject
 */
leodido.controller.MonthSelect = function ($scope, $element, $attrs, $filter) {
  goog.base(this, $scope, $element, $attrs, $filter);
  goog.DEBUG && console.log('MonthSelectController::constructor', $scope);
  // Privates
  var formatAllowed = $filter('filter')(leodido.constants.MonthSelect.FORMATS, $scope.format, true).length == 1;
  $scope.format = formatAllowed ? $scope.format : leodido.constants.MonthSelect.DEFAULT_FORMAT;
  $scope.first = 0; // NOTE: force first value
  $scope.last = 11; // NOTE: force last value
  // Privileged methods
  /**
   * Format a month
   * Input have to be expressed as a zero indexed integer.
   *
   * @param {!number} month
   * @return {!string}
   */
  this.formatMonth = function (month) {
    return $filter('date')(new Date().setMonth(month), $scope.format);
  };
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
