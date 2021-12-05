import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import svg from 'rollup-plugin-vue-inline-svg';
import postcss from 'rollup-plugin-postcss';

const path = require('path');

const fixPaths = () => ({
	resolveId: (importee) => {
		if (importee.includes('svg?inline')) {
			return importee
				.replace('svg?inline', 'svg')
				.replace('~', `${path.join(__dirname, '')}/app`);
		}
	}
});

export default {
	input: './index.js',
	output: {
		inlineDynamicImports: true,
		file: 'dist/index.js',
		name: 'sazkabet-components',
		format: 'umd',
		globals: {
			vue: 'vue'
		}
	},
	external: ['vue'],
	plugins: [
		fixPaths(),
		svg(),
		vue({
			css: false,
			preprocessStyles: true,
			data: {
				scss: () => `
					@use 'sass:math';
					@import "app/assets/scss/definitions.scss";
				`
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
