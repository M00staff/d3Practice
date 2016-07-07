// data is emplty array
var bardata = [];



// // create fake data with for loop
// for (var i = 0; i < 100; i++) {
//   bardata.push(Math.round(Math.random()*100)+40)
// }
//
//
// // sort data so it appears in order
// bardata.sort(function compareNumbers(a, b) {
//   return a-b;
// })

// this grabs the data - everything else is a part of the data's callback
d3.tsv('data.tsv', function(data) {

  for (key in data) {
    bardata.push(data[key].value)
  }

  // set values for margins
  var margin = {
    top: 30,
    right: 30,
    bottom: 40,
    left: 50
  }


  // variables for bar size added in margins
  var height = 400 - margin.top - margin.bottom,
    width = 600 - margin.left - margin.right,
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
    // .2 argument is for space in between rects
    // 1 is for padding on the ends
    // cant remember what range bands do
    .rangeBands([0, width], .2, 1 )


  // creating the tooltip var that is used below
  var tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', '0')



  // creates and appends the SVG to the div ID chart
  // throw in var so i can call myChart.transition() later instead of adding .transition to all this
  var myChart = d3.select('#chart').append('svg')
    // set a style so we can see the background of the SVG vs the chart
    .style('background', '#E7E0CB')
    // width/height of background SVG plus extra margin
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    // .style('background', '#C9D7D6')
    // puts this data in a Group (g)
    .append('g')
    // moving the graph over by x and y position (margin left and right)
    .attr('transform', 'translate( '+ margin.left +' , '+ margin.right +')')
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



    // the following makes the Y axis tick marks go from 0 upwards to 100
  var vGuideScale = d3.scale.linear()
    // i think this means the data to use
    .domain([0, d3.max(bardata)])
    // this is what changes it from 100 upwards to 0 and flips it
    .range([height, 0])


  // creating vertical tick mark bar
  var vAxis = d3.svg.axis()
    // telling it what data to use
    .scale(vGuideScale)
    // where this thing will appear on the chart
    .orient('left')
    // number of tick marks for the tick mark bar
    .ticks(10)


  // this creates the element in the existing chart
  var vGuide = d3.select('svg').append('g') // selecting the svg and putting what is below in a g group
    // links vGuide with vAxis (above)
    vAxis(vGuide)
    // styling transform - moves it, translate marginLeft from left and marginTop from top (x, y)
    vGuide.attr('transform', 'translate( ' + margin.left + ' , ' +margin.top+ ')')
    // select path - rectangle area around left ticks and style it
    vGuide.selectAll('path')
      .style({ fill: 'none', stroke: '#000' })
    // select the line elements and add little dashes to it
    vGuide.selectAll('line')
      .style({ stroke: '#000' })


  // this is for making the horizontal guide
  var hAxis = d3.svg.axis()
    // this will give the numbers of the bottom values
    .scale(xScale)
    // where the numbers will go
    .orient('bottom')
    // setting tick values and want a certain amount of ticks - calculation is to make tick marks dependant on
    // amount of data, and certain amount of divisions based on range
    //          this filter method allows us to only get a few of these numbers, not every single value
    .tickValues(xScale.domain().filter(function(d, i) {
      // this returns not! a number every 5th amount of data you have
      return !(i % (bardata.length / 5));
    }))


  // see vGuide comments
  var hGuide = d3.select('svg').append('g')
    hAxis(hGuide)
    hGuide.attr('transform', 'translate('+ margin.left +', '+ (height + margin.top) +')')
    hGuide.selectAll('path')
      .style({ fill: 'none', stroke: '#000' })
    // select the line elements and add little dashes to it
    hGuide.selectAll('line')
      .style({ stroke: '#000' })



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
