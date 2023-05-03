import { UnknownPageProps } from "$fresh/server.ts";
import { tw } from 'twind'
export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <div>
    <h1 class={tw`font-bold`}>
    404 not found: {url.pathname}
    </h1>
    </div>


  );
}