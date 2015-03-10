'use strict';

//goog.provide('leodido.Main');

goog.require('leodido.constants');
goog.require('leodido.directive.MonthSelectFactory');
goog.require('leodido.controller.MonthSelect');
goog.require('leodido.directive.YearSelectFactory');
goog.require('leodido.controller.YearSelect');
goog.require('leodido.directive.SelectCompositeFactory');
goog.require('leodido.directive.ExpirySelectFactory');

angular
  .module(leodido.constants.Module.NAME, [])
  .directive(leodido.constants.ExpirySelect.DIRECTIVE_NAME, leodido.directive.ExpirySelectFactory)
  .directive(leodido.constants.SelectComposite.DIRECTIVE_NAME, leodido.directive.SelectCompositeFactory)
  .controller(leodido.constants.MonthSelect.CONTROLLER_NAME, leodido.controller.MonthSelect)
  .directive(leodido.constants.MonthSelect.DIRECTIVE_NAME, leodido.directive.MonthSelectFactory)
  .controller(leodido.constants.YearSelect.CONTROLLER_NAME, leodido.controller.YearSelect)
  .directive(leodido.constants.YearSelect.DIRECTIVE_NAME, leodido.directive.YearSelectFactory);
