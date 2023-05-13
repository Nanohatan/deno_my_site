import {PageProps } from "$fresh/server.ts";
import {Head} from "$fresh/runtime.ts";
export default function Detail(props: PageProps) {
  return (
    <>
    <iframe src="test/v1/number-guessing-game.html" width="100%" height="800px"></iframe>
    </>
  )
}