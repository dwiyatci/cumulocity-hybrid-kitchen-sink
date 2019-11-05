/**
 * Created by glenn on 15.08.19.
 */

const CopyPlugin = require('copy-webpack-plugin');

module.exports = config;

function config(env) {
  'use strict';

  return {
    plugins: [
      new CopyPlugin([
        { from: './src/assets', to: 'assets' },
        { from: './src/locales', to: 'locales' }
      ])
    ]
  };
}
