[![view on npm](https://img.shields.io/npm/v/@uttori/plugin-generator-sitemap.svg)](https://www.npmjs.com/package/@uttori/plugin-generator-sitemap)
[![npm module downloads](https://img.shields.io/npm/dt/@uttori/plugin-generator-sitemap.svg)](https://www.npmjs.com/package/@uttori/plugin-generator-sitemap)
[![Build Status](https://travis-ci.com/uttori/uttori-plugin-generator-sitemap.svg?branch=master)](https://travis-ci.com/uttori/uttori-plugin-generator-sitemap)
[![Dependency Status](https://david-dm.org/uttori/uttori-plugin-generator-sitemap.svg)](https://david-dm.org/uttori/uttori-plugin-generator-sitemap)
[![Coverage Status](https://coveralls.io/repos/uttori/uttori-plugin-generator-sitemap/badge.svg?branch=master)](https://coveralls.io/r/uttori/uttori-plugin-generator-sitemap?branch=master)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Futtori%2Futtori-plugin-generator-sitemap.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Futtori%2Futtori-plugin-generator-sitemap?ref=badge_shield)

# Uttori Sitemap Generator

A utility method for generating a XML sitemap.

## Install

```bash
npm install --save uttori-plugin-generator-sitemap
```

## Config

```js
{
  // Registration Events
  events: {
    callback: ['document-save', 'document-delete'],
    validateConfig: ['validate-config'],
  },

  // Sitemap URL (ie https://domain.tld)
  base_url: '',

  // Location where the XML sitemap will be written to.
  directory: '',

  // Sitemap URL Filter
  url_filters: [],

  // Sitemap XML Header
  xml_header: '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',

  // Sitemap XML Footer
  xml_footer: '</urlset>',

  // Sitemap Filename
  filename: 'sitemap',

  // Sitemap Fie Extension
  extension: 'xml',

  // Sitemap default page priority
  page_priority: '0.80',

  // Sitemap URLs, must be an array.
  urls: [],
}
```

* * *

## API Reference

<a name="SitemapGenerator"></a>

## SitemapGenerator
Uttori Sitemap Generator

**Kind**: global class

* [SitemapGenerator](#SitemapGenerator)
    * [.configKey](#SitemapGenerator.configKey) ⇒ <code>string</code>
    * [.defaultConfig()](#SitemapGenerator.defaultConfig) ⇒ <code>object</code>
    * [.validateConfig(config, [_context])](#SitemapGenerator.validateConfig)
    * [.register(context)](#SitemapGenerator.register)
    * [.callback(_document, context)](#SitemapGenerator.callback) ⇒ <code>Promise</code>
    * [.generateSitemap(context)](#SitemapGenerator.generateSitemap) ⇒ <code>Promise</code>

<a name="SitemapGenerator.configKey"></a>

### SitemapGenerator.configKey ⇒ <code>string</code>
The configuration key for plugin to look for in the provided configuration.

**Kind**: static property of [<code>SitemapGenerator</code>](#SitemapGenerator)
**Returns**: <code>string</code> - The configuration key.
**Example** *(SitemapGenerator.configKey)*
```js
const config = { ...SitemapGenerator.defaultConfig(), ...context.config[SitemapGenerator.configKey] };
```
<a name="SitemapGenerator.defaultConfig"></a>

### SitemapGenerator.defaultConfig() ⇒ <code>object</code>
The default configuration.

**Kind**: static method of [<code>SitemapGenerator</code>](#SitemapGenerator)
**Returns**: <code>object</code> - The configuration.
**Example** *(SitemapGenerator.defaultConfig())*
```js
const config = { ...SitemapGenerator.defaultConfig(), ...context.config[SitemapGenerator.configKey] };
```
<a name="SitemapGenerator.validateConfig"></a>

### SitemapGenerator.validateConfig(config, [_context])
Validates the provided configuration for required entries.

**Kind**: static method of [<code>SitemapGenerator</code>](#SitemapGenerator)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | A configuration object. |
| config.configKey | <code>object</code> | A configuration object specifically for this plugin. |
| config.configKey.urls | <code>Array.&lt;object&gt;</code> | A collection of Uttori documents. |
| [config.configKey.url_filters] | <code>Array.&lt;RegExp&gt;</code> | A collection of Regular Expression URL filters. |
| config.configKey.base_url | <code>string</code> | The base URL (ie https://domain.tld) for all documents. |
| config.configKey.directory | <code>string</code> | The path to the location you want the sitemap file to be writtent to. |
| [_context] | <code>object</code> | A Uttori-like context (unused). |

**Example** *(SitemapGenerator.validateConfig(config, _context))*
```js
SitemapGenerator.validateConfig({ ... });
```
<a name="SitemapGenerator.register"></a>

### SitemapGenerator.register(context)
Register the plugin with a provided set of events on a provided Hook system.

**Kind**: static method of [<code>SitemapGenerator</code>](#SitemapGenerator)

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | A Uttori-like context. |
| context.hooks | <code>object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |
| context.config | <code>object</code> | A provided configuration to use. |
| context.config.events | <code>object</code> | An object whose keys correspong to methods, and contents are events to listen for. |

**Example** *(SitemapGenerator.register(context))*
```js
const context = {
  hooks: {
    on: (event, callback) => { ... },
  },
  config: {
    [SitemapGenerator.configKey]: {
      ...,
      events: {
        callback: ['document-save', 'document-delete'],
        validateConfig: ['validate-config'],
      },
    },
  },
};
SitemapGenerator.register(context);
```
<a name="SitemapGenerator.callback"></a>

### SitemapGenerator.callback(_document, context) ⇒ <code>Promise</code>
Wrapper function for calling generating and writing the sitemap file.

**Kind**: static method of [<code>SitemapGenerator</code>](#SitemapGenerator)
**Returns**: <code>Promise</code> - The provided document.

| Param | Type | Description |
| --- | --- | --- |
| _document | <code>object</code> | A Uttori document (unused). |
| context | <code>object</code> | A Uttori-like context. |
| context.config | <code>object</code> | A provided configuration to use. |
| context.config.directory | <code>string</code> | The directory to write the sitemap to. |
| context.config.filename | <code>string</code> | The name to use for the generated file. |
| context.config.extension | <code>string</code> | The file extension to use for the generated file. |
| context.hooks | <code>object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |
| context.hooks.fetch | <code>function</code> | An event dispatch function that returns an array of results. |

**Example** *(SitemapGenerator.callback(_document, context))*
```js
const context = {
  config: {
    [SitemapGenerator.configKey]: {
      ...,
    },
  },
  hooks: {
    on: (event) => { ... }
  },
};
SitemapGenerator.callback(null, context);
```
<a name="SitemapGenerator.generateSitemap"></a>

### SitemapGenerator.generateSitemap(context) ⇒ <code>Promise</code>
Generates a sitemap from the provided context.

**Kind**: static method of [<code>SitemapGenerator</code>](#SitemapGenerator)
**Returns**: <code>Promise</code> - The generated sitemap.

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | A Uttori-like context. |
| context.config | <code>object</code> | A provided configuration to use. |
| context.config.base_url | <code>string</code> | The prefix for URLs in the sitemap. |
| context.config.page_priority | <code>number</code> | The page_priority for pages. |
| context.config.url_filters | <code>Array.&lt;RegExp&gt;</code> | A collection of URL filters used to filter documents. |
| context.config.urls | <code>Array.&lt;object&gt;</code> | Additional documents to add to the sitemap. |
| context.config.urls.slug | <code>string</code> | The path for the current document. |
| context.config.urls.updateDate | <code>string</code> | The timestamp of the last update for the current document. |
| context.config.xml_footer | <code>string</code> | The suffix for the sitemap. |
| context.config.xml_header | <code>string</code> | The prefix for the sitemap. |
| context.config.events | <code>object</code> | An object whose keys correspong to methods, and contents are events to listen for. |
| context.hooks | <code>object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |
| context.hooks.fetch | <code>function</code> | An event dispatch function that returns an array of results. |

**Example** *(SitemapGenerator.callback(_document, context))*
```js
const context = {
  config: {
    [SitemapGenerator.configKey]: {
      ...,
    },
  },
  hooks: {
    on: (event) => { ... },
    fetch: (event, query) => { ... },
  },
};
SitemapGenerator.generateSitemap(context);
```

* * *

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
npm install
npm test
DEBUG=Uttori* npm test
```

## Contributors

* [Matthew Callis](https://github.com/MatthewCallis)

## License

* [MIT](LICENSE)


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Futtori%2Futtori-plugin-generator-sitemap.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Futtori%2Futtori-plugin-generator-sitemap?ref=badge_large)