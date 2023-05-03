import { JSX } from "preact";
import { Head } from "$fresh/src/runtime/head.ts";
import { Handlers,PageProps } from "$fresh/server.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
interface Card{
  id: string;
  name: string;
  img_url: string;
}

export const handler: Handlers<Card[]> = {
  async GET(_,ctx){
    const card: Card[] = [
      {
        id:"1",
        name:"てすてす1",
        img_url:"https://dummyimage.com/300.png/09f/fff",
      },
      {
        id:"2",
        name:"てすてす2",
        img_url:"https://dummyimage.com/300.png/09f/fff",
      }
    ];
    return await ctx.render(card);
  }, 
}


export default function Page({data}:PageProps<Card[]>) {
  const api_key= config()["API"];
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div class="flex justify-center items-center h-screen">
        <div class="mb-16 mx-8 text-center">
        <span class="text-3xl font-bold text-black mb-3">my collections</span>
        {data.map((card)=>(
          <div class="block m-3" style="position:relative;">
            <img src= {card.img_url} class="" style="width:100%" alt="item image"/>
            <div class="bg-gray-300 font-bold" style="position:absolute; top:8px; left:16px;">{card.name}</div>
          </div>
        ))}        
        </div>
      </div>


    </>
  );
}
