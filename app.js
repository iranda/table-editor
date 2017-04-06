$(function() {
  let tableParamsBlock  = $('#table-params');
  let tableWrapperBlock = $('#table-wrapper');
  table                 = $('#chart-data');
  let tableHeaders;
  let tableData;

  tableParamsBlock.fadeIn(500);
  
  $('#js-create-table').on('click', function generateTable() {
    cols = parseInt($('input[name="cols"]').val());
    let rows = parseInt($('input[name="rows"]').val())-1;
    let useRandom = $('input[name="use-random"]').is(":checked")
    
    /* init table */
    tableHeaders = fillArrayRandomly(1, cols, useRandom? dataType.STRING : dataType.EMPTY)
    tableData = fillArrayRandomly(rows, cols, useRandom? dataType.NUMBER : dataType.EMPTY)

    initTableWithData(table, tableHeaders, tableData);
    initTableListeners(table);

    /* init chart */
    addSelectorOptions($('#select-row'), tableHeaders[0]);
    drawChart($('#select-row :selected').index());

    tableParamsBlock.hide();
    tableWrapperBlock.show();

    document.addEventListener('keyup', function(e){
      if(e.keyCode == 8 || e.keyCode == 46) {
        deleteSelected();
        addSelectorOptions($('#select-row').empty(),
                           _.map(table.find('thead tr th'), (el) => el.innerHTML));
        drawChart($('#select-row :selected').index());
      }
    });
  });
});