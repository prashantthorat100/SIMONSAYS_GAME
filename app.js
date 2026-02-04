let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highestScore = 0;
let gamesPlayed = 0;
let h3 = document.querySelector("h3");
let colorbtns = ["red", "green", "yellow", "blue"];
let div = document.querySelectorAll(".btn");
let h4 = document.querySelector('h4');

// Hide score display initially
h4.style.display = 'none';
document.addEventListener("keypress", function () {
  if (started === false) {
    console.log("Game is started");
    started = true;
    lvlup();
  }
});

function gameflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 400);
}
function userflash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 100);
}

function lvlup() {
  level = level + 1;
  userSeq = [];
  h3.innerText = `Level ${level}`;
  let ranIdx = Math.floor(Math.random() * 3);
  let randcolor = colorbtns[ranIdx];
  let randBtn = document.querySelector(`.${randcolor}`);

  //   console.log(ranIdx);
  //   console.log(randcolor);
  //   console.log(randBtn);
  gameSeq.push(randcolor);
  // console.log(gameSeq);

  gameflash(randBtn);
}

function checkAns(idx) {
  // console.log("Current level:", level);
  // let idx = level-1 ;
  if (gameSeq[idx] === userSeq[idx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(lvlup, 1000);
    }
  } else {
    let currentScore = (level * 10) - 10;
    gamesPlayed++;
    
    // Update highest score
    if (currentScore > highestScore) {
      highestScore = currentScore;
    }
    
    h3.innerText = `Game over! Press any key to start`;
    
    // Show score display after first game
    if (gamesPlayed >= 1) {
      h4.style.display = 'block';
      h4.innerText = `Highest Score: ${highestScore}`;
    }
    
    document.querySelector("body").style.backgroundColor = "red"
    setTimeout(function(){
      document.querySelector("body").style.backgroundColor = "white";
    },500);
    reset();
  }
}

function btnPress() {
  // Only allow button clicks if game has started
  if (!started) {
    return;
  }
  
  let clickedBtn = this;
  userflash(clickedBtn);

  let userColor = clickedBtn.getAttribute("id");
  // console.log(userColor);
  userSeq.push(userColor);
  // console.log(userSeq);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
