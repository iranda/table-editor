/*
 * init table with data
 * [table] - table to init
 * [headers] - array of headers for table
 * [data] - data to fill table body
 */
function initTableWithData(table, headers, data) {
  _.each(headers, function(rows) {
    table.find('thead').append(`<tr>${ _.map(rows, (rowElem) => "<th>" + rowElem + "</th>") }</tr>`);
  });
  $('tbody').empty();
  _.each(data, function(rows) {
    table.find('> tbody').append(`<tr>${ _.map(rows, (rowElem) => "<td>" + rowElem + "</td>") }</tr>`);
  });
}

/*
 * init table listeners
 */
function initTableListeners(table) {
  table.on( 'click', 'thead tr th', headCellClicked);
  table.on( 'click', 'tbody tr td', tableCellClicked);

  $('#add-row').click(function(){
    var rowIdx = table.find('tbody tr').length;
    var colIdx = $('#select-row :selected').index();
    var newVal;
    appendRow(table);

    newVal = table.find('tbody tr').eq(rowIdx).find('td').eq(colIdx).text();
    updateChartData(newVal, rowIdx, true);
  });

  $('#add-col').click(function(){
    appendColumn(table);
    addSelectorOptions($('#select-row'), [table.find(' > thead > tr:first > th:last').text()]);
  })

  $('#select-row').on('change', function() {
    setChartData($(this).find(':selected').index());
  });
}

/*
 * append row into the table
 * [table] - tabe to append row
 */
function appendRow(table) {
  var colsLen = table.find('tbody > tr:first > td').length;

  table.find('> tbody').append(`<tr>${
    _.map(_.range(colsLen), (el) => '<td>'+getRandomValue(dataType.NUMBER)+'</td>')
  }</tr>`);
}

/*
 * select row
 * [row] - row to select
 */
function selectRow(row) {
  if (row.hasClass('selected')) {
    row.removeClass('selected');
  }
  else {
    $('table tr').find('selected').removeClass('selected');
    row.addClass('selected');
  }
}

/*
 * add column to the table
 * [table] - table to append column
 */
function appendColumn(table) {
  table.find('thead tr').append('<th>'+getRandomValue(dataType.STRING)+'</th>');
  table.find('tbody tr').each(function() {
    $(this).append('<td>'+getRandomValue(dataType.NUMBER)+'</td>');
  })
}

/*
 * select column by index
 * [colIdx] - index of column to select
 */
function selectColumn(colIdx) {
  var previousSelection = $('.selected')

  $('table tr').each(function() {
      $(this).children().each(function(i) {
        if (colIdx == i) {
          if ($(this).hasClass('selected')) {
            $('.selected').removeClass('selected');
            return;
          }

          $(this).addClass('selected');
        }
      });
  });

  previousSelection.removeClass('selected');
}

/*
 * delete selected data (row of column)
 */
function deleteSelected() {
  $('.selected').remove()
}

/*
 * save input (if needed) in table from the only <input> of table element
 */
function saveInput() {
  let existingInput = $('table tr input');

  if (existingInput.length) {
    var tagName = existingInput.parent().get(0).tagName;

    if (tagName == 'TD') { /* Changes in Body -> data */
      updateChartData(existingInput.val(),
                      existingInput.parent().parent().index());
    }
    else { /* Changes in Head -> label */
      updateChartLabel(existingInput.val(),
                       existingInput.parent().index());
    }

    existingInput.closest(tagName).html(existingInput.val());
  }
}

/*
 * manage input fields in the table for current
 * [elem] - element to manage
 * [type] - html type of elemet
 */
function manageInput(elem, type) {
  if (elem.has('input').length)
    return;

  saveInput()
  var val = elem.text();
  elem
    .empty()
    .append('<input type="text" value='+val+'>')
    .focus();

  $('table tr '+ type +' input').keyup(function(e){
    if(e.keyCode == 13) /* Enter key */
      saveInput();
  });
}

/*
 * add listener to table [dt] cell to allow editing
 */
function tableCellClicked(e) {
  if (e.shiftKey) {
    selectRow($(this).parent())
    return;
  }

  var tagName = $(this).get(0).tagName;
  if (tagName !== 'TD') return;
  manageInput($(this), tagName);
}

/*
 * add listener to table head cell
 */
function headCellClicked(e) {
  if (e.shiftKey) {
    selectColumn($(this).index());
    return;
  }

  var tagName = $(this).get(0).tagName;
  if (tagName !== 'TH') return;
  manageInput($(this), tagName);
}