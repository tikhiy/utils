'use strict';

module.exports = {
  source: {
    exclude: [ '.temp', 'node_modules', 'docs', 'dist', 'test', '.jsdoc.js' ],
    include: [ 'index.js', 'lib' ]
  },

  opts: {
    destination: 'docs'
  }
};
