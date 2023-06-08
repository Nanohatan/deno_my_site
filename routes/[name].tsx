import {PageProps } from "$fresh/server.ts";
import {Head} from "$fresh/runtime.ts";

const textResponse = await fetch("https://wakuwaku.deno.dev/api/joke");
const textData = await textResponse.text();
console.log(textData);
export default function Detail(props: PageProps) {

  return (
    <>
    <h3>{textData}</h3>
    <iframe src="test/v1/number-guessing-game.html" width="100%" height="800px"></iframe>
    </>
  )
}