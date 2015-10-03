import fs from "fs";
import { Maybe } from "monet";
import { compose, map, curry, zipObj, slice, filter } from "ramda";

let denodify = f =>
  (...args) =>
    new Promise((resolve, reject) =>
      f(...args, (err, val) => err ? reject(err) : resolve(val))
    );

let readdir = denodify(fs.readdir);

// String -> Maybe[Object]
function parser(f){
  let regex = /^s([\d]+)_n([\d]+)_k([\d]+)_r([\d]+)_([\d]+).([\w]+).csv$/;
  let keys = ["filename","steps", "order", "initialOrder", "runs", "seed", "type"];

  // Awesome monet + ramda!
  // It would be just more awesome if ramda
  // chooses to use Maybe.map when we use map(Maybe...)
  return Maybe.
    fromNull(f.match(regex)).
    map(slice(0,7)).
    map(zipObj(keys));
}

// List[Maybe[Object]] ->  List[Object]
//
let somes = compose(
  map( v => v.some() ),
  filter( v => v.isSome() )
);

// Returns a JSON given a directory with experiments
// ( String -> Maybe[Object] ) -> String -> List[Object]
async function extractMetadata (parse, directory){
  let files = await readdir(directory);
  let metadata = somes(
    map(
      parse,
      files)
  );

  return metadata;
}

export default curry(extractMetadata)(parser);
