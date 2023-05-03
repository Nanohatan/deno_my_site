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


export default function Home({data}:PageProps<Card[]>) {
  const api_key= config()["API"];
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <h1>my collections</h1>
        {data.map((card)=>(
          <div>
            <h2><a href={card.name}>{card.name}</a></h2>
            <img
            src= {card.img_url}
            class="w-32 h-32"
            alt="card image"
            />
          </div>
        ))}
      </div>


    </>
  );
}
