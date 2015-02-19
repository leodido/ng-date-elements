'use strict';

goog.provide('leodido.controller.YearSelect');

goog.require('leodido.controller.GenericSelect');
goog.require('leodido.constants.YearSelect');

/**
 * Year select directive controller
 *
 * @param $scope
 * @param $element
 * @param $attrs
 * @param $filter
 * @constructor
 * @extends {leodido.controller.GenericSelect}
 * @ngInject
 */
leodido.controller.YearSelect = function ($scope, $element, $attrs, $filter) {
  goog.base(this, $scope, $element, $attrs, $filter);
  goog.DEBUG && console.log('YearSelectController::constructor', $scope);
  // Privates
  var formatAllowed = $filter('filter')(leodido.constants.YearSelect.FORMATS, $scope.format, true).length == 1;
  $scope.format = formatAllowed ? $scope.format : leodido.constants.YearSelect.DEFAULT_FORMAT;
  $scope.first = /^\d{4}$/.test($scope.first) ? +$scope.first : leodido.constants.YearSelect.DEFAULT_FIRST;
  $scope.last = /^\d{4}$/.test($scope.last) ? +$scope.last : leodido.constants.YearSelect.DEFAULT_LAST;
  // Swap variables if needed
  if ($scope.first > $scope.last) {
    $scope.first = $scope.first ^ $scope.last;
    $scope.last = $scope.first ^ $scope.last;
    $scope.first = $scope.first ^ $scope.last;
  }
  // Privileged methods
  /**
   * Format a year
   * Year have to be expressed as a 4 digit integer.
   *
   * @param {!number} year
   * @return {!string}
   */
  this.formatYear = function (year) {
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
