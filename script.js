// data is emplty array
var bardata = [];

// create fake data with for loop
for (var i = 0; i < 100; i++) {
  bardata.push(Math.round(Math.random()*30)+40)
}

// sort data
bardata.sort(function compareNumbers(a, b) {
  return a-b;
})


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
// the scales remap the data to fit into the height of the box
var yScale = d3.scale.linear()
  .domain([0, d3.max(bardata)])
  .range([0, height])

// fits data on X axis
// the scales remap the data to fit into the height of the box
var xScale = d3.scale.ordinal()
  .domain(d3.range(0, bardata.length))
  .rangeBands([0, width])

// creating the tooltip var that is used below
var tooltip = d3.select('body').append('div')
  .style('position', 'absolute')
  .style('padding', '0 10px')
  .style('background', 'white')
  .style('opacity', '0')


// creates and appends the SVG to the div ID chart
// throw in var so i can call myChart.transition() later instead of adding .transition to all this
var myChart = d3.select('#chart').append('svg')
  // width/height of background
  .attr('width', width)
  .attr('height', height)
  // .style('background', '#C9D7D6')
  // puts this data in a Group (g)
  .append('g')
  // this makes a rectangle barchart (rect) with the data and appends it to the svg
  .selectAll('rect').data(bardata)
  .enter().append('rect')
    // d is data and i is index - styling the filling with the color map (above) returning it by index?
    .style('fill', function(d, i) {
      return colors(i);
    })
    // fitting the height and width of the data within both axis
    // the scales remap the data to fit into the height of the box
    .attr('width', xScale.rangeBand
    )
    .attr('x', function(d, i) {
      return xScale(i);
    })
    .attr('height', 0)
    .attr('y', height)
    // mouse over and mouse off events
    .on('mouseover', function(d) {

      tooltip.transition()
        .style('opacity', '.9')

      // adding the tooltip
      tooltip.html(d)
        // event pageX and Y are basing the location of the tooltip on the mouse
        .style('left', (d3.event.pageX - 35) + 'px')
        .style('top', (d3.event.pageY - 30) + 'px')

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

// animation stuff
myChart.transition()
  // animates displaying the height
  .attr('height', function(d) {
    return yScale(d);
  })
  .attr('y', function(d) {
    return height - yScale(d);
  })
  // delays the left to right somehow?
  .delay(function(d, i) {
    return i * 20;
  })
  .duration(1000)
  // built in animation
  .ease('elastic')



  // the following makes the Y axis tick marks
var vGuideScale = d3.scale.linear()
  .domain([0, d3.max(bardata)])
  .range([height, 0])

var vAxis = d3.svg.axis()
  .scale(vGuideScale)
  .orient('left')
  .ticks(10)

var vGuide = d3.select('svg').append('g')
  vAxis(vGuide)
  vGuide.attr('transform', 'translate(35, 0)')
  vGuide.selectAll('path')
    .style({ fill: 'none', stroke: '#000' })
  vGuide.selectAll('line')
    .style({ stroke: '#000' })





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
