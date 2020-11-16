declare module "sitemap-generator" {
    export = SitemapGenerator;
    class SitemapGenerator {
        static get configKey(): string;
        static defaultConfig(): object;
        static validateConfig(config: {
            configKey: {
                urls: object[];
                url_filters: RegExp[];
                base_url: string;
                directory: string;
            };
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
                directory: string;
                filename: string;
                extension: string;
            };
            hooks: {
                on: Function;
                fetch: Function;
            };
        }): Promise<any>;
        static generateSitemap(context: {
            config: {
                base_url: string;
                page_priority: number;
                url_filters: RegExp[];
                urls: {
                    slug: string;
                    updateDate: string;
                };
                xml_footer: string;
                xml_header: string;
                events: object;
            };
            hooks: {
                on: Function;
                fetch: Function;
            };
        }): Promise<any>;
    }
}
declare module "index" {
    export const SitemapGenerator: typeof import("sitemap-generator");
}
