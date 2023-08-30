import * as xml2js from 'xml2js';
const parser = new xml2js.Parser();

describe('/sitemap', () => {
    let sitemap;
    let urls:string[]; // Declare a variable to store the URLs

    before(() => {
        // Fetch and parse the sitemap URLs before the tests run
        cy.request('/sitemap.xml').then(response => {
            parser.parseString(response.body, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    sitemap = result;
                    urls = result.urlset.url.map((urlObj: any) => urlObj.loc[0]);
                }
            });
        });
    });

    it('should contain only resolvable URLs', () => {
        const paths:string[] = urls.map((url: string) => new URL(url).pathname);

        paths.forEach(path => {
            cy.request({
                url: path,
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.equal(200, `${path} is returning 200 status code`);
            });
        });
    });

    it(`should contain only HTTPS absolute URLs`, () => {
        urls.forEach(url => {
            expect(url.startsWith('https')).to.be.true;
        });
    });

    it(`should contain the static path URLs`, () => {
        const paths: string[] = urls.map((url: string) => new URL(url).pathname);
        const staticPaths = ["/", "/contributors"];
        
        staticPaths.forEach(staticPath => {
            expect(paths).to.include(staticPath);
        });
    });

    it('should not contain repeated URLs', () => {
        const uniqueUrls = new Set(urls); // Use a Set to keep track of unique URLs
        expect(uniqueUrls.size).to.equal(urls.length, 'There are repeated URLs in the sitemap');
    });
});
