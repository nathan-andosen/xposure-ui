import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';

export default {
  input: './vue/directives/tap/index.ts',
  output: {
    file: './vue/directives/tap/index.js',
    format: 'esm',
    globals: { 
      'hammerjs': 'Hammer'
    }
  },
  external: [
    'hammerjs'
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    resolve(),
    commonjs(),
    buble()
  ]
};