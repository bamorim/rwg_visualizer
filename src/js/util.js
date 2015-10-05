import { curry } from "ramda";
let dot = curry((attr, obj) => obj[attr])
export default { dot };
