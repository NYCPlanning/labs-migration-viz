var selectedCharacteristic = 'age';
var lineChartData = {};
var yearRangeStrings = [
  '1935_1940',
  '1975_1980',
  '1985_1990',
  '1995_2000',
  '1995_2000',
  '2010_2014'
];


function highlightBars(highlightData) {
  var svg = d3.select('svg');
  var highlightCohort = highlightData.group;

  // add selected class to all bars with this label
  svg
    .selectAll('g')
    .selectAll('.bar')
    .classed('selected', function (d) {
      return d.group === highlightCohort;
    });

  // add selected class to all net circles with this label
  svg
    .selectAll('g')
    .selectAll('.net')
    .classed('selected', function (d) {
      return d.group === highlightCohort;
    });

  // add selected class to all bar labels with this label
  svg
    .selectAll('g')
    .selectAll('.bar-label')
    .classed('selected', function (d) {
      return d.group === highlightCohort;
    });

  // add selected class to all trendlines with this label
  svg
    .selectAll('.trendline')
    .classed('selected', function (d) {
      return d[0].group === highlightCohort;
    });

  // update cohort label
  $('#cohort-label').text('Age ' + highlightCohort);
}

function clearChart() {
  d3.selectAll('svg > g').remove();
  d3.selectAll('svg > path').remove();
}

function updateChart(barData, lineData) {
  var svg = d3.select('svg');
  var clientRect = d3.select('body').node().getBoundingClientRect();

  // get maximum absolute value from the data
  var max = d3.max(
    Object.keys(barData).map(function (key) {
      return d3.max(barData[key], function (d) { return Math.max(d.in, d.out); });
    })
  );


  var yMin = -max;
  var yMax = max;

  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 10, bottom: 20, left: 10 };
  var width = clientRect.width;
  var height = 350;

  // x scale to render each chart across the same axis
  var outerX = d3.scaleBand()
    .domain(Object.keys(barData))
    .range([0, width])
    .padding(0.1);

  // local x scale
  var x = d3.scaleBand()
    .domain(barData['1935_1940'].map(function (d) { return d.group; }))
    .range([0, width / 6])
    .padding(0.1);

  // local y scale
  var y = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0]);

  var line = d3.line()
    .x(function (d) { return outerX(d.year_range) + x(d.group) + margin.left + margin.right; })
    .y(function (d) { return y(d.net) + margin.top; })
    .curve(d3.curveCardinal);


  svg.attr('width', width)
    .attr('height', height);

  svg.selectAll('.in-label')
    .attr('x', 20)
    .attr('y', margin.top);

  svg.selectAll('.out-label')
    .attr('x', 20)
    .attr('y', height);

  svg.selectAll('line')
    .attr('class', 'center-axis')
    .attr('x1', 0)
    .attr('y1', y(0) + margin.top)
    .attr('x2', width + margin.left + margin.right)
    .attr('y2', y(0) + margin.top)
    .attr('width', width);

  // add g elements for each chart, offset by outerX scale
  var g = svg.selectAll('g')
    .data(Object.keys(barData));

  g.enter()
    .append('g')
    .attr('class', 'subbox')
    .merge(g)
    .attr('transform', function (d) {
      return 'translate(' + (outerX(d) + margin.left) + ',' + margin.top + ')';
    });

  // append the inflow rectangles
  var ins = svg.selectAll('g').selectAll('.in')
    .data(function (d) {
      return barData[d];
    });

  ins.enter()
    .append('rect')
      .attr('class', function (d) { return 'bar in ' + d.group; })
      .on('mouseenter', highlightBars)
    .merge(ins)
      .attr('x', function (d) { return x(d.group); })
      .attr('width', x.bandwidth())
      .attr('y', function (d) { return y(d.in); })
      .attr('height', function (d) { return y(0) - y(d.in); });

  // append inflow labels
  var inLabels = svg.selectAll('g').selectAll('.bar-label.in')
    .data(function (d) {
      return barData[d];
    });

  inLabels.enter()
    .append('text')
      .attr('class', function (d) { return 'bar-label in ' + d.group; })
      .attr('text-anchor', 'middle')
      .text(function (d) { return numeral(d.in).format('0.0a'); })
    .merge(inLabels)
      .attr('x', function (d) { return x(d.group) + (x.bandwidth() / 2); })
      .attr('y', function (d) { return y(d.in) - 5; });


  // append the outflow rectangles
  var outs = svg.selectAll('g').selectAll('.out')
    .data(function (d) { return barData[d]; });

  outs.enter()
    .append('rect')
      .attr('class', 'bar out')
      .on('mouseenter', highlightBars)
    .merge(outs)
      .attr('x', function (d) { return x(d.group); })
      .attr('width', x.bandwidth())
      .attr('y', function () { return y(0); })
      .attr('height', function (d) { return y(0) - y(d.out); });

  // append outflow bar labels
  var outLabels = svg.selectAll('g').selectAll('.bar-label.out')
    .data(function (d) {
      return barData[d];
    });

  outLabels.enter()
    .append('text')
      .attr('class', function (d) { return 'bar-label out ' + d.group; })
      .attr('text-anchor', 'middle')
      .text(function (d) { return numeral(d.out).format('0.0a'); })
    .merge(outLabels)
      .attr('x', function (d) { return x(d.group) + (x.bandwidth() / 2); })
      .attr('y', function (d) { return y(-d.out) + 15; });

  // append net bar labels
  var netLabels = svg.selectAll('g').selectAll('.bar-label.net')
    .data(function (d) {
      return barData[d];
    });

  netLabels.enter()
    .append('text')
      .attr('class', function (d) { return 'bar-label net ' + d.group; })
      .attr('text-anchor', 'middle')
      .text(function (d) { return 'Δ ' + numeral(d.in - d.out).format('0.0a'); })
    .merge(netLabels)
      .attr('x', function (d) { return x(d.group) + (x.bandwidth() / 2); })
      .attr('y', function (d) { return y(-d.out) + 35; });

  // draw trendlines
  var trendlines = svg.selectAll('path')
    .data(Object.keys(lineData));

  trendlines.enter()
    .append('path')
    .attr('class', 'trendline')
    .merge(trendlines)
    .datum(function (d) {
      return lineData[d];
    })
    .attr('d', line);

  // append net migration dots
  var circles = svg.selectAll('g').selectAll('circle')
    .data(function (d) { return barData[d]; });

  circles.enter()
    .append('circle')
      .attr('class', 'net')
    .merge(circles)
      .attr('cy', function (d) {
        var net = d.in - d.out;
        return y(net);
      })
      .attr('cx', function (d) { return x(d.group) + (x.bandwidth() / 2); })
      .attr('r', 3)
      .attr('fill', 'black');
}

function initializeChart(barData, lineData) {
  // add main svg element
  var svg = d3.select('.chart-container').append('svg');

  svg.append('line');

  svg.append('text')
    .attr('class', 'in-label in')
    .text('IN-MIGRATION');

  svg.append('text')
    .attr('class', 'out-label out')
    .text('OUT-MIGRATION');

  updateChart(barData, lineData);
}

function getLineData(rawData, characteristic, yearRangeStrings) {
  var filteredData = _(rawData).filter(function (d) {
    return d.characteristic === characteristic;
  });

  var lineData = {};
  for (var i = 0; i < filteredData.length; i += 1) {
    var thisRow = filteredData[i];
    var group = thisRow.group;
    var points = [];
    // iterate over yearRangeStrings and build point data
    yearRangeStrings.forEach(function (yearRangeString) {
      points.push({
        group: group,
        year_range: yearRangeString,
        net: thisRow[yearRangeString + '_in'] - thisRow[yearRangeString + '_out']
      });
    });
    lineData[group] = points;
  }

  return lineData;
}

function getBarData(rawData, characteristic, yearRangeStrings) {
  var filteredData = _(rawData).filter(function (d) {
    return d.characteristic === characteristic;
  });

  var barData = {};
  yearRangeStrings.forEach(function (yearRangeString) {
    // create array of objects
    barData[yearRangeString] = filteredData.map(function (d) {
      return {
        group: d.group,
        in: d[yearRangeString + '_in'],
        out: d[yearRangeString + '_out']
      };
    });
  });

  return barData;
}

//  kick things off by downloading the csv
d3.csv('data/historic_migration_selchars.csv', function (data) {
  var barData = getBarData(data, selectedCharacteristic, yearRangeStrings);
  var lineData = getLineData(data, selectedCharacteristic, yearRangeStrings);
  initializeChart(barData, lineData);

  window.addEventListener('resize', function () { updateChart(barData, lineData); });

  // change the selected characteristic when the user clicks a button
  $('.char-select>button').click(function () {
    selectedCharacteristic = $(this)[0].id;
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    var newBarData = getBarData(data, selectedCharacteristic, yearRangeStrings);
    var newLineData = getLineData(data, selectedCharacteristic, yearRangeStrings);
    clearChart();

    window.removeEventListener('resize');
    window.addEventListener('resize', function () { updateChart(barData, lineData); });

    updateChart(newBarData, newLineData);
  });
});
