[![view on npm](https://img.shields.io/npm/v/@uttori/plugin-generator-sitemap.svg)](https://www.npmjs.com/package/@uttori/plugin-generator-sitemap)
[![npm module downloads](https://img.shields.io/npm/dt/@uttori/plugin-generator-sitemap)](https://www.npmjs.com/package/@uttori/plugin-generator-sitemap)
[![Build Status](https://travis-ci.com/uttori/uttori-plugin-generator-sitemap.svg?branch=master)](https://travis-ci.com/uttori/uttori-plugin-generator-sitemap)
[![Dependency Status](https://david-dm.org/uttori/uttori-plugin-generator-sitemap.svg)](https://david-dm.org/uttori/uttori-plugin-generator-sitemap)
[![Coverage Status](https://coveralls.io/repos/uttori/uttori-plugin-generator-sitemap/badge.svg?branch=master)](https://coveralls.io/r/uttori/uttori-plugin-generator-sitemap?branch=master)
[![Tree-Shaking Support](https://badgen.net/bundlephobia/tree-shaking/@uttori/plugin-generator-sitemap)](https://bundlephobia.com/result?p=@uttori/plugin-generator-sitemap)
[![Dependency Count](https://badgen.net/bundlephobia/dependency-count/@uttori/plugin-generator-sitemap)](https://bundlephobia.com/result?p=@uttori/plugin-generator-sitemap)
[![Minified + GZip](https://badgen.net/bundlephobia/minzip/@uttori/plugin-generator-sitemap)](https://bundlephobia.com/result?p=@uttori/plugin-generator-sitemap)
[![Minified](https://badgen.net/bundlephobia/min/@uttori/plugin-generator-sitemap)](https://bundlephobia.com/result?p=@uttori/plugin-generator-sitemap)

# Uttori Sitemap Generator

A plugin to generating a XML sitemap.

## Install

```bash
npm install --save @uttori/plugin-generator-sitemap
```

## Config

```js
{
  // Registration Events
  events: {
    callback: ['document-save', 'document-delete'],
    validateConfig: ['validate-config'],
  },

  [SitemapGenerator.configKey]: {
    ...
  }
}
```

* * *

## API Reference

## Classes

<dl>
<dt><a href="#SitemapGenerator">SitemapGenerator</a></dt>
<dd><p>Uttori Sitemap Generator</p>
<p>Generates a valid sitemap.xml file for submitting to search engines.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#debug">debug()</a> : <code>function</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SitemapGeneratorConfig">SitemapGeneratorConfig</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="SitemapGenerator"></a>

## SitemapGenerator
Uttori Sitemap Generator

Generates a valid sitemap.xml file for submitting to search engines.

**Kind**: global class  

* [SitemapGenerator](#SitemapGenerator)
    * [.configKey](#SitemapGenerator.configKey) ⇒ <code>string</code>
    * [.defaultConfig()](#SitemapGenerator.defaultConfig) ⇒ [<code>SitemapGeneratorConfig</code>](#SitemapGeneratorConfig)
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

### SitemapGenerator.defaultConfig() ⇒ [<code>SitemapGeneratorConfig</code>](#SitemapGeneratorConfig)
The default configuration.

**Kind**: static method of [<code>SitemapGenerator</code>](#SitemapGenerator)  
**Returns**: [<code>SitemapGeneratorConfig</code>](#SitemapGeneratorConfig) - The configuration.  
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
| config.configKey | [<code>SitemapGeneratorConfig</code>](#SitemapGeneratorConfig) | A configuration object specifically for this plugin. |
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
| context.config.configKey | [<code>SitemapGeneratorConfig</code>](#SitemapGeneratorConfig) | A configuration object specifically for this plugin. |
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
| context.config.configKey | [<code>SitemapGeneratorConfig</code>](#SitemapGeneratorConfig) | A configuration object specifically for this plugin. |
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
<a name="debug"></a>

## debug() : <code>function</code>
**Kind**: global function  
<a name="SitemapGeneratorConfig"></a>

## SitemapGeneratorConfig : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| urls | <code>Array.&lt;object&gt;</code> |  | A collection of Uttori documents. |
| [url_filters] | <code>Array.&lt;RegExp&gt;</code> |  | A collection of Regular Expression URL filters to exclude documents. |
| base_url | <code>string</code> |  | The base URL (ie https://domain.tld) for all documents. |
| directory | <code>string</code> |  | The path to the location you want the sitemap file to be written to. |
| [filename] | <code>string</code> | <code>&quot;&#x27;sitemap&#x27;&quot;</code> | The file name to use for the generated file. |
| [extension] | <code>string</code> | <code>&quot;&#x27;xml&#x27;&quot;</code> | The file extension to use for the generated file. |
| [page_priority] | <code>string</code> | <code>&quot;&#x27;0.08&#x27;&quot;</code> | Sitemap default page priority. |
| [xml_header] | <code>string</code> |  | Sitemap XML Header, standard XML sitemap header is the default. |
| [xml_footer] | <code>string</code> |  | Sitemap XML Footer, standard XML sitemap closing tag is the default. |


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
