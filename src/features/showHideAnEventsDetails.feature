Feature: User should be able to show/hide an event's details

  Scenario: An element is collapsed by default
    Given an event app
    When a user opens the app
    Then event details are collapsed by default

  Scenario: User can expand an event to see its details
    Given a user selects an event
    When a user clicks on the event's show details button
    Then the event's details are expanded on the page for the user to read

  Scenario: User can collapse an event to hide the event's details
    Given an event's details are expanded
    When a user clicks the event's hide details button
    Then the event's details are collapsed