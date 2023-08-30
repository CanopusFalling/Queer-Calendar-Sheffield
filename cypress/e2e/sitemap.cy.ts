import * as xml2js from 'xml2js';
const parser = new xml2js.Parser();

describe('/sitemap', () => {
    let sitemap;
    let urls: string[]; // Declare a variable to store the URLs
    let paths: string[];

    before(() => {
        // Fetch and parse the sitemap URLs before the tests run
        cy.request('/sitemap.xml').then(response => {
            parser.parseString(response.body, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    sitemap = result;
                    urls = result.urlset.url.map((urlObj: any) => urlObj.loc[0]);
                    paths = urls.map((url: string) => {
                        const urlObject = new URL(url);
                        return urlObject.pathname + urlObject.search;
                    });
                }
            });
        });
    });

    it('should contain only resolvable URLs', () => {
        let count = 0;

        paths.forEach(path => {
            cy.request({
                url: path,
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.equal(200, `${path} is returning 200 status code`);
                count++;
            });
        });

        console.log(count);
    });

    it(`should contain only HTTPS absolute URLs`, () => {
        urls.forEach(url => {
            expect(url.startsWith('https')).to.be.true;
        });
    });

    it(`should contain the static path URLs`, () => {
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
