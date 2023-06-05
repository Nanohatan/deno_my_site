import {getToken,  GoogleAuth,} from "https://deno.land/x/googlejwtsa@v0.1.8/mod.ts";
import { load } from "https://deno.land/std@0.185.0/dotenv/mod.ts";
import { Handlers } from "$fresh/server.ts";
const env = await load();
// const googleServiceAccountCredentials= await Deno.readTextFile(
//   "./logical-signer-388402-adaa9a4cdb52.json",
// );
const private_key_id = env["private_key_id"];
const private_key = env["private_key"];
const googleServiceAccountCredentials = `{
  "type": "service_account",
  "project_id": "logical-signer-388402",
  "private_key_id": "${Deno.env.get("private_key_id")||private_key_id}",
  "private_key": "${Deno.env.get("private_key")||private_key}",
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

const now = new Date();
const spreadsheetId = '12B3a_jRE0O_R6k2kgZXpmWgMVn83-JTMjk9-wNkGXnY'; // スプレッドシートのID
const range = 'Sheet1!A1:B'; // 読み込むセルの範囲

export const handler: Handlers = {
    async GET(req) {
      const url = new URL(req.url); 
      
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`, {
        headers: {
            Authorization: `Bearer ${token.access_token}`, // 認証トークンをヘッダーに含めます。
        },
    });
    const month = url.searchParams.get("month");
    const gapiData = await response.json();
    
    const filteredDate = gapiData.values.filter((rows:string[]) => {
        const date = new Date(rows[0]);
        if (month){
          return date.getMonth() === Number(month)-1;
        }else{
          return date.getMonth() === now.getMonth();
        }// 6月の場合は月の値が5になります（0から始まるため）
      });
      const tmpJson = filteredDate.map((row:string[]) => {
        const obj: { [key: string]: string } = {};
        for (let i = 0; i < gapiData.values[0].length; i++) {
          obj[gapiData.values[0][i]] = row[i];
        }
        return obj;
      });
    return Response.json(tmpJson);
    },
  };