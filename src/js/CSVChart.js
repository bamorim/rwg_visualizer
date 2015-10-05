import React from "react";
import {Maybe} from "monet";
import {ScatterChart, Log10Grid, TickGrid} from "./charts";
import d3 from "d3";
let Chart = TickGrid(ScatterChart);

async function getData(){
  let response = await fetch("data/s19_n100000_k3_r1000_98237.degrees.csv");
  return response.text();
}

function parseCSV(csv){
  let lines = csv.split("\n").map( (l) => l.split(",") );
  let header = lines[0];
  let data = lines.slice(1);
  return { header, data };
}

class CSVChart extends React.Component {
  constructor(props){
    window.Maybe = Maybe;
    super(props);
    this.state = {
      data: null
    }
  }
  componentWillMount(){
    getData().then( data => {
      this.setState({data});
    });
  }

  render(){
    let plot = Maybe.fromNull(this.state.data)
      .map(parseCSV)
      .map((data) => {
        return <Chart
            data={data.data}
            xValue={(d)=>d[0]}
            yValue={(d)=>d[1]}
            xScale={d3.scale.log().domain([1,383])}
            yScale={d3.scale.log().domain([1,65278456])}
          />
      }).val;
    return <div>{plot}</div>;
  }
}

export default CSVChart;
