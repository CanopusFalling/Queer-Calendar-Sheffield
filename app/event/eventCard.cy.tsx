import React from "react";
import { Event } from "./Event";
import EventCard from "./eventCard";

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
    // see: https://on.cypress.io/mounting-react
    cy.mount(<EventCard event={testEvent} linkEvent={true} />);
  });
});
