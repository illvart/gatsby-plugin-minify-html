# gatsby-plugin-minify-html

**A Gatsby plugin to minify HTML files**

[![CI](https://github.com/illvart/gatsby-plugin-minify-html/workflows/CI/badge.svg)](https://github.com/illvart/gatsby-plugin-minify-html/actions/workflows/ci.yml)
[![LICENSE](https://img.shields.io/github/license/illvart/gatsby-plugin-minify-html)](LICENSE)
[![NPM version](https://img.shields.io/npm/v/gatsby-plugin-minify-html)](https://www.npmjs.org/package/gatsby-plugin-minify-html)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Options](#options)
    - [Example](#example)
- [Supports](#supports)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install with yarn:

```sh
yarn add gatsby-plugin-minify-html
```

Or with npm:

```sh
npm install --save gatsby-plugin-minify-html
```

## Usage

After installing `gatsby-plugin-minify-html`, add it to the `plugins` array in `gatsby-config.js`:

```js
module.exports = {
  plugins: ['gatsby-plugin-minify-html']
};
```

If you’re using `gatsby-plugin-brotli`, `gatsby-plugin-zopfli`, or other plugins that use the **Gatsby Node APIs** [onPostBuild](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#onPostBuild), make sure they are listed after this plugin:

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

This plugin uses [html-minifier-terser](https://github.com/terser/html-minifier-terser). To customize options, add to `config: { }`.

See the default options enabled by this plugin in [minify-html-plugin.js](src/minify-html-plugin.js#L10):

|              Name               |   Type    | Default |                                             Description                                              |
| :-----------------------------: | :-------: | :-----: | :--------------------------------------------------------------------------------------------------: |
|      `collapseWhitespace`       | `Boolean` | `true`  |                Collapse white space that contributes to text nodes in a document tree                |
|           `minifyCSS`           | `Boolean` | `true`  |                          Minify CSS in style elements and style attributes                           |
|           `minifyJS`            | `Boolean` | `true`  |                      Minify JavaScript in script elements and event attributes                       |
|        `removeComments`         | `Boolean` | `true`  |                                         Strip HTML comments                                          |
|  `removeScriptTypeAttributes`   | `Boolean` | `true`  |  Remove `type="text/javascript"` from `script` tags. Other `type` attribute values are left intact   |
| `removeStyleLinkTypeAttributes` | `Boolean` | `true`  | Remove `type="text/css"` from `style` and `link` tags. Other `type` attribute values are left intact |

See all `html-minifier-terser` options in the [Options Quick Reference](https://github.com/terser/html-minifier-terser#options-quick-reference).

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

When the option `debug: true`, you can see generated logs. Example logs:

```sh
Minify HTML files in the public directory, total HTML files 7:
public/404/index.html > reduced 0.20%.
public/index.html > reduced 0.19%.
...
```

## Supports

If you’re enjoying it or want to support development, feel free to donate. Thank you! ❤️

## Contributing

Want to contribute? Read the [Contributing](docs/CONTRIBUTING.md).

## License

Released under the [MIT License](LICENSE).
