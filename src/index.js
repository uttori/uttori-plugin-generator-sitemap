const debug = require('debug')('Uttori.Plugin.Generator.Sitemap');
const R = require('ramda');
const { FileUtility } = require('uttori-utilities');

class SitemapGenerator {
  static register(context) {
    if (!context || !context.hooks || typeof context.hooks.on !== 'function') {
      throw new Error("Missing event dispatcher in 'context.hooks.on(event, callback)' format.");
    }
    context.hooks.on('document-delete', SitemapGenerator.callback); // UttoriWiki
    context.hooks.on('document-save', SitemapGenerator.callback); // UttoriWiki
    context.hooks.on('validate-config', SitemapGenerator.validateConfig); // UttoriWiki
  }

  static defaultConfig() {
    return {
      // Sitemap URL (ie https://sfc.fm)
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

  static validateConfig(config, _uttori) {
    debug('Validating config...');
    if (!config.sitemap) {
      debug('Config Error: `sitemap` configuration key is missing.');
      throw new Error('sitemap configuration key is missing.');
    }
    if (!Array.isArray(config.sitemap.urls)) {
      debug('Config Error: `urls` should be an array of documents.');
      throw new Error('urls should be an array of documents.');
    }
    if (config.sitemap.url_filters && !Array.isArray(config.sitemap.url_filters)) {
      debug('Config Error: `url_filters` should be an array of regular expression url filters.');
      throw new Error('url_filters should be an array of regular expression url filters.');
    }
    if (!config.sitemap.base_url || typeof config.sitemap.base_url !== 'string') {
      debug('Config Error: `base_url` is required should be an string of your base URL (ie https://domain.tld).');
      throw new Error('base_url is required should be an string of your base URL (ie https://domain.tld).');
    }
    if (!config.sitemap.directory || typeof config.sitemap.directory !== 'string') {
      debug('Config Error: `directory` is required should be the path to the location you want the sitemap to be writtent to.');
      throw new Error('directory is required should be the path to the location you want the sitemap to be writtent to.');
    }

    debug('Validated config.');
  }

  static async callback(_document, uttori) {
    const defaultConfig = SitemapGenerator.defaultConfig();
    const directory = uttori.config.sitemap.directory || defaultConfig.directory;
    const filename = uttori.config.sitemap.filename || defaultConfig.filename;
    const extension = uttori.config.sitemap.extension || defaultConfig.extension;

    const sitemap = await SitemapGenerator.generateSitemap(uttori);
    FileUtility.writeFileSync(directory, filename, extension, sitemap);
    return _document;
  }

  static async generateSitemap(uttori) {
    debug('Generating Sitemap', uttori.config.sitemap);
    const defaultConfig = SitemapGenerator.defaultConfig();
    const urls = uttori.config.sitemap.urls || defaultConfig.urls;
    const base_url = uttori.config.sitemap.base_url || defaultConfig.base_url;
    const url_filters = uttori.config.sitemap.url_filters || defaultConfig.url_filters;
    const page_priority = uttori.config.sitemap.page_priority || defaultConfig.page_priority;
    const xml_header = uttori.config.sitemap.xml_header || defaultConfig.xml_header;
    const xml_footer = uttori.config.sitemap.xml_footer || defaultConfig.xml_footer;

    let documents = [];
    try {
      documents = await uttori.storageProvider.getQuery("SELECT 'slug', 'createDate', 'updateDate' FROM documents WHERE slug != '' ORDER BY updateDate DESC LIMIT 10000");
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

    let urlFilter = R.identity;
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
