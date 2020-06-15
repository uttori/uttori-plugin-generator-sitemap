/**
 * Uttori Sitemap Generator
 * @example
 * <caption>SitemapGenerator</caption>
 * const sitemap = SitemapGenerator.generate({ ... });
 */
declare class SitemapGenerator {
    /**
     * The configuration key for plugin to look for in the provided configuration.
     * @example
     * <caption>SitemapGenerator.configKey</caption>
     * const config = { ...SitemapGenerator.defaultConfig(), ...context.config[SitemapGenerator.configKey] };
     */
    static configKey: string;
    /**
     * The default configuration.
     * @example
     * <caption>SitemapGenerator.defaultConfig()</caption>
     * const config = { ...SitemapGenerator.defaultConfig(), ...context.config[SitemapGenerator.configKey] };
     * @returns The configuration.
     */
    static defaultConfig(): any;
    /**
     * Validates the provided configuration for required entries.
     * @example
     * <caption>SitemapGenerator.validateConfig(config, _context)</caption>
     * SitemapGenerator.validateConfig({ ... });
     * @param config - A configuration object.
     * @param config.configKey - A configuration object specifically for this plugin.
     * @param config.configKey.urls - A collection of Uttori documents.
     * @param [config.configKey.url_filters] - A collection of Regular Expression URL filters.
     * @param config.configKey.base_url - The base URL (ie https://domain.tld) for all documents.
     * @param config.configKey.directory - The path to the location you want the sitemap file to be writtent to.
     * @param [_context] - A Uttori-like context (unused).
     */
    static validateConfig(config: {
        configKey: {
            urls: object[];
            url_filters?: RegExp[];
            base_url: string;
            directory: string;
        };
    }, _context?: any): void;
    /**
     * Register the plugin with a provided set of events on a provided Hook system.
     * @example
     * <caption>SitemapGenerator.register(context)</caption>
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
     * @param context - A Uttori-like context.
     * @param context.hooks - An event system / hook system to use.
     * @param context.hooks.on - An event registration function.
     * @param context.config - A provided configuration to use.
     * @param context.config.events - An object whose keys correspong to methods, and contents are events to listen for.
     */
    static register(context: {
        hooks: {
            on: (...params: any[]) => any;
        };
        config: {
            events: any;
        };
    }): void;
    /**
     * Wrapper function for calling generating and writing the sitemap file.
     * @example
     * <caption>SitemapGenerator.callback(_document, context)</caption>
     * const context = {
     *   config: {
     *     [SitemapGenerator.configKey]: {
     *       ...,
     *     },
     *   },
     *   storageProvider: {
     *     getQuery: (query) => { ... }
     *   },
     * };
     * SitemapGenerator.callback(null, context);
     * @param _document - A Uttori document (unused).
     * @param context - A Uttori-like context.
     * @param context.config - A provided configuration to use.
     * @param context.config.directory - The directory to write the sitemap to.
     * @param context.config.filename - The name to use for the generated file.
     * @param context.config.extension - The file extension to use for the generated file.
     * @returns The provided document.
     */
    static callback(_document: any, context: {
        config: {
            directory: string;
            filename: string;
            extension: string;
        };
    }): Promise;
    /**
     * Generates a sitemap from the provided context.
     * @example
     * <caption>SitemapGenerator.callback(_document, context)</caption>
     * const context = {
     *   config: {
     *     [SitemapGenerator.configKey]: {
     *       ...,
     *     },
     *   },
     *   storageProvider: {
     *     getQuery: (query) => { ... }
     *   },
     * };
     * SitemapGenerator.generateSitemap(context);
     * @param context - A Uttori-like context.
     * @param context.config - A provided configuration to use.
     * @param context.config.base_url - The prefix for URLs in the sitemap.
     * @param context.config.page_priority - The page_priority for pages.
     * @param context.config.url_filters - A collection of URL filters used to filter documents.
     * @param context.config.urls - Additional documents to add to the sitemap.
     * @param context.config.urls[].slug - The path for the current document.
     * @param context.config.urls[].updateDate - The timestamp of the last update for the current document.
     * @param context.config.xml_footer - The suffix for the sitemap.
     * @param context.config.xml_header - The prefix for the sitemap.
     * @param context.config.events - An object whose keys correspong to methods, and contents are events to listen for.
     * @param context.hooks - An event system / hook system to use.
     * @param context.hooks.on - An event registration function.
     * @param context.hooks.fetch - An event dispatch function that returns an array of results.
     * @returns The generated sitemap.
     */
    static generateSitemap(context: {
        config: {
            base_url: string;
            page_priority: number;
            url_filters: RegExp[];
            urls: {
                slug: string;
                updateDate: string;
            }[];
            xml_footer: string;
            xml_header: string;
            events: any;
        };
        hooks: {
            on: (...params: any[]) => any;
            fetch: (...params: any[]) => any;
        };
    }): Promise;
}

