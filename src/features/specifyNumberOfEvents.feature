Feature: A user can specify number of events to display on page

  Scenario: When a user has not specified a number of events to view, 32 events will be rendered by default
    Given a user has opened the app
    When a user does not specify a number of events to view
    Then 32 events will be rendered by default

  Scenario: A user can choose how many events to view on page
    Given a user is on the main page
    When a user types a number into an input
    Then the page will display the number specified by user