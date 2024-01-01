import React from "react";
import { Event } from "./Event";
import EventCard from "./eventCard";

const assertDefaultEventDetails = () => {
  cy.contains("Test Event Summary").should("exist");
  cy.contains("Time: 1st January 2023 10:00 - 12:00").should("exist");
  cy.contains("Location: Test Event Location").should("exist");
  cy.contains("Test Event Description").should("exist");

  cy.contains("Add To Calendar").should("exist");
  cy.contains("Share").should("exist");
};

describe("<EventCard />", () => {
  const testEvent: Event = new Event(
    "test-id",
    "test-iCalUID",
    "Test Event Summary",
    "Test Event Description",
    "Test Event Location",
    new Date("2023-01-01T10:00:00"),
    new Date("2023-01-01T12:00:00"),
    false,
    new Date(),
  );

  it("renders", () => {
    cy.mount(<EventCard event={testEvent} />);
    cy.get('[data-testid="event-card-test-id"]').should("exist");
  });

  it("displays event details correctly", () => {
    cy.mount(<EventCard event={testEvent} />);
    assertDefaultEventDetails();
  });

  it("displays view details button by default", () => {
    cy.mount(<EventCard event={testEvent} />);
    cy.contains("View Details").should("exist");
  });

  it("displays view details button when linkEvent prop is set to true", () => {
    cy.mount(<EventCard event={testEvent} linkEvent={true} />);
    assertDefaultEventDetails();
    cy.contains("View Details").should("exist");
  });

  it("does not display view details button when linkEvent prop is set to false", () => {
    cy.mount(<EventCard event={testEvent} linkEvent={false} />);
    assertDefaultEventDetails();
    cy.contains("View Details").should("not.exist");
  });

  it("displays full day event time correctly", () => {
    const fullDayEvent: Event = new Event(
      "test-id",
      "test-iCalUID",
      "Full Day Event",
      "Event Description",
      "Event Location",
      new Date("2023-01-01T00:00:00"),
      new Date("2023-01-02T00:00:00"),
      true,
      new Date(),
    );

    cy.mount(<EventCard event={fullDayEvent} linkEvent={true} />);
    cy.contains("Time: 1st January 2023").should("exist");
    cy.contains("- 2nd January 2023").should("not.exist");
  });

  it("does not display a location heading if no location is set", () => {
    const eventWithNoLocation: Event = new Event(
      "test-id",
      "test-iCalUID",
      "Event with No Location",
      "Event Description",
      "",
      new Date("2023-01-01T10:00:00"),
      new Date("2023-01-01T12:00:00"),
      false,
      new Date(),
    );
    cy.mount(<EventCard event={eventWithNoLocation} linkEvent={true} />);
    cy.contains("Location:").should("not.exist");
  });

  it("does not display a description div if no description is set", () => {
    const eventWithNoLocation: Event = new Event(
      "test-id",
      "test-iCalUID",
      "Event with No Location",
      "",
      "Event Location",
      new Date("2023-01-01T10:00:00"),
      new Date("2023-01-01T12:00:00"),
      false,
      new Date(),
    );
    cy.mount(<EventCard event={eventWithNoLocation} linkEvent={true} />);
    cy.get(".mb-4").should("not.exist");
  });
});
