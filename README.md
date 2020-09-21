# gatsby-plugin-minify-html

[![Travis](https://img.shields.io/travis/com/illvart/gatsby-plugin-minify-html?branch=master)](https://travis-ci.com/illvart/gatsby-plugin-minify-html)
[![NPM version](https://img.shields.io/npm/v/gatsby-plugin-minify-html)](https://www.npmjs.org/package/gatsby-plugin-minify-html)
[![Downloads](https://img.shields.io/npm/dt/gatsby-plugin-minify-html)](https://www.npmjs.com/package/gatsby-plugin-minify-html)
[![Issues](https://img.shields.io/github/issues-raw/illvart/gatsby-plugin-minify-html)](https://github.com/illvart/gatsby-plugin-minify-html)

> A Gatsby plugin for **minify HTML** files.

With this plugin, you can minify each HTML files (`.html`) at `public` directory.

_NOTE: This plugin only generates output when run in `production` mode! To test your minify HTML, run: `gatsby build && gatsby serve`._

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Options](#options)
    - [Example](#example)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install with yarn:

```sh
yarn add gatsby-plugin-minify-html
```

Or install with npm:

```sh
npm install --save gatsby-plugin-minify-html
```

## Usage

After installing `gatsby-plugin-minify-html` you can add it to the `plugins` array in your `gatsby-config.js` file:

```js
module.exports = {
  plugins: ['gatsby-plugin-minify-html']
};
```

Note: if you are using `gatsby-plugin-brotli`, `gatsby-plugin-zopfli`, or other plugins look like used the **Gatsby Node APIs** [`onPostBuild`](https://www.gatsbyjs.org/docs/node-apis/#onPostBuild) make sure that it’s listed after this
plugin:

```js
// good
module.exports = {
  plugins: [
    'gatsby-plugin-minify-html',
    'gatsby-plugin-brotli'
  ]
};

// bad
module.exports = {
  plugins: [
    'gatsby-plugin-brotli', // should be placed after 'gatsby-plugin-minify-html'
    'gatsby-plugin-minify-html'
  ]
};
```

### Options

This plugin uses [`html-minifier-terser`](https://github.com/terser/html-minifier-terser), to use `html-minifier-terser` options put the options at `config: { }`.

You can see the options of `html-minifier-terser` are enabled default by this plugin in the [minify-html-plugin.js](https://github.com/illvart/gatsby-plugin-minify-html/blob/master/src/minify-html-plugin.js#L10):

|              Name               |   Type    | Default |                                             Description                                              |
| :-----------------------------: | :-------: | :-----: | :--------------------------------------------------------------------------------------------------: |
|      `collapseWhitespace`       | `Boolean` | `true`  |                Collapse white space that contributes to text nodes in a document tree                |
|           `minifyCSS`           | `Boolean` | `true`  |                          Minify CSS in style elements and style attributes                           |
|           `minifyJS`            | `Boolean` | `true`  |                      Minify JavaScript in script elements and event attributes                       |
|        `removeComments`         | `Boolean` | `true`  |                                         Strip HTML comments                                          |
|  `removeScriptTypeAttributes`   | `Boolean` | `true`  |  Remove `type="text/javascript"` from `script` tags. Other `type` attribute values are left intact   |
| `removeStyleLinkTypeAttributes` | `Boolean` | `true`  | Remove `type="text/css"` from `style` and `link` tags. Other `type` attribute values are left intact |

See all options `html-minifier-terser` at [Options Quick Reference](https://github.com/terser/html-minifier-terser#options-quick-reference).

#### Example

`gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-minify-html',
      options: {
        debug: true, // debug optional, default false
        config: {
          // Enabled default by this plugin
          collapseWhitespace: false,
          minifyCSS: false,
          minifyJS: false,
          removeComments: false,
          removeScriptTypeAttributes: false,
          removeStyleLinkTypeAttributes: false,
          // Disabled default by html-minifier-terser
          sortAttributes: true,
          useShortDoctype: true
        }
      }
    }
  ]
};
```

When option `debug: true` you can see a generate logs, example logs:

```sh
Minify HTML files at public directory, total HTML files 7:
public/404/index.html > reduced 0.20%.
public/index.html > reduced 0.19%.
...
```

## Contributing

If you would like to help out with some code, check the [details](https://github.com/illvart/gatsby-plugin-minify-html/blob/master/docs/CONTRIBUTING.md).

## License

Licensed under [MIT](https://github.com/illvart/gatsby-plugin-minify-html/blob/master/LICENSE).
