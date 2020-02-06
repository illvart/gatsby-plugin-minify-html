'use strict';

const fs = require('fs');
const glob = require('glob');
const merge = require('deepmerge');
const htmlMinifier = require('html-minifier');

// Default html-minifer
// https://github.com/kangax/html-minifier#options-quick-reference
const defaultOptions = {
  debug: false,
  config: {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  }
};

function onPostBuild(args, pluginOptions = {}) {
  const options = merge(defaultOptions, pluginOptions);

  return new Promise((resolve, reject) => {
    const pattern = 'public/**/*.html';
    glob(pattern, { nodir: true }, (globError, inputFiles) => {
      if (globError) {
        console.log('Minify HTML error at param `globError`', globError);
        reject();
      } else {
        const minifyStart = `Minify HTML files at public directory, total HTML files ${inputFiles.length}`;
        console.log(options.debug ? `${minifyStart}:` : `${minifyStart}.`);

        inputFiles.map(file => {
          fs.readFile(file, 'utf8', (readError, data) => {
            if (readError) {
              console.log('Minify HTML error at param `readError`', readError);
              reject();
            }

            let minify;
            try {
              minify = htmlMinifier.minify(data, options.config);
            } catch (minifyError) {
              console.log(`Error during run a html-minifier at file ${file}\n${minifyError}`);
            }
            const reducedPercentage = (((data.length - minify.length) / data.length) * 100).toFixed(2);

            fs.writeFile(file, minify, writeError => {
              if (writeError) {
                console.log('Minify HTML error at param `writeError`', writeError);
                reject();
              }
              options.debug ? console.log(file, `> reduced ${reducedPercentage}%.`) : '';
              resolve();
            });
          });
        });
      }
    });
  });
}

exports.onPostBuild = onPostBuild;
