[![view on npm](http://img.shields.io/npm/v/uttori-plugin-generator-sitemap.svg)](https://www.npmjs.org/package/uttori-plugin-generator-sitemap)
[![npm module downloads](http://img.shields.io/npm/dt/uttori-plugin-generator-sitemap.svg)](https://www.npmjs.org/package/uttori-plugin-generator-sitemap)
[![Build Status](https://travis-ci.org/uttori/uttori-plugin-generator-sitemap.svg?branch=master)](https://travis-ci.org/uttori/uttori-plugin-generator-sitemap)
[![Dependency Status](https://david-dm.org/uttori/uttori-plugin-generator-sitemap.svg)](https://david-dm.org/uttori/uttori-plugin-generator-sitemap)
[![Coverage Status](https://coveralls.io/repos/uttori/uttori-plugin-generator-sitemap/badge.svg?branch=master)](https://coveralls.io/r/uttori/uttori-plugin-generator-sitemap?branch=master)

# Uttori Sitemap Generator

A utility method for generating a XML sitemap.

## Install

```bash
npm install --save uttori-plugin-generator-sitemap
```

# Config

```js
{
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

# API Reference

<a name="SitemapGenerator"></a>

## SitemapGenerator
Uttori Sitemap Generator

**Kind**: global class  

* [SitemapGenerator](#SitemapGenerator)
    * [.configKey](#SitemapGenerator.configKey) ⇒ <code>String</code>
    * [.defaultConfig()](#SitemapGenerator.defaultConfig) ⇒ <code>Object</code>
    * [.validateConfig(config, _context)](#SitemapGenerator.validateConfig)
    * [.register(context)](#SitemapGenerator.register)
    * [.callback(_document, context)](#SitemapGenerator.callback) ⇒ <code>Object</code>
    * [.generateSitemap(_document, context)](#SitemapGenerator.generateSitemap) ⇒ <code>String</code>

<a name="SitemapGenerator.configKey"></a>

### SitemapGenerator.configKey ⇒ <code>String</code>
The configuration key for plugin to look for in the provided configuration.

**Kind**: static property of [<code>SitemapGenerator</code>](#SitemapGenerator)  
**Returns**: <code>String</code> - The configuration key.  
**Example** *(SitemapGenerator.configKey)*  
```js
const config = { ...SitemapGenerator.defaultConfig(), ...context.config[SitemapGenerator.configKey] };
```
<a name="SitemapGenerator.defaultConfig"></a>

### SitemapGenerator.defaultConfig() ⇒ <code>Object</code>
The default configuration.

**Kind**: static method of [<code>SitemapGenerator</code>](#SitemapGenerator)  
**Returns**: <code>Object</code> - The configuration.  
**Example** *(SitemapGenerator.defaultConfig())*  
```js
const config = { ...SitemapGenerator.defaultConfig(), ...context.config[SitemapGenerator.configKey] };
```
<a name="SitemapGenerator.validateConfig"></a>

### SitemapGenerator.validateConfig(config, _context)
Validates the provided configuration for required entries.

**Kind**: static method of [<code>SitemapGenerator</code>](#SitemapGenerator)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | A configuration object. |
| config[SitemapGenerator.configKey | <code>Object</code> | A configuration object specifically for this plugin. |
| config[SitemapGenerator.configKey].urls | <code>Array.&lt;Object&gt;</code> | A collection of Uttori documents. |
| config[SitemapGenerator.configKey].url_filters | <code>Array.&lt;RegExp&gt;</code> | A collection of Regular Expression URL filters. |
| config[SitemapGenerator.configKey].base_url | <code>String</code> | The base URL (ie https://domain.tld) for all documents. |
| config[SitemapGenerator.configKey].directory | <code>String</code> | The path to the location you want the sitemap file to be writtent to. |
| _context | <code>Object</code> | A Uttori-like context (unused). |

**Example** *(SitemapGenerator.validateConfig(config, _context))*  
```js
const config = { ...SitemapGenerator.defaultConfig(), ...context.config[SitemapGenerator.configKey] };
```
<a name="SitemapGenerator.register"></a>

### SitemapGenerator.register(context)
Register the plugin with a provided set of events on a provided Hook system.

**Kind**: static method of [<code>SitemapGenerator</code>](#SitemapGenerator)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | A Uttori-like context. |
| context.hooks | <code>Object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |
| context.config | <code>Object</code> | A provided configuration to use. |
| context.config.events | <code>Object</code> | An object whose keys correspong to methods, and contents are events to listen for. |

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

### SitemapGenerator.callback(_document, context) ⇒ <code>Object</code>
Wrapper function for calling generating and writing the sitemap file.

**Kind**: static method of [<code>SitemapGenerator</code>](#SitemapGenerator)  
**Returns**: <code>Object</code> - The provided document.  

| Param | Type | Description |
| --- | --- | --- |
| _document | <code>Object</code> | A Uttori document (unused). |
| context | <code>Object</code> | A Uttori-like context. |
| context.config | <code>Object</code> | A provided configuration to use. |
| context.config.directory | <code>String</code> | The directory to write the sitemap to. |
| context.config.filename | <code>String</code> | The name to use for the generated file. |
| context.config.extension | <code>String</code> | The file extension to use for the generated file. |
| context.storageProvider | <code>Object</code> | A provided Uttori StorageProvider instance. |
| context.storageProvider.getQuery | <code>function</code> | Access method for getting documents. |

**Example** *(SitemapGenerator.callback(_document, context))*  
```js
const context = {
  config: {
    [SitemapGenerator.configKey]: {
      ...,
    },
  },
  storageProvider: {
    getQuery: (query) => { ... }
  },
};
SitemapGenerator.callback(null, context);
```
<a name="SitemapGenerator.generateSitemap"></a>

### SitemapGenerator.generateSitemap(_document, context) ⇒ <code>String</code>
Generates a sitemap from the provided context.

**Kind**: static method of [<code>SitemapGenerator</code>](#SitemapGenerator)  
**Returns**: <code>String</code> - The generated sitemap.  

| Param | Type | Description |
| --- | --- | --- |
| _document | <code>Object</code> | A Uttori document (unused). |
| context | <code>Object</code> | A Uttori-like context. |
| context.config | <code>Object</code> | A provided configuration to use. |
| context.config.base_url | <code>String</code> | The prefix for URLs in the sitemap. |
| context.config.page_priority | <code>Number</code> | The page_priority for pages. |
| context.config.url_filters | <code>Array.&lt;RegExp&gt;</code> | A collection of URL filters used to filter documents. |
| context.config.urls | <code>Array.&lt;Object&gt;</code> | Additional documents to add to the sitemap. |
| context.config.urls[].slug | <code>String</code> | The path for the current document. |
| context.config.urls[].updateDate | <code>String</code> | The timestamp of the last update for the current document. |
| context.config.xml_footer | <code>String</code> | The suffix for the sitemap. |
| context.config.xml_header | <code>String</code> | The prefix for the sitemap. |
| context.storageProvider | <code>Object</code> | A provided Uttori StorageProvider instance. |
| context.storageProvider.getQuery | <code>function</code> | Access method for getting documents. |

**Example** *(SitemapGenerator.callback(_document, context))*  
```js
const context = {
  config: {
    [SitemapGenerator.configKey]: {
      ...,
    },
  },
  storageProvider: {
    getQuery: (query) => { ... }
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
