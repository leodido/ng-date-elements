'use strict';

goog.provide('leodido.directive.YearSelectFactory');

goog.require('leodido.directive.GenericSelect');
goog.require('leodido.constants.YearSelect');

/**
 * YearSelect directive
 *
 * @constructor
 * @extends {leodido.directive.GenericSelect}
 */
leodido.directive.YearSelect = function () {
  goog.base(this);
  goog.DEBUG && console.log('YearSelectDirective::constructor');
};
goog.inherits(leodido.directive.YearSelect, leodido.directive.GenericSelect);

/**
 * @inheritDoc
 */
leodido.directive.YearSelect.prototype.prelink = function (scope, iElem, iAttrs, controllers) {
  /* jshint -W069 */
  // Settings (attributes and related scope variables) checking
  var first,
      last,
      filter = iElem.injector().get('filterFilter');
  if (!/^\d{4}$/.test(iAttrs['first'])) {
    first = leodido.constants.YearSelect.DEFAULT_FIRST;
    iAttrs.$set('first', first);
  } else {
    first = iAttrs['first'];
  }
  first = + first;
  if (!/^\d{4}$/.test(iAttrs['last'])) {
    last = '' + (first + leodido.constants.YearSelect.DEFAULT_RANGE);
    iAttrs.$set('last', last);
  } else {
    last = iAttrs['last'];
  }
  last = + last;
  if (first > last) {
    throw new Error('Last year must be greather than the first year (i.e., ' + first + '); received: ' + last);
  }
  if (filter(leodido.constants.YearSelect.FORMATS, iAttrs['format'], true).length !== 1) {
    iAttrs.$set('format', leodido.constants.YearSelect.DEFAULT_FORMAT);
  }
};

/**
 * YearSelect directive factory
 *
 * @returns {!angular.Directive} Directive definition object
 * @constructor
 */
leodido.directive.YearSelectFactory = function () {
  goog.DEBUG && console.log('YearSelectFactory::constructor');
  return (new leodido.directive.YearSelect())
    .setDirective(leodido.constants.YearSelect.DIRECTIVE_NAME)
    .setController(leodido.constants.YearSelect.CONTROLLER_NAME)
    .getDefinition();
};
