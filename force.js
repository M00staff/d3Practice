// main height and width
var w = 700,
    h = 400;

// how wide the node circles will be
var circleWidth = 5;

var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",
      "darkblue": "#0A2933",
      "darkerblue": "#042029",
      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05"
  }

//
var nodes = [
  {
    // parent node
    name: 'Parent'
  },
  {
    name: 'child1'
  },
  {
    // if node is connected to other nodes - we put what node its connected to (its parent)
    name: 'child2', target: [0]
  },
  {
    name: 'child3', target: [0]
  },
  {
    name: 'child4', target: [1]
  },
  {
    // a node that is connected to multiple other nodes
    name: 'child5', target: [0, 1, 2, 3]
  }
];

// source (connection from one node to other nodes) and target elements
var links = [];

// loop through nodes
for (var i = 0; i < nodes.length; i++) {
  // make sure that the node target exists
  if (nodes[i].target !== undefined) {
    // if does then go through each target array and feed into links array
    for (var x = 0; x < nodes[i].target.length; x++) {
      // pushing into links
      links.push({
        // which is an array of objects
        source: nodes[i],
        target: nodes[nodes[i].target[x]]
      })
    }
  }
}

// creates graphic inside of html ID
var myChart3 = d3.select('#chart3')
  // append svg and set size (of svg)
  .append('svg')
  .attr('width', w)
  .attr('height', h)

// creating force - like rect
var force = d3.layout.force()
  // nodes that we made - force requires something for these
  .nodes(nodes)
  // these will be created dynamically so we use an empty array for now
  .links([])
  // gravity and charge are settings for the physics
  .gravity(0.1)
  .charge(-1000)
  // size for the force graphic
  .size([w, h])

// create a selection for things you are going to draw
var link = myChart3.selectAll('line')
  // passing along data - which is the links we made in the for loop above - entering that data and appending line
  .data(links).enter().append('line')
  // and then pass in an attribute
  .attr('stroke', palette.gray)

// variable for each node
var node = myChart3.selectAll('circle')
  // pass in the data (nodes that we made above - enter it)
  .data(nodes).enter()
  // throw it into a group
  .append('g')
  // calls force that we already created with parameters with the way we want the links and nodes to behave
  // the drag makes them automatically clickable and dragable
  .call(force.drag)

// this is linking to - myChart3.selectAll('circle')
node.append('circle')
  // what the dimensions of the x and y and radius of circles(nodes) are
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', circleWidth)
  // color of the nodes
  .attr('fill', function(d, i) {
    if (i > 0) { return palette.pink}
    else { return palette.blue}
  })

// adding the text to the nodes
node.append('text')
  // d3 text method - built in
  // this function returns name parameter of the node var we created above
  .text(function(d) { return d.name })

  // this adds attributes to the names
  .attr('font-family', 'arial')

  // filling color for nodes
  .attr('fill', function(d, i) {
    // if node is not parent node then do whatever color
    // i is index in the array - parent, child 1 , etc, etc
    if (i > 0) { return palette.mediumgray}
    else { return palette.yellowgreen}
  })

  // modify the x position of the node conditionally based on which node it is (parent or not)
  .attr('x', function(d, i) {
    if (i > 0) { return circleWidth + 40}
    else { return circleWidth - 45}
  })

  // y position of node conditionally based on which one it is (parent or child)
  .attr('y', function(d, i) {
    if (i > 0) { return circleWidth}
    else { return 8}
  })

  // text on what side of node
  .attr('text-anchor', function(d, i) {
    if (i > 0) { return 'begining'}
    else { return 'end'}
  })

  .attr('font-size', function(d, i) {
    if (i > 0) { return '1em'}
    else { return '1.8em'}
  })

// tick is timing of javascript (tick toc) - as each tick happens run this function
force.on('tick', function(e) {
  // event that happens as time passes - we want to animate each dot
  node.attr('transform', function(d, i) {
    // move the circles by a certain amount as time passes depending on how they are treated (clicked or not)
    return 'translate(' +d.x+ ', ' +d.y+ ')';
  })

// this needs to be in the tick cause we want to see it while the animation is running
// the link is the connections of nodes (lines)
  link
    // links are svg lines - connections will have an x1 x2 and y1 y2 postion depending on what they connect
    .attr('x1', function(d) { return d.source.x })
    .attr('y1', function(d) { return d.source.y })
    .attr('x2', function(d) { return d.target.x })
    .attr('y2', function(d) { return d.target.y })

})

// runs the animation
force.start();
