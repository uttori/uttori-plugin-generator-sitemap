const debug = require('debug')('Uttori.Plugin.SitemapGenerator');
const R = require('ramda');
const fs = require('fs-extra');

class SitemapGenerator {
  static register(uttori) {
    return {
      'save': SitemapGenerator.callback, // UttoriWiki
      'delete': SitemapGenerator.callback, // UttoriWiki
      'validate-config': SitemapGenerator.validateConfig, // UttoriWiki
    };
  }

  static validateConfig(config, _uttori) {
    debug('Validating config...');
    if (!Array.isArray(config.sitemap)) {
      debug('Config Error: `sitemap` should be an array.');
      throw new Error('sitemap should be an array.');
    }
    if (config.sitemap_url_filter && !Array.isArray(config.sitemap_url_filter)) {
      debug('Config Error: `sitemap_url_filter` should be an array.');
      throw new Error('sitemap_url_filter should be an array.');
    }
    debug('Validated config.');
  }

  static async callback(_document, uttori) {
    debug('Generating Sitemap');
    const documents = await uttori.getDocuments(['slug', 'createDate', 'updateDate']);
    const {
      sitemap,
      sitemap_url,
      sitemap_url_filter,
      sitemap_page_priority,
      sitemap_header,
      sitemap_footer,
      public_dir,
      sitemap_filename,
    } = uttori.config;

    // Add all documents to the sitemap
    documents.forEach((document) => {
      /* istanbul ignore next */
      let lastmod = document.updateDate ? new Date(document.updateDate).toISOString() : '';
      /* istanbul ignore next */
      if (!lastmod) {
        lastmod = document.createDate ? new Date(document.createDate).toISOString() : '';
      }
      sitemap.push({
        url: `/${document.slug}`,
        lastmod,
        priority: sitemap_page_priority,
      });
    });

    let urlFilter = R.identity;
    /* istanbul ignore else */
    if (Array.isArray(sitemap_url_filter) && sitemap_url_filter.length > 0) {
      urlFilter = (route) => {
        let pass = true;
        sitemap_url_filter.forEach((url_filter) => {
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

    const data = sitemap.reduce((accumulator, route) => {
      if (urlFilter(route)) {
        accumulator += `<url><loc>${sitemap_url}${route.url}</loc>`;
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

    const output = `${sitemap_header}${data}${sitemap_footer}`;
    try {
      await fs.outputFile(`${public_dir}/${sitemap_filename}`, output);
    } catch (error) {
      /* istanbul ignore next */
      debug('Error Generating Sitemap:', error);
    }

    return input;
  }
}

module.exports = SitemapGenerator;
