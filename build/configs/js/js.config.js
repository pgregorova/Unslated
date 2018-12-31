const Webpack = require('webpack');
const path = require('path');
const AlexWebpackPlugin = require('../../guide/alex/alex.webpack.js');

// all js(x) files get ran through these build processes
module.exports = {
	config: [{
    'test': /\.(jsx|js|css)$/,
    'exclude': /node_modules/,
    'use': [{
      'loader': 'babel-loader', // (see: https://www.npmjs.com/package/babel-loader)
      'options': {
        'compact': false,
        'presets': ['env', 'react'],
        'plugins': [
          'transform-object-rest-spread', // (see: https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread)
          'transform-class-properties', // (see: https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)
          'add-react-displayname' // (see: https://www.npmjs.com/package/babel-plugin-add-react-displayname)
        ]
      }
    }]
  }],
	plugins: [
    new Webpack.ProvidePlugin({
      'React': 'react', // (see: https://reactjs.org/)
      'ReactDOM': 'react-dom', // (see: https://reactjs.org/docs/react-dom.html)
      'PropTypes': 'prop-types' // (see: https://reactjs.org/docs/render-props.html)
    }),
    new AlexWebpackPlugin() // This allows alex access to webpack build stats object for error reporting
  ]
};