var chart

/*
 * draw chart for table data in column
 * [col] - column index
 * [header] - label for row
 */
function drawChart(header, col) {
  chart = new Chart('chart', {
    type: 'line',
    data: {
      datasets: [{
        borderColor: "#4CAF50",
        fill: false,
      }]
    },
    animationSteps: 5,
  });

  setChartData(header, cols);
}

/*
 * set data to the chart for column
 * [colIdx] - index for column to draw
 */
function setChartData(colIdx) {
  var header   = table.find('thead tr th').eq(colIdx).text();
  var colData  = _.map(_.range(table.find('tbody tr').length), (rowIdx) => {
    return parseInt(table.find('tbody tr').eq(rowIdx).find('td').eq(colIdx).text())
  });

  chart.data.labels = _.range(1, colData.length+1);
  chart.data.datasets[0].label = header;
  chart.data.datasets[0].data = colData;

  chart.update();
}

/*
 * update chart data with new value
 * [newVal] - new value (value to change)
 * [rowIdx] - index of [newVal] in row 
 * [updateNumbers] = true, if number of elements changed in column
 *                   false, if only value changed
 */
function updateChartData(newVal, rowIdx, updateNumbers = false) {
  chart.data.datasets[0].data[rowIdx] = parseInt(newVal);

  if (updateNumbers)
    chart.data.labels[rowIdx] = rowIdx+1;

  chart.update();
}

/*
 * update chart label
 * [newVal] - new value (value to change)
 * [colIdx] - index of [newVal] in column
 */
function updateChartLabel(newVal, colIdx) {
  chart.data.datasets[0].label = newVal;
  chart.update();
}

/*
 * add options to selector to draw chart
 * [selector] - selector element
 * 
 */
function addSelectorOptions(selector, options) {
  for(i = 0; i < options.length; i++)
    selector.append('<option>' + options[i] + '</option>');
}

/*
 * change option in selector
 * [selector] - selector element
 * [option] - option to change
 * [idx] - option index in the list
 */
function changeSelectorOption(selector, option, idx) {
  console.log(selector.val(3))
}