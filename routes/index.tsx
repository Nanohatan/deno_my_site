import { Head } from "$fresh/src/runtime/head.ts";
import { Handlers,PageProps } from "$fresh/server.ts";
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
  return (
    <>
      <Head>
        <title>Home</title>
        <link href="/index.css" rel="stylesheet" ></link>

      </Head>
      
      <div class="container justify-content-center border border-dark">
      <div class="row">
      <div class="col card" id="calendar"></div>
      </div>

      <div class="row">
  
        <div class="col">
        <div class="playing-card">
          <div class="card-inner">
            <div class="card-front" style="font-size: 5rem;">&#x1f984;</div>
            <div class="card-back"style="font-size: 5rem;">&#x1f98f;</div>
          </div>
        </div>
        </div>

      </div>
      
      </div>
      <script type="text/javascript" src="/index.js"></script>
    </>
  );
}
