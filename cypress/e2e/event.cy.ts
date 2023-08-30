interface EventInfo {
    path: string;
    title: string;
    time: string;
    location: string;
    description: string;
}

const events: EventInfo[] = [
    {
        path: "/event?eventId=1e5d2mc7v20ouulosv7rf4208h_20230830T163000Z",
        title: "Rainbow Minds - LGBTQ+ social cafe",
        time: "30th August 2023 17:30 - 19:30",
        location: "Location: 110 Sharrow Ln, Highfield, Sheffield S11 8AL, UK",
        description: "Held at the Wellbeing centre by sheffield mind. This LGBTQ+ social cafe is a weekly, informal support group, providing a safe space for people to meet, to talk to share and to support one another. Dan and his team will be on hand to make you feel welcome so why not come on over to our place and say hello.Email info@sheffieldmind.co.uk for more info"
    }
];

describe(`/event`, () => {
    events.forEach(event => {
        it(`should load details ${event.title} correctly`, () => {
            cy.visit(event.path)
            cy.contains(event.title).should('exist');
            cy.contains(event.time, { timeout: 60000 }).should('exist');
            cy.contains(event.location).should('exist');
            cy.contains(event.description).should('exist');
        });
    });
});