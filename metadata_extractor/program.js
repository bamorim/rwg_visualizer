import extractMetadata from "./extract_metadata";
export default async function program (){
  try {
    let metadata = await extractMetadata(process.argv[2]);
    console.log(JSON.stringify(metadata));
  } catch (e) {
    console.log(e);
  }
}
