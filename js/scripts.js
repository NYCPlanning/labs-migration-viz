var selectedCharacteristic;
var barData;
var lineData;
var yearRangeStrings = [
  '1935_1940',
  '1975_1980',
  '1985_1990',
  '1995_2000',
  '2010_2014'
];

function highlight(highlightData) {
  var svg = d3.select('svg');
  var highlightCohort = highlightData.group;


  svg
    .selectAll('g')
    .selectAll('.bar')
    .classed('subdued', function (d) {
      return d.group !== highlightCohort;
    });

  svg
    .selectAll('g')
    .selectAll('circle')
    .classed('subdued', function (d) {
      return d.group !== highlightCohort;
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

function unHighlight() {
  var svg = d3.select('svg');
  svg
    .selectAll('.selected')
    .classed('selected', false);
  svg
    .selectAll('.subdued')
    .classed('subdued', false);
}

function clearChart() {
  d3.selectAll('svg > g').remove();
  d3.selectAll('svg > path').remove();
}

function updateChart() {
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
    .range([height - 30, 30]);

  var z = d3.scaleBand()
    .domain(barData['1935_1940'].map(function (d) { return d.group; }))
    .range([0, 1]);

  var getColor = chroma.scale(characteristics[selectedCharacteristic].colors);

  var line = d3.line()
    .x(function (d) { return outerX(d.year_range) + x(d.group) + (x.bandwidth() / 2) + margin.left; })
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
      .attr('class', function () { return 'bar in'; })
      .on('mouseover', highlight)
      .on('mouseout', unHighlight)
    .merge(ins)
      .attr('x', function (d) { return x(d.group); })
      .attr('width', x.bandwidth())
      .attr('y', function (d) { return y(d.in); })
      .attr('height', function (d) { return y(0) - y(d.in); })
      .attr('fill', function (d) { return getColor(z(d.group)); });

  // append inflow labels
  var inLabels = svg.selectAll('g').selectAll('.bar-label.in')
    .data(function (d) {
      return barData[d];
    });

  inLabels.enter()
    .append('text')
      .attr('class', function (d) { return 'bar-label in ' + d.group; })
      .attr('text-anchor', 'middle')
      .text(function (d) { return numeral(d.in).format('0.0a') + ' in'; })
    .merge(inLabels)
      .attr('x', function (d) { return x(d.group) + (x.bandwidth() / 2); })
      .attr('y', function (d) { return y(d.in) - 5; });


  // append the outflow rectangles
  var outs = svg.selectAll('g').selectAll('.out')
    .data(function (d) { return barData[d]; });

  outs.enter()
    .append('rect')
      .attr('class', 'bar out')
      .on('mouseover', highlight)
      .on('mouseout', unHighlight)
    .merge(outs)
      .attr('x', function (d) { return x(d.group); })
      .attr('width', x.bandwidth())
      .attr('y', function () { return y(0); })
      .attr('height', function (d) { return y(0) - y(d.out); })
      .attr('fill', function (d) { return getColor(z(d.group)); });

  // append outflow bar labels
  var outLabels = svg.selectAll('g').selectAll('.bar-label.out')
    .data(function (d) {
      return barData[d];
    });

  outLabels.enter()
    .append('text')
      .attr('class', function (d) { return 'bar-label out ' + d.group; })
      .attr('text-anchor', 'middle')
      .text(function (d) { return numeral(d.out).format('0.0a') + ' out'; })
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


  svg.selectAll('.center-axis').remove();
  svg.append('line')
    .attr('class', 'center-axis')
    .attr('x1', 0)
    .attr('y1', y(0) + margin.top)
    .attr('x2', width + margin.left + margin.right)
    .attr('y2', y(0) + margin.top)
    .attr('width', width);

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
      .attr('r', 3);

  // draw trendlines
  var trendlines = svg.selectAll('path')
    .data(Object.keys(lineData));

  trendlines.enter()
    .append('path')
    .attr('class', 'trendline')
    .merge(trendlines)
    .datum(function (d) { return lineData[d]; })
    .attr('d', line);
}

function initializeChart() {
  // add main svg element
  var svg = d3.select('.chart-container').append('svg');

  svg.append('text')
    .attr('class', 'in-label in')
    .text('IN-MIGRATION');

  svg.append('text')
    .attr('class', 'out-label out')
    .text('OUT-MIGRATION');
}

function getLineData(rawData, characteristic, yearRangeStrings) { // eslint-disable-line
  var filteredData = _(rawData).filter(function (d) {
    return d.characteristic === characteristic;
  });

  var newLineData = {};
  for (var i = 0; i < filteredData.length; i += 1) {
    var thisRow = filteredData[i];
    var group = thisRow.group;
    var points = [];
    // iterate over yearRangeStrings and build point data
    yearRangeStrings.forEach(function (yearRangeString) { // eslint-disable-line
      points.push({
        group: group,
        year_range: yearRangeString,
        net: thisRow[yearRangeString + '_in'] - thisRow[yearRangeString + '_out']
      });
    });
    newLineData[group] = points;
  }

  return newLineData;
}

function getBarData(rawData, characteristic, yearRangeStrings) { // eslint-disable-line
  var filteredData = _(rawData).filter(function (d) {
    return d.characteristic === characteristic;
  });

  var newBarData = {};
  yearRangeStrings.forEach(function (yearRangeString) {
    // create array of objects
    newBarData[yearRangeString] = filteredData.map(function (d) {
      return {
        group: d.group,
        in: d[yearRangeString + '_in'],
        out: d[yearRangeString + '_out']
      };
    });
  });

  return newBarData;
}

function updateTextArea(characteristic) {
  var thisCharacteristic = characteristics[characteristic];
  $('#char-display-name').text(thisCharacteristic.displayName);
  $('#char-about').text(thisCharacteristic.about);
}

Object.keys(characteristics).forEach(function (d) {
  $('.char-select').append('<button id="' + d + '" class="btn btn-default btn-xs">' + characteristics[d].displayName + '</button>');
});


//  kick things off by downloading the csv
d3.csv('data/historic_migration_selchars.csv', function (data) {
  console.log(data)
  initializeChart();

  // change the selected characteristic when the user clicks a button
  $('.char-select>button').click(function () {
    console.log('click')
    selectedCharacteristic = $(this)[0].id;
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    barData = getBarData(data, selectedCharacteristic, yearRangeStrings);
    lineData = getLineData(data, selectedCharacteristic, yearRangeStrings);

    updateTextArea(selectedCharacteristic);

    function update() {
      updateChart();
    }

    window.addEventListener('resize', update);

    clearChart();
    update();
  });

  // simulate click on age as the default
  $('#age').click();
});

window.addEventListener('resize', updateChart);
