// // カレンダーを表示する関数
// function showCalendar() {
//   const calendar = document.getElementById("calendar");
  
//   // 現在の日付を取得
//   const currentDate = new Date();
  
//   // カレンダーの年と月を取得
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();
  
//   // 月の最初の日を取得
//   const firstDay = new Date(year, month, 1);
  
//   // 月の最終日を取得
//   const lastDay = new Date(year, month + 1, 0);
  
//   // カレンダーのHTMLを生成
//   let calendarHTML = "<table>";
//   calendarHTML += "<tr><th colspan='7'>" + year + "年 " + (month + 1) + "月</th></tr>";
//   calendarHTML += "<tr><th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th></tr>";
  
//   // 日付を埋める
//   let date = 1;
//   for (let i = 0; i < 6; i++) {
//     calendarHTML += "<tr>";
//     for (let j = 0; j < 7; j++) {
//       if (i === 0 && j < firstDay.getDay()) {
//         // 先月の日付
//         calendarHTML += "<td></td>";
//       } else if (date > lastDay.getDate()) {
//         // 来月の日付
//         calendarHTML += "<td></td>";
//       } else {
//         // 現在の月の日付
//         let cellClass = "";
//         if (date === currentDate.getDate()) {
//           // 現在の日付に星マークを付ける
//           cellClass = "today";
//         }
//         calendarHTML += "<td class='" + cellClass + "'>" + date + "</td>";
//         date++;
//       }
//     }
//     calendarHTML += "</tr>";
    
//     // 全ての日付を表示したら終了
//     if (date > lastDay.getDate()) {
//       break;
//     }
//   }
  
//   calendarHTML += "</table>";
  
//   // カレンダーを表示
//   calendar.innerHTML = calendarHTML;
// }

// // カレンダーを表示する
// showCalendar();
async function getG(){
  const response = await fetch('/api/gapi');
  const date = await response.json();
  return date;
}

function createCalendar(progress) {
  lastDay = progress.length;
  const calendar = document.getElementById("calendar");
  // カレンダーの日付を作成
  const firstDayOfMonth = new Date(progress[0]["date"]);
  const lastDayOfMonth = new Date(progress[lastDay-1]["date"]);
  const currentDate = new Date(firstDayOfMonth);
  // カレンダーの年と月を取得
  const year = firstDayOfMonth.getFullYear();
  const month = firstDayOfMonth.getMonth();
  
  // カレンダーのHTMLを生成
  let calendarHTML = "<table>";
  calendarHTML += "<tr><th colspan='7'>" + year + "年 " + (month + 1) + "月</th></tr>";
  calendarHTML += "<tr><th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th></tr>";
  
  // 日付を埋める
  let date = 1;
  for (let i = 0; i < 6; i++) {
    calendarHTML += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth.getDay()) {
        // 先月の日付
        calendarHTML += "<td></td>";
      } else if (date > lastDayOfMonth.getDate()) {
        // 来月の日付
        calendarHTML += "<td></td>";
      } else {
        // 現在の月の日付
        let cellClass = "";
        if (date === currentDate.getDate()) {
          // 現在の日付にマークを付ける
          cellClass = "today";
        }
        calendarHTML += "<td class='" + cellClass + "'>" + date + "</td>";
        date++;
      }
    }
    calendarHTML += "</tr>";
    
    // 全ての日付を表示したら終了
    if (date > lastDayOfMonth.getDate()) {
      break;
    }
  }

  
  calendarHTML += "</table>";
  
  // カレンダーを表示
  calendar.innerHTML = calendarHTML;
}
getG().then(progress => createCalendar(progress));


