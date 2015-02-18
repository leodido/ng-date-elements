'use strict';

goog.provide('leodido.constants.MonthSelect');

leodido.constants.MonthSelect = {};

/** @const */
leodido.constants.MonthSelect.DIRECTIVE_NAME = 'monthSelect';
/** @const */
leodido.constants.MonthSelect.CONTROLLER_NAME = 'MonthSelectController';
/** @const */
leodido.constants.MonthSelect.FORMATS = [
  'MMMM', // Month in year (January-December)
  'MMM',  // Month in year (Jan-Dec)
  'MM',   // Month in year, padded (01-12)
  'M'     // Month in year (1-12)
];
/** @const */
leodido.constants.MonthSelect.DEFAULT_FORMAT = leodido.constants.MonthSelect.FORMATS[2];
