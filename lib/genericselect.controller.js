'use strict';

goog.provide('leodido.controller.GenericSelect');

/**
 * A complex type representing each option of the select
 *
 * @typedef {Object} SelectOption
 * @property {Integer} index
 * @property {String}  label
 * @property {String}  value
 */

/**
 * Controller for GenericSelect directives
 *
 * @param $scope
 * @param $element
 * @param $attrs
 * @param $filter
 * @constructor
 * @ngInject
 */
leodido.controller.GenericSelect = function ($scope, $element, $attrs, $filter) {
  goog.DEBUG && console.log('GenericSelectController::constructor');

  var self = this;
  // Privileged methods
  /**
   * Setup the initial state of the directive
   */
  this.setup = function () {
    goog.DEBUG && console.log('GenericSelectController::setup');
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
   * @return {Boolean}
   */
  this.isValid = function (option) {
    return option &&
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
    return $filter('filter')($scope.element.opts, target, true);
  };
  /**
   * Retrieve a $scope variable
   *
   * @param{String} name
   * @return {*}
   */
  this.getScopeVariable = function (name) {
    return $scope[name];
  };
};

/**
 * Retrive the index of the first option
 *
 * @returns {Integer}
 */
leodido.controller.GenericSelect.prototype.getFirst = function () {
  return this.getScopeVariable('first');
};

/**
 * Retrieve the index of the last option
 *
 * @returns {Integer}
 */
leodido.controller.GenericSelect.prototype.getLast = function () {
  return this.getScopeVariable('last');
};

/**
 * Retrieve the label of an option
 *
 * @params {Integer} index The option index
 * @returns {String}
 */
leodido.controller.GenericSelect.prototype.getLabel = goog.abstractMethod;

/**
 * Retrive the value of an option (i.e. the model value)
 *
 * @params {Integer} index The option index
 * @returns {String}
 */
leodido.controller.GenericSelect.prototype.getValue = goog.abstractMethod;

// FIXME? make abstract
// FIXME? is this its position
leodido.controller.GenericSelect.prototype.setSelected = function (option) {};
