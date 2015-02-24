'use strict';

goog.provide('leodido.directive.MonthSelectFactory');

goog.require('leodido.directive.GenericSelect');
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
 * @inheritDoc
 */
leodido.directive.MonthSelect.prototype.prelink = function (scope, iElem, iAttrs) {
  /* jshint -W069 */
  // Settings (attributes and related scope variables) checking
  iAttrs.$set('first', leodido.constants.MonthSelect.DEFAULT_FIRST);
  iAttrs.$set('last', leodido.constants.MonthSelect.DEFAULT_LAST);
  var filter = iElem.injector().get('filterFilter');
  if (filter(leodido.constants.MonthSelect.FORMATS, iAttrs['format'], true).length !== 1) {
    iAttrs.$set('format', leodido.constants.MonthSelect.DEFAULT_FORMAT);
  }
};

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
