/**
 * Created by glenn on 13.08.19.
 */

module.exports = function(api) {
  'use strict';

  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: 'last 2 versions',
        useBuiltIns: 'entry',
        corejs: 2,
        debug: false
      }
    ]
  ];

  const plugins = ['@babel/plugin-proposal-object-rest-spread'];

  return {
    presets,
    plugins
  };
};
