// Plugin Imports
import alias from '@rollup/plugin-alias';
import autoprefixer from 'autoprefixer';
import cssModuleTypes from './lib/rollup/css-module-types';
import html from '@rollup/plugin-html';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

// Rimraf to clean up build directory
import rimraf from 'rimraf';

rimraf.sync("build");

const devMode = (process.env.NODE_ENV === 'development');

export default [
    {
        input: "src/main.tsx",

        watch: {
            include: "src/**",
            clearScreen: false,
        },

        output: {
            dir: "build",
            entryFileNames: "[name]-[hash].js",
            format: "es",
            sourcemap: devMode ? 'inline': false,
            plugins: [
                terser({
                    ecma: 2020,
                    mangle: { toplevel: true },
                    compress: {
                        module: true,
                        toplevel: true,
                        unsafe_arrows: true,
                        drop_console: !devMode,
                        drop_debugger: !devMode,
                    },
                    output: {
                        quote_style: 1,
                    }
                }),
            ],
        },

        plugins: [
            alias({
                entries: [
                    { find: 'react', replacement: 'preact/compat' },
                    { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
                    { find: 'react-dom', replacement: 'preact-compat' },
                    { find: 'react/jsx-runtime', replacement: 'preact-jxs-runtime' },
                ]
            }),
            {
                resolveFileUrl({ fileName }) {
                    return JSON.stringify("/" + fileName);
                }
            },
            cssModuleTypes("src"),
            postcss({
                extract: false,
                modules: true,
                namedExports(name) {
                    return name.replace(/-\w/g, val => val.slice(1).toUpperCase());
                  },
                sourceMap: true,
                plugins: [
                    autoprefixer(),
                ]
            }),
            resolve(),
            typescript(),
            html(),
        ]
    }
]