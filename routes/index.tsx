import { Head,PageProps } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
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
    return ctx.render(card);
  },
  
}


export default function Home({data}:PageProps<Card[]>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
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
