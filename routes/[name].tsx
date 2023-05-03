import {PageProps } from "$fresh/server.ts";
import {Head} from "$fresh/runtime.ts";
export default function Detail(props: PageProps) {
  const params = props.params
  return (
  <div>
    <Head><title>{params.name}の詳細</title></Head>

    {params.name}
  </div>);
}
