# Matroid Event Viewer

## Instructions
1. Navigate to the project directory.
2. Install dependencies with `npm install`.
3. Start local server with `npm start`.
4. Navigate to app in [browser](http://localhost:3000).

## Notes
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements
#### Users should be able to view and interact with a timeline of all events
To create the interactive timeline, I used [vis.js](http://visjs.org/index.html). For each event, the timeline has a selectable label displaying the name of the video stream. The timeline can be dragged in all directions, as well as zoomed in and out.

#### Users should be able to click on an event and see a detailed view that displays the event image, shows the location and scores for each prediction, and shows the event time in a human readable way
Events are displayed through the `EventDisplay` component, containing `EventImage` and `EventDetails`. Selecting an event on the timeline determines which event is passed into the `EventDisplay` component.

`EventImage` displays the image and bounding boxes of predictions. `EventDetails` contains a small table displaying the event's video stream and time. Each bounding box in `EventImage` has a small button, which the user can click on to display the associated predictions and scores in `EventDetails`.

#### Users should be able to filter events by prediction label and score
The `Filters` component contains a search box for prediction label and a two-handle slider for score. Modifying these widgets filters the dataset passed into the timeline, looking for any events with labels that include the search term and fall into the given score range.

## Bonuses
#### Allow users to filter events by additional fields
I added additional widgets to the `Filters` component - a search box to filter by video stream, and two date/time pickers to filter by time range. I used [react-datepicker](https://reactdatepicker.com/) for the date/time pickers.

#### Give users the ability to indicate whether or not a prediction is correct, and update the UI accordingly
In `EventDetails`, each prediction has a checkmark button which can be used to mark it as correct. This highlights it inside of `EventDetails`, and modifies the icon in the bounding box. Only one of the predictions can be marked as correct, and clicking on an already-selected prediction will unmark it.

#### Add basic tests