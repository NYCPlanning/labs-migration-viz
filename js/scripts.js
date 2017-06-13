// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.json("data/age.json", function(error, data) {
  if (error) throw error;

  // // // format the data
  // data.age.forEach(function(d) {
  //   d.out = +d.out;
  // });

  var age = data.age

  console.log(age);

  // Scale the range of the data in the domains
  x.domain(age.map(function(d) { return d.label; }));
  y.domain([
    -d3.max(age, function(d) { return d.out; }),
    d3.max(age, function(d) { return d.in; })
  ]);

  // append the inflow rectangles
  svg.selectAll(".in")
      .data(age)
    .enter().append("rect")
      .attr("class", "bar in")
      .attr("x", function(d) { return x(d.label); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.in); })
      .attr("height", function(d) { return y(0) - y(d.in); });

  // append the outflow rectangles
  svg.selectAll(".out")
      .data(age)
    .enter().append("rect")
      .attr("class", "bar out")
      .attr("x", function(d) { return x(d.label); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return y(0) - y(d.out); });


  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});
