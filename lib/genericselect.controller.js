'use strict';

goog.provide('leodido.controller.GenericSelect');

goog.require('leodido.typedef.SelectOption');

/**
 * Controller for GenericSelect directives
 *
 * @param {!angular.Scope=} $scope
 * @param {!angular.JQLite=} $element
 * @param {!angular.Attributes=} $attrs
 * @constructor
 * @ngInject
 */
leodido.controller.GenericSelect = function ($scope, $element, $attrs) {
  goog.DEBUG && console.log('GenericSelectController::constructor');
  var self = this,
      filter = $element.injector().get('filterFilter');
  // Privileged methods
  /**
   * Setup the initial state of the directive
   */
  this.setup = function () {
    goog.DEBUG && console.log('GenericSelectController::setup', $scope);
    $scope.element = $scope.element || {};
    /**
     * Options array
     *
     * @expose
     * @type {Array.<SelectOption>}
     */
    $scope.element.opts = [];
    for (var i = self.getFirst(), ii = self.getLast(); i <= ii; i++) {
      $scope.element.opts.push({
        index: i,
        label: self.getLabel(i),
        value: self.getValue(i)
      });
    }
  };
  /**
   * Validate option
   *
   * @param {SelectOption} option
   * @return {!boolean}
   */
  this.isValid = function (option) {
    return angular.isDefined(option) &&
           option.index >= this.getFirst() &&
           option.index <= this.getLast() &&
           option.value === this.getValue(option.index) &&
           option.label === this.getLabel(option.index);
  };
  /**
   * Search options by pair key/value
   *
   * @param {String} key
   * @param {String} value
   * @return Array.{SelectOption}
   */
  this.searchOptions = function (key, value) {
    var target = {};
    target[key] = value;
    return filter($scope.element.opts, target, true);
  };
  /**
   * Retrive the index of the first option
   *
   * @return {!number}
   */
  this.getFirst = function () {
    /** @type {!string} first */
    $scope.first;
    return + $scope.first;
  };
  /**
   * Retrieve the index of the last option
   *
   * @return {!number}
   */
  this.getLast = function () {
    /** @type {!string} last */
    $scope.last;
    return + $scope.last;
  };
};

/**
 * Retrieve the label of an option
 *
 * @param {!number} index The option index
 * @returns {!string}
 */
leodido.controller.GenericSelect.prototype.getLabel = goog.abstractMethod;

/**
 * Retrive the value of an option (i.e. the model value)
 *
 * @param {!number} index The option index
 * @returns {!string}
 */
leodido.controller.GenericSelect.prototype.getValue = goog.abstractMethod;
