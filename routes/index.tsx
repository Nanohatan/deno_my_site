import { Head } from "$fresh/src/runtime/head.ts";
import { Handlers,PageProps } from "$fresh/server.ts";
import React from "https://dev.jspm.io/react";

interface Progress {
  date: string;
  フィットボクシング: string;
}
const jsonResponse = await fetch("https://wakuwaku.deno.dev/api/gapi");
const jsonData = await jsonResponse.json();
// export const handler: Handlers<Progress | null> = {
//   async GET(_, ctx) {
//     const resp = await fetch(`https://wakuwaku.deno.dev/api/gapi`);
//     if (resp.status === 404) {
//       return ctx.render(null);
//     }
//     const p: Progress = await resp.json();
//     return ctx.render(p);
//   },
// };

export default function Page(){
  
    const renderCell = (dateData:Progress) => {
      const day = parseInt(dateData.date.slice(-2), 10);
      const today = new Date().getDate();
      if (dateData["フィットボクシング"] === "〇") {
        return <td className="exercise">{day}</td>;
      } else if (day === today) {
        return <td className="today">{day}👀</td>;
      } else {
        return <td>{day}</td>;
      }
    };
  
  return (
    <>
      <Head>
        <title>Home</title>
        <link href="/index.css" rel="stylesheet" ></link>

      </Head>

      
      <div class="container justify-content-center border border-dark">
      <div class="row">
        {jsonData.map((j:Progress,index:number) => {
          const now = new Date();
          const d = parseInt(j.date.slice(-2), 10);
          if (now.getDate()===d){
            return (
              <h2>今日は{j.date}</h2>
            );
          }
        })}
      </div>
      <div class="row">
      <div class="col card" id="calendar">

      </div>
      </div>

      <div class="row" >
        <div class="col" >
        <div class="card" style="margin:auto; ">
          <div class="card-body">
            <h5 class="card-title">&#127939;フィットボクシング</h5>
            <h6 class="card-subtitle mb-2 text-muted">daily exercise</h6>
            <p class="card-text">Fit Boxing 2</p>
          </div>
        </div>
        </div>

        <div class="col">
        <div class="card" style="margin:auto; ">
          <div class="card-body">
            <h5 class="card-title">&#x1f440;読書、映画鑑賞</h5>
            <h6 class="card-subtitle mb-2 text-muted">hobby</h6>
            <a href="#" class="card-link">感想ノート</a>
          </div>
        </div>
        </div>


      </div>
      
      </div>
      
      
    <script src="https://apis.google.com/js/api.js"></script>

    <script type="text/javascript" src="/index.js" defer></script>
    </>
  );
}
