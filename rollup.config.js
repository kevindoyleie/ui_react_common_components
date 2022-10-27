import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
//import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      image(),
      // scss({
      //   outputStyle: 'compressed'
      // }),
      postcss({
        extract: false,
        autoModules: true,
        use: ['sass'],
      }),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({ exclude: 'node_modules/**', presets: ['@babel/preset-react'] }),
      resolve(),
      commonjs(),
      copy({
        targets: [
          {
            src: 'src/styles/common/*.scss',
            dest: 'dist',
          },
        ],
      })
    ],
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
