import {PageProps } from "$fresh/server.ts";
export default function Detail(props: PageProps) {
    const params = props.params
    return new Response("../../static/test/v1/number-guessing-game.html");
  }