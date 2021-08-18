# meet

OBJECTIVE OF MEET APP
To build a serverless, progressive web application (PWA) with React using a test-driven
development (TDD) technique. The application uses the Google Calendar API to fetch
upcoming events.

User Stories and Scenarios for a Selection of App Features

FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS 
As a user I should be able to click on an event to expand the event description to read the event details.

•	Scenario 1: An event element is collapsed by default

o	Given an event element

o	When a user opens the page

o	Then the event element only shows the event title

•	Scenario 2: User can expand an event to see its details

o	Given a selected event

o	When a user clicks on the event element

o	Then the event description is expanded on the page for the user to read

•	Scenario 3: User can collapse an event to hide its details

o	Given an event element is expanded showing details

o	When a user clicks to minimize

o	Then the description is hidden leaving only the event element on the page


FEATURE 3: SPECIFY NUMBER OF EVENTS

As a user I should be able to type a specified number into an input so that the specified number of events
 is displayed.

•	Scenario 1: When a user hasn’t specified a number, 32 is the default number

o	Given the meet app is open

o	When a user has not typed a specific number into the input

o	Then a list of 32 upcoming events will be displayed by default

•	Scenario 2: User can change the number of events they want to see

o	Given a user is interacting with the meet app

o	When the user types a specific number into the input

o	Then the specified number of events will be displayed for the user to see


FEATURE 4: USE THE APP WHEN OFFLINE

As a user I should be able to use the meet app offline so that when an internet connection is not 

available, I can still access a list of events.

•	Scenario 1: Show cached data when there is no internet connection

o	Given there is no internet connection

o	When a user opens the meet app

o	Then a list of events will still be displayed

•	Scenario 2: Show error when user changes the settings (city, time range)

o	Given then app is offline

o	When a user changes the settings

o	Then an error will show to alert user of no internet connection


FEATURE 5: DATA VISUALIZATION

As a user I should be able to see events occurring in each city so that I can choose which event I want to go to.

•	Scenario 1: Show a chart with the number of upcoming events in each city

o	Given a chart

o	When a user reads the chart

o	Then the user can see what events are happening in each city

