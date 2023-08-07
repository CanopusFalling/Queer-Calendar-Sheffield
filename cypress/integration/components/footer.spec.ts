describe('Footer', () => {
    const pathsToTest = ['/', '/contributors'];

    const footerSelector = `footer`;

    const contributorPagePath = `/contributors`;

    pathsToTest.forEach((path) => {
        context(`Testing headder on ${path}`, () => {
            beforeEach(() => {
                cy.visit(path);
            });

            it(`should show text about contributors`, () => {
                cy.get(footerSelector).contains(`This calendar is built and maintained by our contributors. You can also get involved below.`);
            })

            it(`should navigate to the contributor page when 'our  contributors' is clicked`, () => {
                cy.get(footerSelector).contains(`our contributors`).click();
                cy.location(`pathname`).should('eq', contributorPagePath);
            })

            context(`desktop view`, () => {
            });

            context(`mobile view`, () => {
            });
        });
    });
});
