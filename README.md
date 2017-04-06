## Description
User should specify number of rows and columns in the table. Also there is checkbox to decide either use random data or not.

### Table options
- add/delete rows;
- add/delete columns;
- change table cell value.

### Chart options
- show first row after table initialization;
- select any header column to show chart;
- instant update during changing cell value;
- instant update during adding/deleting rows - add/remove value from chart;
- instant update during deleting columns - redraw chart for focusing element in select field;

## Structure

    +--- table-editor
    | +--- app       # folder containing main functionality (utils, table, chart)
    | +--- styles    # folder containing styles
    | \--- app.js    # app init
    | \--- main.html # app html
    | \--- README.md # Your assumptions and design decisions