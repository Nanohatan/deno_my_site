import { Head } from "$fresh/src/runtime/head.ts";
import { Handlers,PageProps } from "$fresh/server.ts";
import {getToken,  GoogleAuth,} from "https://deno.land/x/googlejwtsa@v0.1.8/mod.ts";
import { config} from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { load } from "https://deno.land/std@0.185.0/dotenv/mod.ts";

const env = await load();
// const googleServiceAccountCredentials= await Deno.readTextFile(
//   "./logical-signer-388402-adaa9a4cdb52.json",
// );
const private_key_id = env["private_key_id"];
const private_key = env["private_key"];
const googleServiceAccountCredentials = `{
  "type": "service_account",
  "project_id": "logical-signer-388402",
  "private_key_id": "${Deno.env.get(private_key_id)}",
  "private_key": "${Deno.env.get(private_key)}",
  "client_email": "read-35@logical-signer-388402.iam.gserviceaccount.com",
  "client_id": "111975552713551719960",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/read-35%40logical-signer-388402.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}`;

const googleAuthOptions = {
  scope:['https://www.googleapis.com/auth/spreadsheets.readonly'], // 必要なスコープを指定します。, // array of Google's endpoint URLs
};

const token: GoogleAuth = await getToken(
  googleServiceAccountCredentials,
  googleAuthOptions,
);

const spreadsheetId = '12B3a_jRE0O_R6k2kgZXpmWgMVn83-JTMjk9-wNkGXnY'; // スプレッドシートのID
const range = 'Sheet1!A1'; // 読み込むセルの範囲

const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`, {
  headers: {
    Authorization: `Bearer ${token.access_token}`, // 認証トークンをヘッダーに含めます。
  },
});

const data = await response.json();
console.log('Cell Value:', data.values[0][0]);

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
            <div class="card-front" style="font-size: 5rem;">&#x1f984;
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
            </div>
            <div class="card-back"style="font-size: 5rem;">&#x1f98f;</div>
          </div>
        </div>
        </div>

        <div class="col">

    <pre id="content" style="white-space: pre-wrap;"></pre>
        </div>
      </div>
      
      </div>
      
      
    <script src="https://apis.google.com/js/api.js"></script>

    <script type="text/javascript" src="/index.js"></script>
    </>
  );
}
