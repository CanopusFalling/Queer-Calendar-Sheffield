import React from "react";
import { Event } from "./Event";
import EventList from "./eventList";

describe("<EventList />", () => {
  const generateEvents = (count: number) => {
    const events: Event[] = [];

    for (let i = 1; i <= count; i++) {
      const testEvent: Event = new Event(
        `test-${i}`,
        `test-iCalUID-${i}`,
        `Test Event Summary ${i}`,
        "Test Event Description",
        "Test Event Location",
        new Date("2023-01-01T10:00:00"),
        new Date("2023-01-01T12:00:00"),
        false,
        new Date(),
      );

      events.push(testEvent);
    }

    return events;
  };

  it("renders a single event correctly", () => {
    cy.mount(<EventList events={generateEvents(1)} />);
    cy.contains("Test Event Summary 1").should("exist");
  });

  it("renders 2 different events correctly", () => {
    cy.mount(<EventList events={generateEvents(2)} />);
    cy.contains("Test Event Summary 1").should("exist");
    cy.contains("Test Event Summary 2").should("exist");
  });

  it("renders 100 events correctly", () => {
    cy.mount(<EventList events={generateEvents(100)} />);
    for (let i = 1; i <= 100; i++) {
      cy.contains(`Test Event Summary ${i}`).should("exist");
    }
  });
});
