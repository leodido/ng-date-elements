'use strict';

goog.provide('leodido.constants.YearSelect');

leodido.constants.YearSelect = {};

/** @const */
leodido.constants.YearSelect.DIRECTIVE_NAME = 'yearSelect';
/** @const */
leodido.constants.YearSelect.CONTROLLER_NAME = 'YearSelectController';
/** @const */
leodido.constants.YearSelect.FORMATS = [
  'yyyy',   // 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
  'yy',     // 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
  'y'       // 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
];
/** @const */
leodido.constants.YearSelect.DEFAULT_FORMAT = leodido.constants.YearSelect.FORMATS[0];
/** @const */
leodido.constants.YearSelect.DEFAULT_FIRST = new Date().getFullYear();
/** @const */
leodido.constants.YearSelect.DEFAULT_LAST = leodido.constants.YearSelect.DEFAULT_FIRST + 10;
