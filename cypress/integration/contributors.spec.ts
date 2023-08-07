describe(`contributors`, () => {
    const contributorPagePath = "/contributors";

    before(() => {
        cy.fixture("stubbed-contributors.json").then((stubbedData) => {
            cy.stub(window, "contributorsData").as("contributorsDataStub").returns(stubbedData);
        });
        
        cy.visit(contributorPagePath);

    });

    it(`should show page title`, () => {
        cy.visit(contributorPagePath);
        cy.get("main").contains("Project Contributors");
    });
})