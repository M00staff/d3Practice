// basic size vars to use later
var width = 400,
    height = 400,
    radius = 200,
    colors = d3.scale.category20c();

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
  },
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
  // making the paths we selected above
  .enter().append('path')
    // fucntion that passes along information, has to do with colors?
    .attr('fill', function(d, i) {
      return colors(i);
    })
    .attr('d', arc)
