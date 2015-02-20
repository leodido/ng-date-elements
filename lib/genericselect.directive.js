'use strict';

goog.provide('leodido.directive.GenericSelect');

goog.require('leodido.typedef.SelectOption');

/**
 * A generic directive
 * It allows the construction of other select directives for specific date elements (e.g. month)
 *
 * @constructor
 */
leodido.directive.GenericSelect = function () {
  // Privates
  /**
   * @type {!string}
   */
  var ctrlName = '';
  /**
   * @type {!string}
   */
  var directName = '';
  /**
   * @type {!string}
   */
  var elementName = '';
  // Privileged methods
  /**
   * Retrive the directive name
   *
   * @return {!string}
   */
  this.getDirective = function () {
    return directName;
  };
  /**
   * Retrieve the element name
   *
   * @return {!string}
   */
  this.getElement = function () {
    return elementName;
  };
  /**
   * Retrieve the controller name
   *
   * @return {!string}
   */
  this.getController = function () {
    return ctrlName;
  };
  /**
   * Set the directive name
   *
   * @param {!string} directiveName
   * @return {leodido.directive.GenericSelect}
   */
  this.setDirective = function (directiveName) {
    if (/[^a-zA-Z]/.test(directiveName)) {
      throw new TypeError('alpha string required; received "' + typeof directiveName + '"');
    }
    directName = directiveName;
    elementName = directName.match(/([A-Z]?[^A-Z]*)/g).shift();
    return this;
  };
  /**
   * Set the controller name
   *
   * @param {!string} controllerName
   * @return {leodido.directive.GenericSelect}
   */
  this.setController = function (controllerName) {
    if (!angular.isString(controllerName)) {
      throw new TypeError('string required; received "' + typeof controllerName + '"');
    }
    ctrlName = controllerName;
    return this;
  };
};

/**
 * Retrieve the DDO
 *
 * @return {!angular.Directive}
 */
leodido.directive.GenericSelect.prototype.getDefinition = function () {
  var self = this;
  return {
    restrict: 'AC',
    replace: true,
    require: [
      self.getDirective(),
      'ngModel',
      '?^^selectAggregate'
    ],
    scope: {
      /**
       * Empty option
       * @expose
       * @type {!string}
       */
      emptyOption: '@',
      /**
       * Label format
       * @expose
       * @type {!string}
       */
      format: '@',
      /**
       * First index
       * @expose
       * @type {!string}
       */
      first: '@',
      /**
       * Last index
       * @expose
       * @type {!string}
       */
      last: '@'
    },
    controller: self.getController(),
    link: goog.bind(self.link, self),
    template: [
      '<select ',
      'data-ng-model="model" ',
      // opt.label for opt in element.opts track by opt.label // NOTE: 'track by opt.label' overrides value
      'data-ng-options="opt as opt.label for opt in element.opts track by opt.value" ',
      '>',
      '<option value="" data-ng-disabled="true" data-ng-hide="!emptyOption">{{emptyOption}}</option>',
      '</select>'
    ].join('')
  };
};

/**
 * GenericSelect post-link
 *
 * @param {!angular.Scope} $scope
 * @param {!angular.JQLite} $element
 * @param {!angular.Attributes} $attrs
 * @param {Array} controllers
 * @ngInject
 */
leodido.directive.GenericSelect.prototype.link = function ($scope, $element, $attrs, controllers) {
  goog.DEBUG && console.log('GenericSelect::link', $scope);
  if (controllers.length < 2) {
    return;
  }
  // Privates
  var selectController = controllers[0];
  var modelController = controllers[1];
  var aggregateController = controllers[2];
  var directiveName = this.getDirective();
  var elementName = this.getElement();
  /**
   * Notify selected option
   *
   * @param {?SelectOption} option
   */
  var notify = function (option) {
    /**
     * @expose
     */
    modelController.$selection = option;
    $scope.$emit(modelController.$name + '.selection', option);
  };
  /**
   * Handle selection change
   *
   * @param {?SelectOption} option
   * @return {?SelectOption}
   */
  var change = function (option) {
    var flag = selectController.isValid(option);
    modelController.$setValidity(elementName, flag);
    if (flag) {
      notify(option);
      return option;
    }
    notify(null);
    return false;
  };
  // Setup
  aggregateController && aggregateController.addSelect(elementName, $scope);
  selectController.setup();
  // Attribute handling
  $attrs.$observe(directiveName, function (value) {
    var opts = selectController.searchOptions('value', value);
    var found = opts.length === 1;
    if (found) {
      /**
       * @expose
       */
      $scope.model = opts[0];
    }
  });
  $attrs.$observe('value', function (label) {
    var opts = selectController.searchOptions('label', label);
    var wellFormatted = opts.length === 1;
    if (wellFormatted && angular.isUndefined($scope.model)) {
      /**
       * @expose
       */
      $scope.model = opts[0];
    }
  });
  // Behaviour
  modelController.$parsers.unshift(change);
  modelController.$formatters.unshift(change);
};
