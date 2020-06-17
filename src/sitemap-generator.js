const debug = require('debug')('Uttori.Plugin.Generator.Sitemap');
const { FileUtility } = require('uttori-utilities');

/**
 * Uttori Sitemap Generator
 *
 * @example <caption>SitemapGenerator</caption>
 * const sitemap = SitemapGenerator.generate({ ... });
 * @class
 */
class SitemapGenerator {
  /**
   * The configuration key for plugin to look for in the provided configuration.
   *
   * @type {string}
   * @returns {string} The configuration key.
   * @example <caption>SitemapGenerator.configKey</caption>
   * const config = { ...SitemapGenerator.defaultConfig(), ...context.config[SitemapGenerator.configKey] };
   * @static
   */
  static get configKey() {
    return 'uttori-plugin-generator-sitemap';
  }

  /**
   * The default configuration.
   *
   * @returns {object} The configuration.
   * @example <caption>SitemapGenerator.defaultConfig()</caption>
   * const config = { ...SitemapGenerator.defaultConfig(), ...context.config[SitemapGenerator.configKey] };
   * @static
   */
  static defaultConfig() {
    return {
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
    };
  }

  /**
   * Validates the provided configuration for required entries.
   *
   * @param {object} config - A configuration object.
   * @param {object} config.configKey - A configuration object specifically for this plugin.
   * @param {object[]} config.configKey.urls - A collection of Uttori documents.
   * @param {RegExp[]} [config.configKey.url_filters] - A collection of Regular Expression URL filters.
   * @param {string} config.configKey.base_url - The base URL (ie https://domain.tld) for all documents.
   * @param {string} config.configKey.directory - The path to the location you want the sitemap file to be writtent to.
   * @param {object} [_context] - A Uttori-like context (unused).
   * @example <caption>SitemapGenerator.validateConfig(config, _context)</caption>
   * SitemapGenerator.validateConfig({ ... });
   * @static
   */
  static validateConfig(config, _context) {
    debug('Validating config...');
    if (!config[SitemapGenerator.configKey]) {
      debug('Config Error: `sitemap` configuration key is missing.');
      throw new Error('sitemap configuration key is missing.');
    }
    if (!Array.isArray(config[SitemapGenerator.configKey].urls)) {
      debug('Config Error: `urls` should be an array of documents.');
      throw new Error('urls should be an array of documents.');
    }
    if (config[SitemapGenerator.configKey].url_filters && !Array.isArray(config[SitemapGenerator.configKey].url_filters)) {
      debug('Config Error: `url_filters` should be an array of regular expression url filters.');
      throw new Error('url_filters should be an array of regular expression url filters.');
    }
    if (!config[SitemapGenerator.configKey].base_url || typeof config[SitemapGenerator.configKey].base_url !== 'string') {
      debug('Config Error: `base_url` is required should be an string of your base URL (ie https://domain.tld).');
      throw new Error('base_url is required should be an string of your base URL (ie https://domain.tld).');
    }
    if (!config[SitemapGenerator.configKey].directory || typeof config[SitemapGenerator.configKey].directory !== 'string') {
      debug('Config Error: `directory` is required should be the path to the location you want the sitemap to be writtent to.');
      throw new Error('directory is required should be the path to the location you want the sitemap to be writtent to.');
    }
    debug('Validated config.');
  }

  /**
   * Register the plugin with a provided set of events on a provided Hook system.
   *
   * @param {object} context - A Uttori-like context.
   * @param {object} context.hooks - An event system / hook system to use.
   * @param {Function} context.hooks.on - An event registration function.
   * @param {object} context.config - A provided configuration to use.
   * @param {object} context.config.events - An object whose keys correspong to methods, and contents are events to listen for.
   * @example <caption>SitemapGenerator.register(context)</caption>
   * const context = {
   *   hooks: {
   *     on: (event, callback) => { ... },
   *   },
   *   config: {
   *     [SitemapGenerator.configKey]: {
   *       ...,
   *       events: {
   *         callback: ['document-save', 'document-delete'],
   *         validateConfig: ['validate-config'],
   *       },
   *     },
   *   },
   * };
   * SitemapGenerator.register(context);
   * @static
   */
  static register(context) {
    if (!context || !context.hooks || typeof context.hooks.on !== 'function') {
      throw new Error("Missing event dispatcher in 'context.hooks.on(event, callback)' format.");
    }
    const config = { ...SitemapGenerator.defaultConfig(), ...context.config[SitemapGenerator.configKey] };
    if (!config.events) {
      throw new Error("Missing events to listen to for in 'config.events'.");
    }
    Object.keys(config.events).forEach((method) => {
      config.events[method].forEach((event) => context.hooks.on(event, SitemapGenerator[method]));
    });
  }

  /**
   * Wrapper function for calling generating and writing the sitemap file.
   *
   * @param {object} _document - A Uttori document (unused).
   * @param {object} context - A Uttori-like context.
   * @param {object} context.config - A provided configuration to use.
   * @param {string} context.config.directory - The directory to write the sitemap to.
   * @param {string} context.config.filename - The name to use for the generated file.
   * @param {string} context.config.extension - The file extension to use for the generated file.
   * @param {object} context.hooks - An event system / hook system to use.
   * @param {Function} context.hooks.on - An event registration function.
   * @param {Function} context.hooks.fetch - An event dispatch function that returns an array of results.
   * @returns {Promise} The provided document.
   * @example <caption>SitemapGenerator.callback(_document, context)</caption>
   * const context = {
   *   config: {
   *     [SitemapGenerator.configKey]: {
   *       ...,
   *     },
   *   },
   *   hooks: {
   *     on: (event) => { ... }
   *   },
   * };
   * SitemapGenerator.callback(null, context);
   * @static
   */
  static async callback(_document, context) {
    debug('callback');
    const { directory, filename, extension } = { ...SitemapGenerator.defaultConfig(), ...context.config[SitemapGenerator.configKey] };
    const sitemap = await SitemapGenerator.generateSitemap(context);
    debug(`File: ${directory}/${filename}.${extension}`);
    FileUtility.writeFileSync(directory, filename, extension, sitemap);
    return _document;
  }

  /**
   * Generates a sitemap from the provided context.
   *
   * @param {object} context - A Uttori-like context.
   * @param {object} context.config - A provided configuration to use.
   * @param {string} context.config.base_url - The prefix for URLs in the sitemap.
   * @param {number} context.config.page_priority - The page_priority for pages.
   * @param {RegExp[]} context.config.url_filters - A collection of URL filters used to filter documents.
   * @param {object[]} context.config.urls - Additional documents to add to the sitemap.
   * @param {string} context.config.urls[].slug - The path for the current document.
   * @param {string} context.config.urls[].updateDate - The timestamp of the last update for the current document.
   * @param {string} context.config.xml_footer - The suffix for the sitemap.
   * @param {string} context.config.xml_header - The prefix for the sitemap.
   * @param {object} context.config.events - An object whose keys correspong to methods, and contents are events to listen for.
   * @param {object} context.hooks - An event system / hook system to use.
   * @param {Function} context.hooks.on - An event registration function.
   * @param {Function} context.hooks.fetch - An event dispatch function that returns an array of results.
   * @returns {Promise} The generated sitemap.
   * @example <caption>SitemapGenerator.callback(_document, context)</caption>
   * const context = {
   *   config: {
   *     [SitemapGenerator.configKey]: {
   *       ...,
   *     },
   *   },
   *   hooks: {
   *     fetch: (event, query) => { ... }
   *   },
   * };
   * SitemapGenerator.generateSitemap(context);
   * @static
   */
  static async generateSitemap(context) {
    debug('generateSitemap');
    const {
      base_url,
      page_priority,
      url_filters,
      urls,
      xml_footer,
      xml_header,
    } = { ...SitemapGenerator.defaultConfig(), ...context.config[SitemapGenerator.configKey] };

    let documents = [];
    try {
      documents = await context.hooks.fetch('storage-query', "SELECT 'slug', 'createDate', 'updateDate' FROM documents WHERE slug != '' ORDER BY updateDate DESC LIMIT 10000");
    } catch (error) {
      /* istanbul ignore next */
      debug('Error geting documents:', error);
    }

    // Add all documents to the urls array
    documents.forEach((document) => {
      urls.push({
        url: `/${document.slug}`,
        lastmod: document.updateDate ? new Date(document.updateDate).toISOString() : new Date(document.createDate).toISOString(),
        priority: page_priority,
      });
    });

    // eslint-disable-next-line unicorn/consistent-function-scoping
    let urlFilter = (input) => input;
    /* istanbul ignore else */
    if (Array.isArray(url_filters) && url_filters.length > 0) {
      urlFilter = (route) => {
        let pass = true;
        url_filters.forEach((url_filter) => {
          try {
            if (url_filter.test(route.url)) {
              pass = false;
            }
          } catch (error) {
            /* istanbul ignore next */
            debug('Sitemap Filter Error:', error, url_filter, route.url);
          }
        });
        return pass;
      };
    }

    const data = urls.reduce((accumulator, route) => {
      if (urlFilter(route)) {
        accumulator += `<url><loc>${base_url}${route.url}</loc>`;
        /* istanbul ignore else */
        if (route.lastmod) {
          accumulator += `<lastmod>${route.lastmod}</lastmod>`;
        }
        /* istanbul ignore else */
        if (route.priority) {
          accumulator += `<priority>${route.priority}</priority>`;
        }
        /* istanbul ignore next */
        if (route.changefreq) {
          accumulator += `<changefreq>${route.changefreq}</changefreq>`;
        }
        accumulator += '</url>';
      }
      return accumulator;
    }, '');

    return `${xml_header}${data}${xml_footer}`;
  }
}

module.exports = SitemapGenerator;
