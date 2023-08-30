// I would like to change these test to use the data over in cypress/fixtures/stubbed-contributors.json but for now this will do.

describe(`contributors`, () => {
    const contributorPagePath = "/contributors";

    beforeEach(() => {
        cy.visit(contributorPagePath);
    });

    it(`should show page title`, () => {
        cy.get("main").contains("Project Contributors");
    });

    it(`should show Rowan Garwood`, () => {
        const details = ["Rowan Garwood", "They/Them", "Calendar Organiser & Maintainer"];
        details.forEach((detail) => {
            cy.get("#contributor-0").contains(detail);
        })
    });

    it(`should show Sammy`, () => {
        const details = ["Sammy", "They/Them", "Website Developer & Maintainer"];
        details.forEach((detail) => {
            cy.get("#contributor-1").contains(detail);
        })
    });

    it(`should have links to Sammy's Email, GitHub and Website`, () => {
        const badgeInfo = [["mail-badge", "mailto:kent_sam@outlook.com"], ["github-badge", "https://github.com/CanopusFalling"], ["website-badge", "https://canopusfalling.co.uk"]];
        badgeInfo.forEach((badge) => {
            cy.get(`.${badge[0]}`).should("have.attr", "href", badge[1]);
        })
    });
});
