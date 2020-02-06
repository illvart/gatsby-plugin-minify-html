'use strict';

const minifyHtmlPlugin = require('./src/minify-html-plugin');

exports.onPostBuild = minifyHtmlPlugin.onPostBuild;
