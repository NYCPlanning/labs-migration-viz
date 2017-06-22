var svg;
var currentData = {};
var lineChartData = {};

function highlightBars(highlightData) {
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

function updateChart() {
  var clientRect = d3.select('body').node().getBoundingClientRect();

  var yMin = -400000;
  var yMax = 400000;

  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 10, bottom: 20, left: 10 };
  var width = clientRect.width;
  var height = clientRect.height;

  // x scale to render each chart across the same axis
  var outerX = d3.scaleBand()
    .domain(Object.keys(currentData))
    .range([0, width])
    .padding(0.1);

  // local x scale
  var x = d3.scaleBand()
    .domain(currentData['1935_1940'].map(function (d) { return d.group; }))
    .range([0, width / 6])
    .padding(0.1);

  // local y scale
  var y = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([height * 0.75, height * 0.25]);

  var line = d3.line()
    .x(function (d) { return outerX(d.year_range) + x(d.group) + margin.left + margin.right; })
    .y(function (d) { return y(d.net) + margin.top; })
    .curve(d3.curveCardinal);


  svg.attr('width', width)
    .attr('height', height);

  svg.selectAll('.in-label')
    .attr('x', 20)
    .attr('y', y(yMax) + margin.top - 10);

  svg.selectAll('.out-label')
    .attr('x', 20)
    .attr('y', y(yMin) + margin.top + 20);

  svg.selectAll('line')
    .attr('class', 'center-axis')
    .attr('x1', 0)
    .attr('y1', y(0) + margin.top)
    .attr('x2', width + margin.left + margin.right)
    .attr('y2', y(0) + margin.top)
    .attr('width', width);

  // add g elements for each chart, offset by outerX scale
  var g = svg.selectAll('g')
    .data(Object.keys(currentData));

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
      return currentData[d];
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
      return currentData[d];
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
    .data(function (d) { return currentData[d]; });

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
      return currentData[d];
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
      return currentData[d];
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
    .data(Object.keys(lineChartData));

  trendlines.enter()
    .append('path')
    .attr('class', 'trendline')
    .merge(trendlines)
    .datum(function (d) {
      return lineChartData[d];
    })
    .attr('d', line);

  // append net migration dots
  var circles = svg.selectAll('g').selectAll('circle')
    .data(function (d) { return currentData[d]; });

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

function initializeChart() {
  // add main svg element
  svg = d3.select('.chart-container').append('svg');

  svg.append('line');

  svg.append('text')
    .attr('class', 'in-label in')
    .text('IN-MIGRATION');

  svg.append('text')
    .attr('class', 'out-label out')
    .text('OUT-MIGRATION');

  updateChart();
  highlightBars({ group: 'Under 10' }); // set initial highlight
}

function getLineChartData(d) {
  var numBands = d[Object.keys(d)[0]].length;
  var newData = {};

  for (var i = 0; i < numBands; i += 1) {
  // for (var i = 0; i < 1; i += 1) {
    var group = d[Object.keys(d)[0]][i].group;

    var points = [];
    Object.keys(d).forEach(function (key) { // eslint-disable-line
      var net = d[key][i].in - d[key][i].out;

      points.push({
        group: group,
        year_range: key,
        net: net
      });

      newData[group] = points;
    });
  }

  return newData;
}

d3.csv('data/historic_migration_selchars.csv', function (data) {
  console.log(data);

  var ageData = _(data).filter(function(d) { return d.characteristic === 'age'; })

  var yearRangeStrings = [
    '1935_1940',
    '1975_1980',
    '1985_1990',
    '1995_2000',
    '1995_2000',
    '2010_2014'
  ];

  yearRangeStrings.forEach(function (yearRangeString) {
    // create array of objects
    currentData[yearRangeString] = ageData.map(function (d) {
      return {
        group: d.group,
        in: d[yearRangeString + '_in'],
        out: d[yearRangeString + '_out']
      };
    });
  });

  lineChartData = getLineChartData(currentData);
  console.log(lineChartData);
  initializeChart();
});

window.addEventListener('resize', updateChart);
