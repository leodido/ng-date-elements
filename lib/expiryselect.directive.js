'use strict';

goog.provide('leodido.directive.ExpirySelectFactory');

goog.require('leodido.constants.ExpirySelect');

/**
 * Select directive for expiration data
 *
 * @constructor
 */
leodido.directive.ExpirySelect = function () {
  goog.DEBUG && console.log('ExpirySelectDirective::constructor');
};

/**
 * Retrieve the DDO
 *
 * @return {!angular.Directive}
 */
leodido.directive.ExpirySelect.prototype.getDefinition = function () {
  var self = this;
  return {
    restrict: 'AC',
    require: '?ngModel',
    replace: false,
    scope: {
      /**
       * @expose
       */
      getOptions: '&options',
      /**
       * @expose
       */
      name: '@'
    },
    template: [
      '<div ',
        'data-select-composite ',
        'data-options="getOptions()">',
        '<div ',
          'name="{{::options.month.name}}" ',
          'data-month-select ' ,
          'data-empty-option="{{::options.month.emptyOption}}" ',
          'data-format="{{::options.month.format}}"',
          '></div>',
        '<div ',
          'name="{{::options.year.name}}" ',
          'data-year-select ',
          'data-empty-option="{{::options.year.emptyOption}}" ',
          'data-format="{{::options.year.format}}" ',
          // 'data-first' attribute ignore so the yearSelect's default first year is used (i.e., current year)
          'data-last="{{::options.year.last}}"',
          '></div>',
      '</div>'
    ].join(''),
    controller: this.controller,
    link: goog.bind(self.postlink, self)
  };
};

/**
 * ExpirySelect controller function
 *
 * @param {!angular.Scope=} $scope
 * @ngInject
 */
leodido.directive.ExpirySelect.prototype.controller = function ($scope) {
  goog.DEBUG && console.log('ExpirySelectDirective::controller');
  /**
   * @expose
   * @type {!Object}
   */
  $scope.expiry = $scope.expiry || {};
  /** @type {!Function} getOptions */
  $scope.getOptions;
  var options = $scope.getOptions() || {};
  /** @type {?string} name */
  $scope.name;
  // Extend/override options
  angular.extend(
    $scope,
    {
      /**
       * @expose
       */
      name: $scope.name || leodido.constants.ExpirySelect.DEFAULT_NAME,
      /**
       * @expose
       */
      getOptions: function () {
        // Assure objects exist
        options.month = options.month || {};
        options.year = options.year || {};
        // Create child names
        var mName = options.month.name || leodido.constants.ExpirySelect.DEFAULT_MONTH_NAME,
            yName = options.year.name || leodido.constants.ExpirySelect.DEFAULT_YEAR_NAME;
        mName = $scope.name + '[' + mName + ']';
        yName = $scope.name + '[' + yName + ']';
        // Assign child names
        options.month.name = mName;
        options.year.name = yName;
        // Return options
        return options;
      }
    }
  );
  // API
  this.setMonth = function (month) {
    $scope.expiry.month = month;
    return this;
  };
  this.setYear = function (year) {
    $scope.expiry.year = year;
    return this;
  };
  this.isPast = function (m, yyyy) {
    return Date.now() >= new Date(yyyy, m, 0);
  };
};

/**
 * ExpirySelect post-link function
 *
 * @param {!angular.Scope=} $scope
 * @param {!angular.JQLite=} $element
 * @param {!angular.Attributes=} $attrs
 * @param {!Object=} ngModelController
 * @ngInject
 */
leodido.directive.ExpirySelect.prototype.postlink = function ($scope, $element, $attrs, ngModelController) {
  goog.DEBUG && console.log('ExpirySelectDirective::postlink');
  var controller = $element.data('$' + leodido.constants.ExpirySelect.DIRECTIVE_NAME + 'Controller');
  // Capute selections
  $scope.$on($scope.options.month.name + '.selection', function (event, month) {
    controller.setMonth(month);
  });
  $scope.$on($scope.options.year.name + '.selection', function (event, year) {
    controller.setYear(year);
  });
  // Watch month and year values and check if date is future (so it is a valid one) or not
  if (ngModelController) {
    $scope.$watchCollection('[expiry.month, expiry.year]', function (values) {
      var m = values[0],
          y = values[1],
          validity = m && y ? !controller.isPast(m.value, y.value) : false;
      ngModelController.$setValidity(leodido.constants.ExpirySelect.DEFAULT_NAME, validity);
    });
  }
};

leodido.directive.ExpirySelectFactory = function () {
  goog.DEBUG && console.log('ExpirySelectFactory::constructor');
  return (new leodido.directive.ExpirySelect()).getDefinition();
};
