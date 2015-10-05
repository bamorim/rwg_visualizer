import Chart from "./Chart.js";
import ScatterChart from "./ScatterChart.js";

let Log10Grid = (SuperChart) => class Log10Grid extends SuperChart {
  _gridTicks(){
    let { xScale, yScale } = this._scales();
    let only10power = function(x) { return Math.log10(x) % 1 == 0 };
    var xGridTicks = xScale.ticks().filter(only10power);
    var yGridTicks = yScale.ticks().filter(only10power);
    return {xGridTicks, yGridTicks};
  }
}

let TickGrid = (SuperChart) => class TickGrid extends SuperChart {
  _gridTicks(){
    let { xScale, yScale } = this._scales();
    var xGridTicks = xScale.ticks();
    var yGridTicks = yScale.ticks();
    return {xGridTicks, yGridTicks};
  }
}

export default { Chart, Log10Grid, ScatterChart, TickGrid };
