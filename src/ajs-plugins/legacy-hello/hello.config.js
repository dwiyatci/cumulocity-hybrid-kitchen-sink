/**
 * Created by glenn on 13.07.16.
 */

(() => {
  'use strict';

  angular.module('c8y.pocs.hello').config(configure);

  /* @ngInject */
  function configure(c8yNavigatorProvider, c8yViewsProvider) {
    c8yNavigatorProvider.addNavigation({
      name: 'legacy-hello',
      icon: 'cube',
      priority: 100000,
      path: 'legacy-hello'
    });

    c8yViewsProvider.when('/legacy-hello', {
      templateUrl: ':::PLUGIN_PATH:::/main.html'
    });
  }
})();
