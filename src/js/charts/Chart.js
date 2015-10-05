import React from "react";
import { dot } from "../util.js";
import d3 from "d3";

class Chart extends React.Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired
  }

  componentDidMount() {
    this._initialize();
    this._addAxis();
    this._addGrid();
    this._plot();
    this._drawLegend();
  }

  static defaultProps = {
    width: 800,
    height: 800,
    margin: {top: 20, right: 20, bottom: 30, left: 40},

    color: d3.scale.category10(),

    cValue: ()=>"Plot",

    xValue: dot('x'),
    xLabel: "X",

    yValue: dot('y'),
    yLabel: "Y"
  }
 
  render(){
    return <div/>;
  }

  innerWidth() {
    let { margin } = this.props;
    return this.props.width - margin.left - margin.right;
  }

  innerHeight(){ 
    let { margin } = this.props;
    return this.props.height - margin.top - margin.bottom;
  }

  _initialize(){
    let { margin } = this.props;
    let el = React.findDOMNode(this);

    // ADD SVG
    this.svg = d3.select(el).append('svg')
      .attr('class','d3')
      .attr('width', this.props.width)
      .attr('height', this.props.height)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  }

  _addAxis(){
    let { xScale, yScale } = this._scales();
    let xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(0, ".1s");

    let yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(0, ".1s");

    this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.innerHeight() + ")")
      .call(xAxis);

    this.svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
  }

  _scales(){
    var {xDomain, yDomain, xScale, yScale} = this.props;

    if(typeof xScale != "function") {
      xScale = d3.scale.linear().domain([0.1,100000])
    }
    if(typeof xScale.range == "function"){
      xScale = xScale.range([0, this.innerWidth()])
    }

    if(typeof yScale != "function"){
      yScale = d3.scale.linear().domain([0.1,100000])
    }
    if(typeof yScale.range == "function"){
      yScale = yScale.range([this.innerHeight(), 0])
    }

    return {xScale, yScale};
  }

  _gridTicks(){
    let xGridTicks = [];
    let yGridTicks = [];
    return {xGridTicks, yGridTicks};
  }

  _addGrid(){
    let { yGridTicks, xGridTicks } = this._gridTicks();
    let { xScale, yScale } = this._scales();

    this.svg.selectAll("line.horizontalGrid").data(xGridTicks).enter()
    .append("line")
    .attr(
      {
        "class":"horizontalGrid",
        "x1" : 0,
        "x2" : ::this.innerWidth,
        "y1" : yScale,
        "y2" : yScale,
        "fill" : "none",
        "shape-rendering" : "crispEdges",
        "stroke" : "black",
        "stroke-width" : "1px"
      });
    this.svg.selectAll("line.verticalGrid").data(yGridTicks).enter()
    .append("line")
    .attr(
      {
        "class":"verticalGrid",
        "x1" : xScale,
        "x2" : xScale,
        "y1" : 0,
        "y2" : ::this.innerHeight,
        "fill" : "none",
        "shape-rendering" : "crispEdges",
        "stroke" : "black",
        "stroke-width" : "1px"
      });
  }

  _plot(){
  }

  _drawLegend(){
    let { color } = this.props;
    let width = this.innerWidth();
    var legend = this.svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    // draw legend text
    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})
  }
}

export default Chart;
