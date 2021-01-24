declare module "sitemap-generator" {
    export = SitemapGenerator;
    class SitemapGenerator {
        static get configKey(): string;
        static defaultConfig(): SitemapGeneratorConfig;
        static validateConfig(config: {
            configKey: SitemapGeneratorConfig;
        }, _context?: object): void;
        static register(context: {
            hooks: {
                on: Function;
            };
            config: {
                events: object;
            };
        }): void;
        static callback(_document: object, context: {
            config: {
                configKey: SitemapGeneratorConfig;
            };
            hooks: {
                on: Function;
                fetch: Function;
            };
        }): Promise<any>;
        static generateSitemap(context: {
            config: {
                configKey: SitemapGeneratorConfig;
                events: object;
            };
            hooks: {
                on: Function;
                fetch: Function;
            };
        }): Promise<any>;
    }
    namespace SitemapGenerator {
        export { SitemapGeneratorConfig };
    }
    type SitemapGeneratorConfig = {
        urls: object[];
        url_filters?: RegExp[];
        base_url: string;
        directory: string;
        filename?: string;
        extension?: string;
        page_priority?: string;
        xml_header?: string;
        xml_footer?: string;
    };
}
declare module "index" {
    export const SitemapGenerator: typeof import("sitemap-generator");
}
