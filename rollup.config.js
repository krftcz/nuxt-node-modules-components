import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import svg from 'rollup-plugin-vue-inline-svg';
import postcss from 'rollup-plugin-postcss';

const path = require('path');

export default {
	input: './index.js',
	output: {
		file: 'dist/index.js',
		name: 'sazkabet-components',
		format: 'umd',
		globals: {
			vue: 'vue'
		}
	},
	external: ['vue'],
	plugins: [
		alias({
			resolve: ['.vue', '.js'],
			entries: [
				// TODO: create regex which captures ~ and .svg?inline and replace with path.join(__dirname, '') and .svg ($1 and $2)
				// https://github.com/rollup/rollup-plugin-alias
				// {find: /\.svg\?inline/, replacement: '.svg'},
				// {find: '~', replacement: path.join(__dirname, '')},
			]
		}),
		svg(),
		vue({
			css: false,
			preprocessStyles: true,
			data: {
				scss: () => `@use 'sass:math'; @import "app/assets/scss/definitions.scss";`
			},
		}),
		postcss({
			minimize: true,
			modules: {
				generateScopedName: '[local]___[hash:base64:5]',
			}
		}),
		resolve(),
		commonjs(),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
			presets: ['@babel/env'],
			plugins: ['@babel/transform-object-assign']
		})
	],
};
