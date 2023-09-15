interface EventInfo {
    path: string;
    title: string;
    time: string;
    location: string | undefined;
    description: string;
}

const events: EventInfo[] = [
    // {
    //     path: "/event?eventId=1e5d2mc7v20ouulosv7rf4208h_20230830T163000Z",
    //     title: "Rainbow Minds - LGBTQ+ social cafe",
    //     time: "Time: 30th August 2023 17:30 - 19:30",
    //     location: "Location: Sheffield Mind, 110 Sharrow Ln, Highfield, Sheffield S11 8AL, UK",
    //     description: "Our LGBTQ+ Café offers a safe and supportive space to people from the LGBTQ+ community, who are isolated, lonely, have mental health issues, or who want to meet new people."
    // },
    // {
    //     path: "/event?eventId=472plpiaifad1ap2156t6k2tks_20230902T110000Z",
    //     title: "Trans Active Swim",
    //     time: "Time: 2nd September 2023 12:00 - 13:00",
    //     location: "Location: Heeley Pool and Gym, Broadfield Rd, Sheffield S8 0XQ, UK",
    //     description: "Swim sessions run by Trans Active for anyone under the trans+ umbrella.Book on here: https://bookwhen.com/transactiveFind Trans Active on instagram: @trans_active."
    // },
    // {
    //     path: "/event?eventId=65gdt89dv10oi9a0a7drlle1cn_20230914T140000Z",
    //     title: "Sheffield Voices LGBTQ+ Cafe",
    //     time: "Time: 14th September 2023 15:00 - 17:00",
    //     location: "Location: TBC - email to check",
    //     description: "Disability Sheffield and Sheffield voices have launched a new social cafe for members of the LGBTQ+ community who also identify as being autistic, nerodiverse or disabled."
    // },
    // {
    //     path: "/event?eventId=785ak13bo4g6hsj5e12uv4si7f_20230920T183000Z",
    //     title: "Out Loud rehearsal",
    //     time: "Time: 20th September 2023 19:30 - 21:30",
    //     location: undefined,
    //     description: "Sheffields LGBT+ Choir! find out more here: https://www.outaloud.org.uk/join_us"
    // },
];

describe(`/event`, () => {
    events.forEach(event => {
        context(`Testing "${event.title}"`, () => {
            beforeEach(() => {
                cy.visit(event.path);
            });

            it(`should load details correctly`, () => {
                cy.contains(event.title).should('exist');
                // Removed time test as it is dependent on the browser's current time zone and I don't know how to mock that yet.
                //cy.contains(event.time).should('exist');
                if (event.location != undefined) {
                    cy.contains(event.location).should('exist');
                } else {
                    cy.contains("Location:").should('not.exist');
                }
                cy.contains(event.description).should('exist');
            });

            it(`should copy event link to clipboard when I click share`, () => {
                cy.get('[data-testid^=share-button-]').click();

                cy.window().then(async(win) => {
                    win.navigator.clipboard.readText().then((text) => {
                        expect(text).to.eq(`http://localhost:3000/${event.path}`);
                    });
                });
            });
        });
    });
});