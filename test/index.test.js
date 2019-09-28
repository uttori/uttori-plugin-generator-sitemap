/* eslint-disable security/detect-non-literal-fs-filename */
const test = require('ava');
const { FileUtility } = require('uttori-utilities');
const SitemapGenerator = require('../src');

const config = SitemapGenerator.defaultConfig();
const context = {
  config: {
    sitemap: {
      ...config,
      base_url: 'https://domain.tld',
      directory: './',
    },
  },
  storageProvider: {
    getQuery: (_query) => [
      {
        updateDate: new Date('2019-04-20').toISOString(),
        createDate: new Date('2019-04-20').toISOString(),
        slug: 'good-title',
      },
      {
        updateDate: new Date('2019-04-21').toISOString(),
        createDate: new Date('2019-04-21').toISOString(),
        slug: 'fake-title',
      },
    ],
  },
};

test('SitemapGenerator.register(context): can register', (t) => {
  t.notThrows(() => {
    SitemapGenerator.register({ hooks: { on: () => {} } });
  });
});

test('SitemapGenerator.register(context): errors without event dispatcher', (t) => {
  t.throws(() => {
    SitemapGenerator.register({ hooks: {} });
  }, 'Missing event dispatcher in \'context.hooks.on(event, callback)\' format.');
});

test('SitemapGenerator.defaultConfig(): can return a default config', (t) => {
  t.notThrows(SitemapGenerator.defaultConfig);
});

test('SitemapGenerator.generateSitemap(_document, context): generates a valid sitemap', async (t) => {
  t.plan(1);
  const output = await SitemapGenerator.generateSitemap({ ...context, config: { ...context.config, urls: [] } });
  t.is(output, '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"><url><loc>https://domain.tld/good-title</loc><lastmod>2019-04-20T00:00:00.000Z</lastmod><priority>0.80</priority></url><url><loc>https://domain.tld/fake-title</loc><lastmod>2019-04-21T00:00:00.000Z</lastmod><priority>0.80</priority></url></urlset>');
});

test('SitemapGenerator.generateSitemap(_document, context): generates a valid sitemap with no documents', async (t) => {
  t.plan(1);
  const output = await SitemapGenerator.generateSitemap({ storageProvider: { getQuery: () => [] }, config: { ...context.config, sitemap: { ...context.config.sitemap, urls: [] } } });
  t.is(output, '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"></urlset>');
});

test('SitemapGenerator.generateSitemap(_document, uttori): filters out urls with a filter', async (t) => {
  t.plan(1);
  const output = await SitemapGenerator.generateSitemap({ ...context, config: { ...context.config, sitemap: { ...context.config.sitemap, urls: [], url_filters: [/fake-title$/i] } } });
  t.is(output, '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"><url><loc>https://domain.tld/good-title</loc><lastmod>2019-04-20T00:00:00.000Z</lastmod><priority>0.80</priority></url></urlset>');
});

test('SitemapGenerator.validateConfig(config, _uttori): throws when sitemaps key is missing', (t) => {
  const error = t.throws(() => {
    SitemapGenerator.validateConfig({});
  }, Error);
  t.is(error.message, 'sitemap configuration key is missing.');
});

test('SitemapGenerator.validateConfig(config, _uttori): throws when urls is not an array', (t) => {
  const error = t.throws(() => {
    SitemapGenerator.validateConfig({
      sitemap: {
        urls: {},
        url_filters: [],
      },
    });
  }, Error);
  t.is(error.message, 'urls should be an array of documents.');
});

test('SitemapGenerator.validateConfig(config, _uttori): throws when url_filters is not an array', (t) => {
  const error = t.throws(() => {
    SitemapGenerator.validateConfig({
      sitemap: {
        urls: [],
        url_filters: {},
      },
    });
  }, Error);
  t.is(error.message, 'url_filters should be an array of regular expression url filters.');
});

test('SitemapGenerator.validateConfig(config, _uttori): throws when base_url is missing', (t) => {
  const error = t.throws(() => {
    SitemapGenerator.validateConfig({
      sitemap: {
        urls: [],
        url_filters: [],
      },
    });
  }, Error);
  t.is(error.message, 'base_url is required should be an string of your base URL (ie https://domain.tld).');
});

test('SitemapGenerator.validateConfig(config, _uttori): throws when base_url is not a string', (t) => {
  const error = t.throws(() => {
    SitemapGenerator.validateConfig({
      sitemap: {
        urls: [],
        url_filters: [],
        base_url: null,
      },
    });
  }, Error);
  t.is(error.message, 'base_url is required should be an string of your base URL (ie https://domain.tld).');
});

test('SitemapGenerator.validateConfig(config, _uttori): throws when directory is missing', (t) => {
  const error = t.throws(() => {
    SitemapGenerator.validateConfig({
      sitemap: {
        urls: [],
        url_filters: [],
        base_url: 'https://domain.tld',
      },
    });
  }, Error);
  t.is(error.message, 'directory is required should be the path to the location you want the sitemap to be writtent to.');
});

test('SitemapGenerator.validateConfig(config, _uttori): throws when directory is not a string', (t) => {
  const error = t.throws(() => {
    SitemapGenerator.validateConfig({
      sitemap: {
        urls: [],
        url_filters: [],
        base_url: 'https://domain.tld',
        directory: null,
      },
    });
  }, Error);
  t.is(error.message, 'directory is required should be the path to the location you want the sitemap to be writtent to.');
});

test('SitemapGenerator.validateConfig(config, _uttori): can validate', (t) => {
  t.notThrows(() => {
    SitemapGenerator.validateConfig({
      sitemap: {
        urls: [],
        url_filters: [],
        base_url: 'https://domain.tld',
        directory: './',
      },
    });
  });
});

test('SitemapGenerator.callback(_document, uttori): writes properly generated sitemap to desired location', async (t) => {
  await SitemapGenerator.callback(null, { ...context, config: { ...context.config, urls: [] } });
  const output = await FileUtility.readFile('./', 'sitemap', 'xml');
  await FileUtility.deleteFile('./', 'sitemap', 'xml');
  t.is(output.length, 758);
});
