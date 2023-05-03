import {PageProps } from "$fresh/server.ts";
import {Head} from "$fresh/runtime.ts";
import * as workersHtml from "https://deno.land/x/workers_html@v2.0.0-pre.13/index.ts";


export default function Detail(props: PageProps) {
  const params = props.params
  return (
    <>
    <Head>
      <title>{params.name}</title></Head>
    <body>
      <div class="fs-1">{params.name}</div>
    </body>
    </>
  )
}
