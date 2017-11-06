// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/server/server.js',
  output: {
    file: 'dist/server.js',
    format: 'cjs'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
