function renderChart(el, data) {
  var yMin = -300000,
      yMax = 300000;

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 10, bottom: 30, left: 10},
      width = 300 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(el).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");



  // // // format the data
  // data.age.forEach(function(d) {
  //   d.out = +d.out;
  // });



  console.log(data);

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.label; }));
  y.domain([yMin, yMax]);

  // append the inflow rectangles
  svg.selectAll(".in")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar in")
      .attr("x", function(d) { return x(d.label); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.in); })
      .attr("height", function(d) { return y(0) - y(d.in); });

  // append the outflow rectangles
  svg.selectAll(".out")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar out")
      .attr("x", function(d) { return x(d.label); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return y(0) - y(d.out); });


  // add non-labeled x-axis line at 0

  svg.append("line")
    .attr("class", "center-axis")
    .attr("x1", 0 )
    .attr("y1", y(0))
    .attr("x2", width)
    .attr("y2", y(0))
    .attr("width", width);

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // // add the y Axis
  // svg.append("g")
  //     .call(d3.axisLeft(y));


}

// get the data
d3.json("data/age.json", function(error, data) {
  if (error) throw error;
  renderChart("body", data['1935_1940']);
  renderChart("body", data['1975_1980']);
  renderChart("body", data['1985_1990']);
  renderChart("body", data['1995_2000']);
  renderChart("body", data['2010_2014']);
});
