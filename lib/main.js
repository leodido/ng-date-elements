'use strict';

goog.require('leodido.constants');
goog.require('leodido.directive.MonthSelectFactory');
goog.require('leodido.directive.YearSelectFactory');

angular
  .module(leodido.constants.Module.NAME, [])
  .controller(leodido.constants.MonthSelect.CONTROLLER_NAME, leodido.controller.MonthSelect)
  .directive(leodido.constants.MonthSelect.DIRECTIVE_NAME, leodido.directive.MonthSelectFactory)
  .controller(leodido.constants.YearSelect.CONTROLLER_NAME, leodido.controller.YearSelect)
  .directive(leodido.constants.YearSelect.DIRECTIVE_NAME, leodido.directive.YearSelectFactory);
