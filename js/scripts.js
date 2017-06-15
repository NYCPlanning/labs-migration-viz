
function renderChart(el, data) {
  var clientRect = d3.select(el).node().getBoundingClientRect();
  var yMin = -300000,
      yMax = 300000;

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 10, bottom: 30, left: 10},
      width = clientRect.width - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;

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

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.label; }));
  y.domain([yMin, yMax]);

  // append the background rectangles
  svg.selectAll(".out")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar out")
      .attr("x", function(d) { return x(d.label); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return y(0) - y(d.out); });

  // append the inflow rectangles
  svg.selectAll(".in")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) {
        return 'bar in ' + d.label
      })
      .attr("x", function(d) { return x(d.label); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.in); })
      .attr("height", function(d) { return y(0) - y(d.in); })
      .on('mouseenter', function(d) {
      });

  // append the outflow rectangles
  svg.selectAll(".out")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar out")
      .attr("x", function(d) { return x(d.label); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return y(0) - y(d.out); });


  // append net migration dots
  svg.selectAll(".net")
      .data(data)
    .enter().append("circle")
      .attr("class", "net")
      .attr("cy", function(d) {
        var net = d.in - d.out;
        return y(net);
      })
      .attr("cx", function(d) { return x(d.label) + (x.bandwidth()/2); })
      .attr("r", 3)
      .attr("fill", "black");

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

function renderBigChart(data) {
  var clientRect = d3.select('body').node().getBoundingClientRect();

  var yMin = -300000,
      yMax = 300000;

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 10, bottom: 30, left: 10},
      width = clientRect.width - 30 - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;


  var svg = d3.select('.container-fluid').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // .append("g")
    // .attr("transform",
    //       "translate(" + margin.left + "," + margin.top + ")");

  var outerX = d3.scaleBand()
    .domain(Object.keys(data))
    .range([0, width])
    .padding(0.1);

  var g = svg.selectAll('g')
    .data(Object.keys(data))
    .enter()
    .append("g")
    .attr("class", "subbox")
    .attr("transform", function(d) {
      return "translate(" + outerX(d) + "," + margin.top + ")";
    });


    // set the ranges
    var x = d3.scaleBand()
              .domain(data['1935_1940'].map(function(d) { return d.label; }))
              .range([0, width/6])
              .padding(0.1);
    var y = d3.scaleLinear()
              .domain([yMin, yMax])
              .range([height, 0]);


  g.selectAll(".in")
  .data(function(d) { return data[d]; })
  .enter().append("rect")
  .attr("class", function(d) {
    return 'bar in ' + d.label
  })
  .attr("x", function(d) { return x(d.label); })
  .attr("width", x.bandwidth())
  .attr("y", function(d) { return y(d.in); })
  .attr("height", function(d) { return y(0) - y(d.in); })
  .on('mouseenter', function(d) {
  });

  // append the background rectangles
  g.selectAll(".out")
    .data(function(d) { return data[d]; })
    .enter().append("rect")
      .attr("class", "bar out")
      .attr("x", function(d) { return x(d.label); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return y(0) - y(d.out); });


      // append net migration dots
      g.selectAll(".net")
        .data(function(d) { return data[d]; })
        .enter().append("circle")
          .attr("class", "net")
          .attr("cy", function(d) {
            var net = d.in - d.out;
            return y(net);
          })
          .attr("cx", function(d) { return x(d.label) + (x.bandwidth()/2); })
          .attr("r", 3)
          .attr("fill", "black");


}

// get the data
d3.json("data/age.json", function(error, data) {
  if (error) throw error;
  // renderChart(".second", data['1935_1940']);
  // renderChart(".third", data['1975_1980']);
  // renderChart(".fourth", data['1985_1990']);
  // renderChart(".fifth", data['1995_2000']);
  // renderChart(".sixth", data['2010_2014']);

  renderBigChart(data);

});

window.addEventListener('resize', function() {
  console.log('resize!')
});
