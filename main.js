const html =
  '<div id="re00" class="Region"></div><div class="Region" id="re01"></div><div class="Region" id="re02"></div><div class="Region" id="re03"></div><div class="Region" id="re04"></div><div class="Region" id="re05"></div>';
const ScorePic = '<img src="DianaYes.jpg" class="GameIMG">';
const introduction =
  '·Click "start" to start the game\n·Click "pause" to pause the game\n·Click "back" to return to the game\n·Click "reset" and then click "start" to restart the game\n·The first block corresponds to the "A" key\n·The second block corresponds to the "S" key\n·The third block corresponds to the "D" key\n·The fourth block corresponds to the ",<" key\n·The fifth block corresponds to the ".>" key\n·The sixth block corresponds to "/?" key\n·Game time is 30 seconds';
let flag = [
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1],
];
var score = 0,
  ingame = 0,
  first = 0;
var Time, Start, Score, Time, Diana;
var time = 29,
  dottime = 1.0;
var timer;
var now, nowt, before;
var add = 1,
  dtime = 0,
  dtimesum = 0,
  ddottime = 0,
  ddottimesum = 0;

Game = document.getElementById("Game");
Score = document.getElementById("Score");
Start = document.getElementById("Start");
Time = document.getElementById("Time");
Diana = document.getElementById("Diana");


function Update() {
  Diana.src = "DianaLike.jpg";
  var temp, _temp;
  temp = document.getElementById("re5");
  temp.parentNode.removeChild(temp);
  for (let i = 4; i >= 0; i--) {
    flag[i + 1] = flag[i];
    temp = document.getElementById("re" + String(i));
    for (let j = 0; j < 6; j++) {
      _temp = document.getElementById("re" + String(i) + String(j));
      _temp.id = "re" + String(i + 1) + String(j);
    }
    temp.id = "re" + String(i + 1);
  }
  flag[0] = [0, 0, 0, 0, 0, 0];
  var div = document.createElement("div");
  div.className = "edge";
  div.id = "re0";
  div.innerHTML = html;
  Game.prepend(div);
  score = score + 1;
  Score.innerHTML = String(score);
  let k = Math.trunc(Math.random() * 6);
  flag[0][k] = 1;
  document.getElementById("re0" + String(k)).className = "ScoreRegion";
  document.getElementById("re0" + String(k)).innerHTML = ScorePic;
}

function GetKey() {
  document.addEventListener("keyup", function (e) {
    if (ingame == 1) {
      if (e.code == "KeyA" && flag[5][0] == 1) Update();
      else if (e.code == "KeyS" && flag[5][1] == 1) Update();
      else if (e.code == "KeyD" && flag[5][2] == 1) Update();
      else if (e.code == "Comma" && flag[5][3] == 1) Update();
      else if (e.code == "Period" && flag[5][4] == 1) Update();
      else if (e.code == "Slash" && flag[5][5] == 1) Update();
      else {
        Diana.src = "DianaSad.jpg";
        Time.innerHTML = "0:00";
        ingame = 0;
        Start.innerHTML = "Start";
        alert("Game has ended!\nYour score:" + score+".");
        score = 0;
        Score.innerHTML = String(score);
      }
    }
    console.log(e.code);
  });
}

GetKey();

Start.addEventListener("click", function () {
  if (ingame == 0) {
    Reset();
    ingame = 1; 
    Start.innerHTML = "Pause";
    before = new Date().getTime();
  } else if (ingame == 1) {
    ingame = 2; 
    Start.innerHTML = "Back";
  } else if (ingame == 2) {
    ingame = 1;
    Start.innerHTML = "Pause";
  }
});

function Reset() {
  Diana.src = "DianaCheer.jpg";
  ingame = 0;
  score = 0;
  Score.innerHTML = String(score);
  Start.innerHTML = "Start";
  Time.innerHTML = "0:00";
  before = new Date().getTime();
  time = 29;
  dtimesum = dtime = 0;
  add = 0;
}

document.getElementById("Restart").addEventListener("click", function () {
  Reset();
});

document.getElementById("Introduction").addEventListener("click", function () {
  alert(introduction);
});

timer = setInterval(() => {
  if (time > 0) {
    if (first == 1) first = 0;
    if (ingame == 2) {
      nowt = new Date().getTime();
      dtime = Math.floor((nowt - now) / 1000);
      ddottime = Math.floor((nowt - now) / 10);
      add = 0;
    } else if (ingame == 1) {
      now = new Date().getTime();
      time = 29 - Math.floor((now - before) / 1000);
      dottime = 100 - (Math.floor((now - before) / 10) % 100);
      if (add == 0) {
        add = 1;
        dtimesum = dtimesum + dtime;
        ddottimesum = ddottimesum + ddottime;
      }
      time = time + dtimesum;
      Time.innerHTML = time + ":" + dottime;
    }
  } else if (time == 0 && first == 0) {
    first = 1;
    alert("Game has ended!\nYour score:" + score+".");
    Reset();
  }
});
