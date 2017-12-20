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
  var legendItems = d3.selectAll('.legend-item');
  var highlightCohort = highlightData.group;
  svg
    .selectAll('g > .bar, g > circle')
    .classed('subdued', function (d) {
      return d.group !== highlightCohort;
    });

  legendItems
    .classed('subdued', function (d) {
      return d.group !== highlightCohort;
    });

  legendItems
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

  // update text area
  $('#char-display-name').text(characteristics[selectedCharacteristic].displayName + ' - ' + highlightData.group);
  $('#char-display-parenthetical').text(characteristics[selectedCharacteristic].displayParenthetical || " ");

  var yearRange = highlightData.year_range.split('_').join(' and ');
  var direction = (highlightData.in > highlightData.out) ? '<span class="in">net gain' : '<span class="out">net loss';
  var net = Math.abs(highlightData.in - highlightData.out);

  $('#char-about').html(
    'Between '
      + yearRange
      + ', <span class="in">'
      + numeral(highlightData.in).format('0,0')
      + '</span> '
      + characteristics[selectedCharacteristic].descriptor
      + ' '
      + highlightData.group
      + ' moved to NYC while <span class="out">'
      + numeral(highlightData.out).format('0,0')
      + '</span> moved out. This resulted in the city\'s '
      + direction + ' of '
      + numeral(net).format('0,0')
      + '</span> in this group due to migration.'
  );
}

// update the about text
function updateTextArea(characteristic) {
  var thisCharacteristic = characteristics[characteristic];
  $('#char-display-name').text(thisCharacteristic.displayName);
  $('#char-display-parenthetical').text(thisCharacteristic.displayParenthetical || " ");
  $('#char-about').text(thisCharacteristic.about);
}

function unHighlight() {
  d3.selectAll('.selected')
    .classed('selected', false);

  d3.selectAll('.subdued')
    .classed('subdued', false);

  updateTextArea(selectedCharacteristic);
}

function clearChart() {
  d3.selectAll('svg > g').remove();
  d3.selectAll('svg > .no-data').remove();
  d3.selectAll('svg > path').remove();
  d3.selectAll('.legend-items > *').remove();
}

function updateChart() {
  var svg = d3.select('svg');
  var clientRect = d3.select('.chart-container').node().getBoundingClientRect();

  // get maximum absolute value from the data
  var max = d3.max(
    Object.keys(barData).map(function (key) {
      return d3.max(barData[key], function (d) { return Math.max(d.in, d.out); });
    })
  );

  var yMin = -max;
  var yMax = max;

  // set the dimensions and margins of the graph
  var margin = { top: 0, right: 0, bottom: 20, left: 0 };
  var width = clientRect.width - 30; // -30 accounts for 15px of padding on each side
  var height = 400;

  // x scale to render each chart across the same axis
  var outerX = d3.scaleBand()
    .domain(Object.keys(barData))
    .range([0, width])
    .padding(0.1);

  // local x scale
  var x = d3.scaleBand()
    .domain(barData['1975_1980'].map(function (d) { return d.group; }))
    .range([0, width / 6])
    .paddingOuter(0.5)
    .paddingInner(0.0);

  // local y scale
  var y = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([height - 40, 40]);

  var z = d3.scalePoint()
    .domain(barData['1975_1980'].map(function (d) { return d.group; }))
    .range([0, 1]);

  var getColor = chroma.scale(characteristics[selectedCharacteristic].colors);

  var line = d3.line()
    .x(function (d) {
      return outerX(d.year_range) + x(d.group) + (x.bandwidth() / 2) + margin.left;
    })
    .y(function (d) { return y(d.net) + margin.top; })
    .curve(d3.curveCardinal);

  // render a legend
  var legend = d3.select('.legend-items')
    .selectAll('.legend-item')
    .data(barData['1975_1980']);

  var legendItems = legend.enter()
    .append('div')
    .attr('class', function (d) { return 'legend-item ' + d.group; });

  legendItems.append('div')
    .attr('class', 'legend-color-box')
    .attr('style', function (d) {
      return 'background: ' + getColor(z(d.group));
    });

  legendItems.append('div')
    .attr('class', 'legend-text')
    .text(function (d) { return d.group; });

  // end legend

  svg.attr('width', width)
    .attr('height', height);

  svg.selectAll('.in-label')
    .attr('x', 0)
    .attr('y', margin.top + 100);

  svg.selectAll('.out-label')
    .attr('x', 0)
    .attr('y', height - margin.bottom - 50);

  // add g elements for each chart, offset by outerX scale
  var g = svg.selectAll('g')
    .data(Object.keys(barData));

  // 100,000 people axis
  svg.selectAll('.hundredk-axis').remove();
  svg.append('line')
    .attr('class', 'hundredk-axis')
    .attr('x1', 0)
    .attr('y1', y(100000) + margin.top)
    .attr('x2', width + margin.left + margin.right)
    .attr('y2', y(100000) + margin.top)
    .attr('width', width);

  svg.append('line')
    .attr('class', 'hundredk-axis')
    .attr('x1', 0)
    .attr('y1', y(-100000) + margin.top)
    .attr('x2', width + margin.left + margin.right)
    .attr('y2', y(-100000) + margin.top)
    .attr('width', width);

  svg.append('text')
    .attr('class', 'hundredk-axis')
    .text('100k')
    .attr('x', 0)
    .attr('y', y(100000) + margin.top + 12);

  svg.append('text')
    .attr('class', 'hundredk-axis')
    .text('-100k')
    .attr('x', 0)
    .attr('y', y(-100000) + margin.top + 12);

  g.enter()
    .append('g')
    .attr('class', 'subbox')
    .merge(g)
    .attr('transform', function (d) {
      return 'translate(' + (outerX(d) + margin.left) + ',' + margin.top + ')';
    });


  // add "No Data Available" message for some year ranges
  var noData = svg.selectAll('.no-data')
    .data(Object.keys(barData));

  noData.enter()
    .append('text')
    .attr('class', 'no-data')
    .attr('text-anchor', 'middle')
    .text(function (d) {
      return isNaN(barData[d][0].in) ? 'No data available' : '';
    })
    .merge(noData)
    .attr('x', function (d) { return outerX(d) + (outerX.bandwidth() / 2); })
    .attr('y', function () { return y(0) + margin.top - 8; }); // eslint-disable-line

  // append the inflow rectangles
  var ins = svg.selectAll('g').selectAll('.in')
    .data(function (d) {
      return barData[d].filter(function (group) {
        return !isNaN(group.in);
      });
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
      return barData[d].filter(function (group) {
        return !isNaN(group.in);
      });
    });

  inLabels.enter()
    .append('text')
      .attr('class', function (d) { return 'bar-label in ' + d.group; })
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return isNaN(d.in) ? '' : numeral(d.in).format('0.0a') + ' in';
      })
      .merge(inLabels)
      .attr('x', function (d) { return x(d.group) + (x.bandwidth() / 2); })
      .attr('y', function (d) { return y(d.in) - 5; });


  // append the outflow rectangles
  var outs = svg.selectAll('g').selectAll('.out')
    .data(function (d) {
      return barData[d].filter(function (group) {
        return !isNaN(group.in);
      });
    });

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
      return barData[d].filter(function (group) {
        return !isNaN(group.in);
      });
    });

  outLabels.enter()
    .append('text')
      .attr('class', function (d) { return 'bar-label out ' + d.group; })
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return isNaN(d.in) ? '' : numeral(d.out).format('0.0a') + ' out';
      })
    .merge(outLabels)
      .attr('x', function (d) { return x(d.group) + (x.bandwidth() / 2); })
      .attr('y', function (d) { return y(-d.out) + 15; });

  // append net bar labels
  var netLabels = svg.selectAll('g').selectAll('.bar-label.net')
    .data(function (d) {
      return barData[d].filter(function (group) {
        return !isNaN(group.in);
      });
    });

  netLabels.enter()
    .append('text')
      .attr('class', function (d) { return 'bar-label net ' + d.group; })
      .attr('text-anchor', 'middle')
      .text(function (d) { return isNaN(d.in) ? '' : numeral(d.in - d.out).format('0.0a') + ' net'; })
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
    .data(function (d) {
      return barData[d].filter(function (group) {
        return !isNaN(group.in);
      });
    });

  circles.enter()
    .append('circle')
      .attr('class', 'net')
    .merge(circles)
      .attr('cy', function (d) {
        var net = d.in - d.out;
        return y(net);
      })
      .attr('cx', function (d) { return x(d.group) + (x.bandwidth() / 2); })
      .attr('r', function (d) {
        return isNaN(d.in) ? 0 : 5;
      });

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

function getLineData(rawData, characteristic, yearRangeStringsOriginal) {
  // eliminate 1935-1940 so that the line always starts at 1975_1980
  // may change later if we can figure out a better way to solve the non-continuous timeline problem
  var yearRangeStrings = yearRangeStringsOriginal.slice();  // eslint-disable-line
  yearRangeStrings.shift();

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
      if (thisRow[yearRangeString + '_in'] !== '') {
        points.push({
          group: group,
          year_range: yearRangeString,
          net: thisRow[yearRangeString + '_in'] - thisRow[yearRangeString + '_out']
        });
      }
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
        in: parseInt(d[yearRangeString + '_in'], 10),
        out: parseInt(d[yearRangeString + '_out'], 10),
        year_range: yearRangeString
      };
    });
  });

  return newBarData;
}

Object.keys(characteristics).forEach(function (d) {
  d3.select('.char-select')
    .append('button')
    .attr('id', d)
    .attr('class', 'btn btn-default btn-xs')
    .text(characteristics[d].displayName);
});


//  kick things off by downloading the csv
d3.csv('data/historic_migration_selchars.csv', function (data) {
  initializeChart();

  // change the selected characteristic when the user clicks a button
  $('.char-select>button').click(function () {
    selectedCharacteristic = $(this)[0].id;
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    barData = getBarData(data, selectedCharacteristic, yearRangeStrings);
    lineData = getLineData(data, selectedCharacteristic, yearRangeStrings);

    updateTextArea(selectedCharacteristic);

    clearChart();
    updateChart();

    // set url hash
    history.replaceState(undefined, undefined, '#' + selectedCharacteristic);
  });

  // select hashed characteristic
  if (Object.keys(characteristics).indexOf(window.location.hash.split('#')[1]) > -1) {
    $(window.location.hash).click();
  } else {
    $('#age').click();
  }
});

window.addEventListener('resize', updateChart);

// trigger download
$('#csv-download').click(function () {

});
