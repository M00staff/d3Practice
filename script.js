// data is emplty array
var bardata = [];

// create fake data with for loop
for (var i = 0; i < 100; i++) {
  bardata.push(Math.random()*30)
}

// variables for bar size
var height = 400,
  width = 600,
  barWidth = 50,
  barOffset = 5;

// maps colors based on bardata length - 4 x axis values map to 4 colors in range
var colors = d3.scale.linear()
  .domain([0, bardata.length*.33, bardata.length*.66, bardata.length])
  .range(['#185dd1', '#991cc6', '#36ff32', '#da1b1b'])

// fits data onto Y axis
var yScale = d3.scale.linear()
  .domain([0, d3.max(bardata)])
  .range([0, height])

// fits data on X axis
var xScale = d3.scale.ordinal()
  .domain(d3.range(0, bardata.length))
  .rangeBands([0, width])

// creates and appends the SVG to the div ID chart
d3.select('#chart').append('svg')
  // width/height of background
  .attr('width', width)
  .attr('height', height)
  .style('background', '#C9D7D6')
  // this makes a rectangle barchart (rect) with the data and appends it to the svg
  .selectAll('rect').data(bardata)
  .enter().append('rect')
    // d is data and i is index - styling the filling with the color map (above) returning it by index?
    .style('fill', function(d, i) {
      return colors(i);
    })
    // fitting the data within both axis
    .attr('width', xScale.rangeBand)
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('x', function(d, i) {
      return xScale(i);
    })
    .attr('y', function(d) {
      return height - yScale(d);
    })
    // mouse over and mouse off events
    .on('mouseover', function(d) {
      tempColor = this.style.fill;
      d3.select(this)
        // .transition()
        // .delay(100).duration(500)
        .style('opacity', .5)
        .style('fill', 'yellow')
    })
    .on('mouseout', function(d) {
      d3.select(this)
        // .transition()
        .style('opacity', 1)
        .style('fill', tempColor)
    })


// var svg = d3.select('#chartArea').append('svg')
//   .attr('width', 400)
//   .attr('height', 300);
//
// var multiplier = 8;
//
//   svg.selectAll('rect')
//     .data(dataset)
//     .enter()
//     .append('rect')
//     .attr('class', 'bar')
//     .attr('x', function (d) {
//       return 300 - d * multiplier;
//     })
//     .attr('width', 20)
//     .attr('height', function (d) {
//       return d * multiplier;
//     });
