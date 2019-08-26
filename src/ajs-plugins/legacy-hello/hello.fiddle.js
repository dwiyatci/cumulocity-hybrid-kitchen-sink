/**
 * Created by glenn on 13.07.16.
 */

(() => {
  'use strict';

  angular.module('c8y.pocs.hello').run(runBlock);

  /* @ngInject */
  function runBlock(c8ySystem) {
    (async () => {
      const version = await c8ySystem.getUIVersion();

      console.log(`ui version: ${version}`);

      // Put your fiddle code here.
      console.log('🤪 all work and no play makes jack a dull boy');
    })();
  }
})();
