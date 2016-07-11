// basic size vars to use later
var width = 400,
    height = 400,
    radius = 200,
    // ordinal scale for colors
    colors = d3.scale.ordinal()
      // range of colors to use
      .range([ 'blue', 'green', 'orange', 'pink', 'yellow' ]);

// data to use later
var piedata = [
  {
    label: 'Barot',
    value: 50
  },
  {
    label: 'Gerard',
    value: 50
  },
  {
    label: 'Jennifer',
    value: 50
  },
  {
    label: 'Tom',
    value: 50
  },
  {
    label: 'Barber',
    value: 50
  },
  {
    label: 'Aron',
    value: 50
  },
  {
    label: 'Brownie',
    value: 50
  },
  {
    label: 'Allen',
    value: 50
  }
]

// layout for D3 pie (like rect?)
// data needs to flow through this to be understood by D3
var pie = d3.layout.pie()
  .value(function(d) {
    return d.value;
  })

// define how angles (pie shapes) are going to look
// basic shape only needs outerRadius
var arc = d3.svg.arc()
  .outerRadius(radius);

// create pie chart
// append to divID chart2 and append an svg
var myChart2 = d3.select('#chart2').append('svg')
  // width of chart should be width var and height
  .attr('width', width)
  .attr('height', height)
  // put into own grouping
  .append('g')
  // adjust the X and Y axis
  .attr('transform', 'translate('+(width - radius)+' , '+(height - radius)+')')
  // feed the data to myChart2 - need the above var pie to pass the data through
  .selectAll('path').data(pie(piedata))
  // making the paths we select below (slice)
  .enter().append('g')
    .attr('class', 'slice')


// this selects all of the g groups with the class slice
var slices = d3.selectAll('g.slice')
  .append('path')
    // function that passes along information for cycling through the colors array
    .attr('fill', function(d, i) {
      return colors(i);
    })
    .attr('d', arc)

// this creates the text for the names
// selects all g's that have the class slice
var text = d3.selectAll('g.slice')
  // appending text
  .append('text')
  // text function
  .text(function(d, i) {
    // return d (the data) .data .label (check console - its like data.response.docs)
    return d.data.label;
  })
  // attribute to format text - where the text is placed - this is an SVG attribute
  .attr('text-anchor', 'middle')
  // color filling for text
  .attr('fill', 'purple')
  // moving the text depending on the position of the slices
  .attr('transform', function(d) {
    d.innerRadius = 0;
    d.outerRadius = radius;
    // centroid finds the center of the data for each one of the slices
    return 'translate(' +arc.centroid(d)+ ')'
  })
