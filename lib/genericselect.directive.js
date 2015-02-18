'use strict';

goog.provide('leodido.directive.GenericSelect');

/**
 * A generic directive
 * It allows the construction of other select directives for specific date elements (e.g. month)
 *
 * @constructor
 */
leodido.directive.GenericSelect = function () {
  var ctrlName = null,
      directName = null,
      elementName = null;
  goog.DEBUG && console.log('GenericSelect::__constructor');

  // Privileged methods
  /**
   * Retrive the directive name
   *
   * @return {String}
   */
  this.getDirective = function () {
    return directName;
  };
  /**
   * Retrieve the element name
   *
   * @return {String}
   */
  this.getElement = function () {
    return elementName;
  };
  /**
   * Retrieve the controller name
   *
   * @return {String}
   */
  this.getController = function () {
    return ctrlName;
  };
  /**
   * Set the directive name
   *
   * @param {String} directive
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
   * @param {String} controllerName
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
 * @return {angular.Directive}
 */
leodido.directive.GenericSelect.prototype.getDefinition = function () {
  var self = this;
  return {
    restrict: 'AC',
    replace: true,
    require: [
      self.getDirective(),
      'ngModel'
    ],
    scope: {
      /**
       * Empty option
       * @expose
       * @type {String}
       */
      emptyOption: '@',
      /**
       * Label format
       * @expose
       * @type {String}
       */
      format: '@',
      /**
       * First index
       * @expose
       * @type {String}
       */
      first: '@', // TODO: handle
      /**
       * Last index
       * @expose
       * @type {String}
       */
      last: '@' // TODO: handle
    },
    controller: self.getController(),
    link: goog.bind(self.link, self),
    template: [
      '<select ',
      'data-ng-options="element.label for element in element.opts track by element.label" ',
      'data-ng-model="element.model" ',
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
  if (controllers.length !== 2) {
    return;
  }
  // Privates
  var selectController = controllers[0];
  var modelController = controllers[1];
  var directiveName = this.getDirective();
  var elementName = this.getElement();

  var publish = function (option) {
    //
    selectController.setSelected(option);
    // Standalone use
    /**
     * @expose
     * @type {SelectOption}
     */
    modelController.$selection = option;
    $scope.$emit(modelController.$name + '.selection', option);
  };
  var change = function (option) {
    goog.DEBUG && console.log('GenericSelect::link::change', option, $scope);
    var flag = selectController.isValid(option);
    modelController.$setValidity(elementName, flag);
    if (flag) {
      // Publish selected option
      publish(option);
      return option;
    }
    // Remove previously selected option
    publish(null);
    return false;
  };
  // Setup
  selectController.setup();
  // Attribute handling
  $attrs.$observe(directiveName, function (value) {
    var opts = selectController.searchOptions('value', value);
    var found = opts.length === 1;
    if (found) {
      /**
       * @expose
       * @type {SelectOption}
       */
      $scope.element.model = opts[0];
    }
  });
  $attrs.$observe('value', function (label) {
    var opts = selectController.searchOptions('label', label);
    var wellFormatted = opts.length === 1;
    if (wellFormatted && angular.isUndefined($scope.element.model)) {
      /**
       * @expose
       * @type {SelectOption}
       */
      $scope.element.model = opts[0];
    }
  });
  // Behaviour
  modelController.$parsers.unshift(change);
  modelController.$formatters.unshift(change);
};
