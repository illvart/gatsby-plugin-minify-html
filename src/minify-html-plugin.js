const fs = require('fs');
const util = require('util');
const glob = require('glob');
const htmlMinifier = require('html-minifier-terser');
const {isObject, isBoolean, deepMerge} = require('./utils');

const globAsync = util.promisify(glob);
const readFileAsync = util.promisify(fs.readFile);

// Default html-minifer-terser
// https://github.com/terser/html-minifier-terser#options-quick-reference
const defaultOptions = {
  debug: false,
  config: {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
  },
};

async function onPostBuild(args, pluginOptions = {}) {
  if (pluginOptions) {
    if (pluginOptions.debug && !isBoolean(pluginOptions.debug)) {
      throw new Error('Minify HTML error: `debug` must be a boolean.');
    }
    if (pluginOptions.config && !isObject(pluginOptions.config)) {
      throw new Error('Minify HTML error: `config` must be an object.');
    }
  }
  const options = deepMerge(defaultOptions, pluginOptions);

  const pattern = 'public/**/*.html';
  const files = await globAsync(pattern, {nodir: true});

  const minifyStart = new Date().getTime();
  const minifyTotal = `Minify HTML files in the public directory, total HTML files ${files.length}`;
  console.info(options.debug ? `${minifyTotal}:` : `${minifyTotal}.`);

  const minified = files.map(async (file) => {
    const data = await readFileAsync(file, 'utf8');
    return new Promise((resolve, reject) => {
      let minify;
      try {
        minify = htmlMinifier.minify(String(data), options.config);
      } catch (err) {
        console.error(`Minify HTML error: failed to run html-minifier-terser at file ${file}:\n\n${err}`);
      }
      const reduced = (((data.length - minify.length) / data.length) * 100).toFixed(2);

      fs.writeFile(file, minify, (err) => {
        if (err) {
          console.error(`Minify HTML error: failed to write file:\n\n${err}`);
          reject();
        }
        options.debug ? console.debug(file, `> reduced ${reduced}%.`) : '';
        resolve();
      });
    });
  });
  await Promise.all(minified);

  const minifyEnd = new Date().getTime();
  console.info(`Minify HTML files done in ${(minifyEnd - minifyStart) / 1000} seconds`);
}

exports.onPostBuild = onPostBuild;
