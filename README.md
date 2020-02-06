# gatsby-plugin-minify-html

[![Travis](https://img.shields.io/travis/com/illvart/gatsby-plugin-minify-html?branch=master&logo=travis)](https://travis-ci.com/illvart/gatsby-plugin-minify-html)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7ff26dcaf8924512a58c766c13e2568c)](https://www.codacy.com/app/illvart/gatsby-plugin-minify-html?utm_source=github.com&utm_medium=referral&utm_content=illvart/gatsby-plugin-minify-html&utm_campaign=Badge_Grade)
[![NPM version](https://img.shields.io/npm/v/gatsby-plugin-minify-html)](https://www.npmjs.org/package/gatsby-plugin-minify-html)
[![Downloads](https://img.shields.io/npm/dt/gatsby-plugin-minify-html)](https://www.npmjs.com/package/gatsby-plugin-minify-html)
[![Issues](https://img.shields.io/github/issues-raw/illvart/gatsby-plugin-minify-html)](https://github.com/illvart/gatsby-plugin-minify-html)
[![Twitter](https://img.shields.io/twitter/follow/illvart.svg?label=follow+illvart)](https://twitter.com/illvart)

> A Gatsby plugin for **minify HTML** files.

With this plugin, you can minify each HTML files (`.html`) at `public` directory.

_NOTE: This plugin only generates output when run in `production` mode! To test your minify HTML, run: `gatsby build && gatsby serve`._

- [Install](#install)
- [How to Use](#how-to-use)
- [Options](#options)
  - [Example](#example)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

With yarn:

`yarn add gatsby-plugin-minify-html html-minifier`

Or with npm:

`npm install --save gatsby-plugin-minify-html html-minifier`

## How to Use

Just add the plugin to the `plugins` array in your `gatsby-config.js` file:

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

## Options

This plugin uses [`html-minifier`](https://github.com/kangax/html-minifier), to use `html-minifier` options put the options at `config: { }`.

The options of `html-minifier` are enabled default by this plugin:

|              Name               |   Type    | Default |                                             Description                                              |
| :-----------------------------: | :-------: | :-----: | :--------------------------------------------------------------------------------------------------: |
|      `collapseWhitespace`       | `Boolean` | `true`  |                Collapse white space that contributes to text nodes in a document tree                |
|           `minifyCSS`           | `Boolean` | `true`  |                          Minify CSS in style elements and style attributes                           |
|           `minifyJS`            | `Boolean` | `true`  |                      Minify JavaScript in script elements and event attributes                       |
|        `removeComments`         | `Boolean` | `true`  |                                         Strip HTML comments                                          |
|  `removeScriptTypeAttributes`   | `Boolean` | `true`  |  Remove `type="text/javascript"` from `script` tags. Other `type` attribute values are left intact   |
| `removeStyleLinkTypeAttributes` | `Boolean` | `true`  | Remove `type="text/css"` from `style` and `link` tags. Other `type` attribute values are left intact |

See all options at https://github.com/kangax/html-minifier#options-quick-reference.

### Example

`gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-minify-html',
      options: {
        debug: true, // Debug optional, default false
        config: {
          // Enabled default by this plugin
          collapseWhitespace: false,
          minifyCSS: false,
          minifyJS: false,
          removeComments: false,
          removeScriptTypeAttributes: false,
          removeStyleLinkTypeAttributes: false,
          // Disabled default by this plugin
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

## Maintainers

Muhammad Nur Fuad
[![Github](https://img.shields.io/badge/-website?style=social&logoColor=333&logo=github)](https://github.com/illvart)
[![Web](https://img.shields.io/badge/-website?style=social&logoColor=333&logo=nextdoor)](https://illvart.com)

## Contributing

If you would like to help out with some code, check the [details](./docs/CONTRIBUTING.md).

## License

Licensed under [MIT](./LICENSE).

---

© 2020 [Muhammad Nur Fuad (illvart)](https://github.com/illvart). All Rights Reserved.
