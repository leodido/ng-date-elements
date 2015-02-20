'use strict';

goog.provide('leodido.controller.YearSelect');

goog.require('leodido.controller.GenericSelect');
goog.require('leodido.constants.YearSelect');

/**
 * YearSelect directive controller
 *
 * @param {!angular.Scope} $scope
 * @param {!angular.JQLite} $element
 * @param {!angular.Attributes} $attrs
 * @param {!angular.$filter} $filter
 * @constructor
 * @extends {leodido.controller.GenericSelect}
 * @ngInject
 */
leodido.controller.YearSelect = function ($scope, $element, $attrs, $filter) {
  goog.base(this, $scope, $element, $attrs, $filter);
  goog.DEBUG && console.log('YearSelectController::constructor', $scope);
  // Privates
  var self = this;
  /**
   * Check if format is allowed
   *
   * @param {!string} format
   * @return {!boolean}
   */
  var isFormatAllowed = function (format) {
    return $filter('filter')(leodido.constants.YearSelect.FORMATS, format, true).length === 1;
  };
  // Settings (attributes and related scope variables) checking
  var reboot = false;
  $scope.$watchGroup(['format', 'first', 'last'], function (values) {
    reboot && self.setup(); // Reboot
    var first = values[1],
        last = values[2],
        format = values[0];
    if (!/^\d{4}$/.test(first)) {
      $attrs.$set('first', '' + leodido.constants.YearSelect.DEFAULT_FIRST);
      reboot = true;
    }
    if (!/^\d{4}$/.test(last)) {
      $attrs.$set('last', '' + leodido.constants.YearSelect.DEFAULT_LAST);
      reboot = true;
    }
    // Conditional swap
    if ($scope.first > $scope.last) {
      $scope.first = $scope.first ^ $scope.last;
      $scope.last = $scope.first ^ $scope.last;
      $scope.first = $scope.first ^ $scope.last;
      reboot = true;
    }
    if (!isFormatAllowed(format)) {
      $attrs.$set('format', leodido.constants.YearSelect.DEFAULT_FORMAT);
      reboot = true;
    }
  });
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
    return $filter('date')(new Date(year.toString()), $scope.format);
  };
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
