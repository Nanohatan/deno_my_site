async function getG(){
  const response = await fetch('/api/gapi');
  const date = await response.json();
  return date;
}

function createCalendar(progress) {
  const exerciseList = progress.map(p => {
    if (p["フィットボクシング"]!=undefined){
      return parseInt(p["date"].slice(-2), 10);
    }else{
      return 0;
    }
  });

  const calendar = document.getElementById("calendar");
  // カレンダーの日付を作成
  const firstDayOfMonth = new Date(progress[0]["date"]);
  const lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(),firstDayOfMonth.getMonth()+1,0);
  const currentDate = new Date();
  // カレンダーの年と月を取得
  const year = firstDayOfMonth.getFullYear();
  const month = firstDayOfMonth.getMonth();
  
  // カレンダーのHTMLを生成
  const calendarTable = document.createElement("table");
  calendar.appendChild(calendarTable);
  const headerRow = document.createElement("tr");
  const headerRowYear = document.createElement("tr");
  calendarTable.appendChild(headerRowYear);
  calendarTable.appendChild(headerRow);

  const thYear = document.createElement("th");
  thYear.setAttribute("colSpan", "7");
  thYear.textContent = year+ "年 " + (month + 1) + "月";
  headerRowYear.appendChild(thYear);

  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  daysOfWeek.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    headerRow.appendChild(th);
  });

  // 日付を埋める
  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const td = document.createElement("td");
      if (i===0 && j<firstDayOfMonth.getDay()){
        td.textContent = "";
        row.appendChild(td);
      }else if(date>lastDayOfMonth.getDate()){
        td.textContent = "";
        row.appendChild(td);
      }else{
        td.textContent = date;
        if (date ===currentDate.getDate()){
          td.className = "today";
        }
        if (exerciseList.includes(date)){
          td.classList.add("exercise");
        }
        row.appendChild(td);
        date++;
      }
      
      
    }
    calendarTable.appendChild(row);
  }
}
getG().then(progress => createCalendar(progress));


