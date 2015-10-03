import React from "react";

let fields = ["steps", "order", "initialOrder", "seed", "type"];
async function getMetadata(){
  let response = await fetch("metadata.json");
  return response.json();
}

import { map, keys, curry, filter, contains, allPass } from "ramda";
let checkProps = curry(
  (checkFn, conditions) => allPass(
    map(
      (key) => (file) => checkFn(conditions[key], file[key]),
      keys(conditions)
    )
  )
);
let checkInvariants = checkProps( (inv, val) => inv == val );
let checkSelections = checkProps(
  ({type, value}, fieldVal) => {
    switch(type){
      case "some":
        return contains(fieldVal, value)
        break;
      case "one":
        return fieldVal == value;
        break;
      default:
        return true;
        break;
    }
  }
);

function selectFiles({ invariants, selections }, files){
  let filterInvariants = filter(checkInvariants(invariants));
  let filterSelections = filter(checkSelections(selections));
  return filterInvariants(filterSelections(files));
};


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      metadata: { files: [] },
      plot: {
        invariants: {
          order: 1000000,
          initialOrder: 3,
          runs: 1000,
          seed: 98237,
          type: "degrees"
        },
        selections: {
          steps: {
            type: "some",
            value: ["1", "2"]
          }
          /* other examples:
          steps: {
            type: "all"
          },
          steps: {
            type: "one",
            value: 1
          },
          steps: {
            type: "animate",
            value: 500 // value in ms/frame
          }
          */
        }
      }
    }
    var ci = window.ci = checkInvariants(this.state.plot.invariants);
    console.log("SANITY CHECKINGS");
    console.log(ci({foo: "bar"}));
  }

  componentDidMount(){
    getMetadata().then( metadata => {
      this.setState({metadata});
    })
  }

  render(){
    let { metadata } = this.state;
    //let { files } = metadata;
    let files = selectFiles(this.state.plot, metadata.files);
    return <div>
      <h1>Hello World!</h1>
      { files.map( f => 
        <h2>{f.filename}</h2>
      )}
    </div>;
  }
}

export default App;
