/**
 * Created by glenn on 13.08.19.
 * @see https://babeljs.io/docs/en/config-files#jest
 */

module.exports = require('babel-jest').createTransformer({
  rootMode: 'upward'
});
