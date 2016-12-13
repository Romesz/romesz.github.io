const babel = require('rollup-plugin-babel');

export default {
  entry: 'resources/index.js',
  dest: 'dest/index.js',
  sourceMap: true,
  format: 'iife',
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'es2015', { modules: false } ] ]
    })
  ],
};