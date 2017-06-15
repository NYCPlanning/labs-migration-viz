function renderChart(data) {
  var clientRect = d3.select('body').node().getBoundingClientRect();

  var yMin = -300000;
  var yMax = 300000;

  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 10, bottom: 30, left: 10 };
  var width = clientRect.width - 30 - margin.left - margin.right;
  var height = 250 - margin.top - margin.bottom;

  // x scale to render each chart across the same axis
  var outerX = d3.scaleBand()
    .domain(Object.keys(data))
    .range([0, width])
    .padding(0.1);

  // local x scale
  var x = d3.scaleBand()
    .domain(data['1935_1940'].map(function (d) { return d.label; }))
    .range([0, width / 6])
    .padding(0.1);

  // local y scale
  var y = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0]);

  // add main svg element
  var svg = d3.select('.container-fluid').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  var g = svg.selectAll('g')
    .data(Object.keys(data))
    .enter()
    .append('g')
    .attr('class', 'subbox')
    .attr('transform', function (d) {
      return 'translate(' + outerX(d) + ',' + margin.top + ')';
    });

  // append the inflow rectangles
  g.selectAll('.in')
    .data(function (d) { return data[d]; })
    .enter()
    .append('rect')
      .attr('class', function (d) { return 'bar in ' + d.label; })
      .attr('x', function (d) { return x(d.label); })
      .attr('width', x.bandwidth())
      .attr('y', function (d) { return y(d.in); })
      .attr('height', function (d) { return y(0) - y(d.in); });

  // append the outflow rectangles
  g.selectAll('.out')
    .data(function (d) { return data[d]; })
    .enter()
    .append('rect')
      .attr('class', 'bar out')
      .attr('x', function (d) { return x(d.label); })
      .attr('width', x.bandwidth())
      .attr('y', function () { return y(0); })
      .attr('height', function (d) { return y(0) - y(d.out); });

  // append net migration dots
  g.selectAll('.net')
    .data(function (d) { return data[d]; })
    .enter()
    .append('circle')
      .attr('class', 'net')
      .attr('cy', function (d) {
        var net = d.in - d.out;
        return y(net);
      })
      .attr('cx', function (d) { return x(d.label) + (x.bandwidth() / 2); })
      .attr('r', 3)
      .attr('fill', 'black');
}

// get the data
d3.json('data/age.json', function (error, data) {
  if (error) throw error;

  renderChart(data);
});

window.addEventListener('resize', function () {});
