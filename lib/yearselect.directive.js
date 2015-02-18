'use strict';

goog.provide('leodido.directive.YearSelectFactory');

goog.require('leodido.directive.GenericSelect');
goog.require('leodido.controller.YearSelect');
goog.require('leodido.constants.YearSelect');
//goog.require('goog.object');

/**
 * YearSelect directive
 *
 * @constructor
 * @extends {leodido.directive.GenericSelect}
 */
leodido.directive.YearSelect = function () {
  goog.base(this);
  goog.DEBUG && console.log('YearSelect::constructor');
};
goog.inherits(leodido.directive.YearSelect, leodido.directive.GenericSelect);

/**
 * YearSelect directive factory
 *
 * @returns {angular.Directive} Directive definition object
 * @constructor
 */
leodido.directive.YearSelectFactory = function () {
  goog.DEBUG && console.log('YearSelectFactory::constructor');
  return (new leodido.directive.YearSelect())
    .setDirective(leodido.constants.YearSelect.DIRECTIVE_NAME)
    .setController(leodido.constants.YearSelect.CONTROLLER_NAME)
    .getDefinition();
};
