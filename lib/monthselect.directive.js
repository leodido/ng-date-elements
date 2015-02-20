'use strict';

goog.provide('leodido.directive.MonthSelectFactory');

goog.require('leodido.directive.GenericSelect');
goog.require('leodido.controller.MonthSelect');
goog.require('leodido.constants.MonthSelect');

/**
 * MonthSelect directive
 *
 * @constructor
 * @extends {leodido.directive.GenericSelect}
 */
leodido.directive.MonthSelect = function () {
  goog.base(this);
  goog.DEBUG && console.log('MonthSelectDirective::constructor');
};
goog.inherits(leodido.directive.MonthSelect, leodido.directive.GenericSelect);

/**
 * MonthSelect directive factory
 *
 * @returns {!angular.Directive} Directive definition object
 * @constructor
 */
leodido.directive.MonthSelectFactory = function () {
  goog.DEBUG && console.log('MonthSelectFactory::constructor');
  return (new leodido.directive.MonthSelect())
    .setDirective(leodido.constants.MonthSelect.DIRECTIVE_NAME)
    .setController(leodido.constants.MonthSelect.CONTROLLER_NAME)
    .getDefinition();
};
