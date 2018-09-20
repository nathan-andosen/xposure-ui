import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';

let buildEsm = {
  input: './vue/directives/tap/tap-directive.ts',
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

let buildBundle = {
  input: './vue/directives/tap/tap-directive.ts',
  output: {
    file: './vue/directives/tap/index.bundle.js',
    format: 'umd',
    name: 'XuiTapDirective',
    globals: { 
      'hammerjs': 'Hammer'
    }
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    resolve(),
    commonjs(),
    buble()
  ]
};



let exportBuilds = [
  buildEsm,
  buildBundle
];
export default exportBuilds;