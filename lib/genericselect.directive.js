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
      '?^^' + leodido.constants.SelectComposite.DIRECTIVE_NAME
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
    compile: goog.bind(self.build, self),
//    link: goog.bind(self.link, self),
    template: [
      '<select ',
      'data-ng-model="model" ',
      'data-ng-options="opt as opt.label for opt in element.opts track by opt.value" ', // opt.label for opt in element.opts track by opt.label // NOTE: 'track by opt.label' overrides value
      '>',
      '<option value="" data-ng-show="emptyOption !== \'\' && emptyOption !== undefined" data-ng-disabled="true">{{::emptyOption}}</option>',
      '</select>'
    ].join('')
  };
};

/**
 * GenericSelect compile function
 *
 * @param {!angular.JQLite=} tElement Template element
 * @param {!angular.Attributes=} tAttrs Template attributes
 * @return {Function|angular.LinkingFunctions|undefined}
 * @ngInject
 */
leodido.directive.GenericSelect.prototype.build = function (tElement, tAttrs) {
  goog.DEBUG && console.log('GenericSelectDiretive::compile');
  // Force 'data-name' attribute to 'name' attribute
  if (tElement.attr('data-name')) {
    tElement.attr('name', tElement.attr('data-name'));
    tElement.removeAttr('data-name');
  }

  var self = this;
  return {
    pre: goog.bind(self.pre, self),
    post: goog.bind(self.post, self)
  };
};

/**
 * GenericSelect pre-link function
 *
 * @param {!angular.Scope=} scope
 * @param {!angular.JQLite=} iElem
 * @param {!angular.Attributes=} iAttrs
 * @ngInject
 */
leodido.directive.GenericSelect.prototype.pre = function (scope, iElem, iAttrs) {
  /* jshint -W069 */
  // Inject interpolated name attribute
  iElem.attr('name', iAttrs['name']);
  this.prelink(scope, iElem, iAttrs);
};

/**
* GenericSelect custom pre-link function
*
* @param {!angular.Scope=} scope
* @param {!angular.JQLite=} iElem
* @param {!angular.Attributes=} iAttrs
*/
leodido.directive.GenericSelect.prototype.prelink = function (scope, iElem, iAttrs) {
};

/**
 * GenericSelect post-link function
 *
 * @param {!angular.Scope} $scope
 * @param {!angular.JQLite} $element
 * @param {!angular.Attributes} $attrs
 * @param {Array} controllers
 * @ngInject
 */
leodido.directive.GenericSelect.prototype.post = function ($scope, $element, $attrs, controllers) {
  goog.DEBUG && console.log('GenericSelectDirective::link', $scope, controllers);
  if (controllers.length < 2) {
    return;
  }
  // Privates
  var directiveController = controllers[0];
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
    modelController.$name && $scope.$emit(modelController.$name + '.selection', option);
  };
  /**
   * Handle selection change
   *
   * @param {?SelectOption} option
   * @return {?SelectOption}
   */
  var change = function (option) {
    var flag = directiveController.isValid(option);
    modelController.$setValidity(elementName, flag);
    if (flag) {
      notify(option);
      return option;
    }
    notify(null);
    return undefined;
  };
  // Setup
  aggregateController && aggregateController.addSelect($scope);
  directiveController.setup();
  // Attribute handling
  $attrs.$observe(directiveName, function (label) {
    var opts = directiveController.searchOptions('label', label);
    var wellFormatted = opts.length === 1;
    if (wellFormatted) {
      /**
       * @expose
       */
      $scope.model = opts[0];
    }
  });
  $attrs.$observe('value', function (value) {
    var opts = directiveController.searchOptions('value', value);
    var found = opts.length === 1;
    if (found && angular.isUndefined($scope.model)) {
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
