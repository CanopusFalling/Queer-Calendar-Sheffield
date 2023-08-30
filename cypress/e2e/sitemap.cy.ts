import * as xml2js from 'xml2js';
const parser = new xml2js.Parser();

describe('/sitemap', () => {
    it('should contain only resolvable URLs', () => {
        cy.request('/sitemap.xml').then(response => {
            parser.parseString(response.body, (err, result) => {
                if (err) {
                    throw (err);
                } else {
                    const urls = result.urlset.url.map((urlObj: any) => urlObj.loc[0]);
                    // Extract paths from URLs
                    const paths:string[] = urls.map((url: string) => new URL(url).pathname);

                    // Test each path for a 404 error
                    paths.forEach(path => {
                        cy.request({
                            url: path,
                            failOnStatusCode: false
                        }).then(response => {
                            expect(response.status).to.equal(200, `${path} is returning 200 status code`);
                        });
                    });
                }
            });
        });
    });
});
