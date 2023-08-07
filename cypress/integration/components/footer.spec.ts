describe('Footer', () => {
    const pathsToTest = ['/', '/contributors'];

    const footerSelector = `footer`;

    const contributorPagePath = `/contributors`;
    const contactEmail = "queercalendarsheffield@gmail.com";
    const googleFormLink = "https://forms.gle/KE4iZaxnhtfw4RCF7";
    const projectGithubLink = "https://github.com/CanopusFalling/Queer-Calendar-Sheffield";

    pathsToTest.forEach((path) => {
        context(`Testing on ${path}`, () => {
            before(() => {
                cy.visit(path);
            });

            it(`should show text about contributors`, () => {
                cy.get(footerSelector).contains(`This calendar is built and maintained by our contributors. You can also get involved below.`);
            });

            it(`should navigate to the contributor page when 'our  contributors' is clicked`, () => {
                cy.get(footerSelector).contains(`our contributors`).click();
                cy.location(`pathname`).should('eq', contributorPagePath);
            });

            it(`should contain an email link`, () => {
                cy.get(footerSelector).contains(`Email Us`).should('have.attr', 'href', `mailto:${contactEmail}`);
            });

            it(`should contain a link to the google form for adding an event`, () => {
                cy.get(footerSelector).contains(`Add An Event`).should('have.attr', 'href', googleFormLink);
            });

            it(`should contain a link to the github`, () => {
                cy.get(footerSelector).contains(`View Project On GitHub`).should('have.attr', 'href', projectGithubLink);
            });

            it(`should contain a link to the project contributors`, () => {
                cy.get(footerSelector).contains(`Project Contributors`).click();
                cy.location(`pathname`).should('eq', contributorPagePath);
            });
        });
    });
});
