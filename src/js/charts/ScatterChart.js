import Chart from "./Chart";
import { compose } from "ramda";

class ScatterChart extends Chart {
  _plot(){
    let { data, xValue, yValue, color, cValue } = this.props;
    let { xScale, yScale } = this._scales();
    let g = this.svg.append('g')
      .attr('class','d3-points');

    let point = g.selectAll('.d3-point')
      .data(data);

    point.enter().append('circle')
      .attr('class', 'd3-point');

    point
      .attr('cx', compose(xScale, xValue))
      .attr('cy', compose(yScale, yValue))
      .style('fill', compose(color,cValue))
      .attr('r', 3);
    ;

    point.exit()
      .remove();
  }
}

export default ScatterChart;
