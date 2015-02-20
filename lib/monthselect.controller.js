'use strict';

goog.provide('leodido.controller.MonthSelect');

goog.require('leodido.controller.GenericSelect');
goog.require('leodido.constants.MonthSelect');

/**
 * MonthSelect directive controller
 *
 * @param {!angular.Scope} $scope
 * @param {!angular.JQLite} $element
 * @param {!angular.Attributes} $attrs
 * @param {!angular.$filter} $filter
 * @constructor
 * @extends {leodido.controller.GenericSelect}
 * @ngInject
 */
leodido.controller.MonthSelect = function ($scope, $element, $attrs, $filter) {
  goog.base(this, $scope, $element, $attrs, $filter);
  goog.DEBUG && console.log('MonthSelectController::constructor', $scope);
  // Privates
  var self = this;
  var isFormatAllowed = function (format) {
    return $filter('filter')(leodido.constants.MonthSelect.FORMATS, format, true).length == 1;
  }
  // Settings (attributes and related scope variables) checking
  $attrs.$set('first', '0'); // NOTE: force first value
  $attrs.$set('last', '11'); // NOTE: force last value
  $scope.$watch('format', function (format) {
    if (!isFormatAllowed(format)) {
      $attrs.$set('format', leodido.constants.MonthSelect.DEFAULT_FORMAT);
      self.setup(); // Reboot
    }
  });
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
