window.addEventListener("load", bindevents);
let buttons;
function bindevents() {
  buttons = document.getElementsByTagName("button");
  for (let button of buttons) {
    button.addEventListener("click", XorO);
  }
}

isEmpty = (btn) => buttons[btn].innerText.length == 0;
function getEmptyEdgesMiddle() {
  var rd = 0;
  do {
    rd = Math.floor(Math.random() * 10);
  } while ((rd != 1 && rd != 3 && rd != 5 && rd != 7) || !isEmpty(rd));
  return rd;
}

function isTwoSame(one, two, three, player) {
  if (
    buttons[one].innerText === buttons[two].innerText &&
    buttons[one].innerText === player &&
    buttons[three].innerText === ""
  ) {
    return three;
  } else if (
    buttons[two].innerText === buttons[three].innerText &&
    buttons[two].innerText === player &&
    buttons[one].innerText === ""
  ) {
    return one;
  } else if (
    buttons[three].innerText === buttons[one].innerText &&
    buttons[three].innerText === player &&
    buttons[two].innerText === ""
  ) {
    return two;
  }
  return false;
}

function checkWinning(player) {
  var chance = isTwoSame(0, 3, 6, player);
  if (chance !== false) {
    return chance;
  }

  chance = isTwoSame(1, 4, 7, player);
  if (chance !== false) {
    return chance;
  }

  chance = isTwoSame(2, 5, 8, player);
  if (chance !== false) {
    return chance;
  }

  chance = isTwoSame(0, 1, 2, player);
  if (chance !== false) {
    return chance;
  }

  chance = isTwoSame(3, 4, 5, player);
  if (chance !== false) {
    return chance;
  }

  chance = isTwoSame(6, 7, 8, player);
  if (chance !== false) {
    return chance;
  }

  chance = isTwoSame(0, 4, 8, player);
  if (chance !== false) {
    return chance;
  }

  chance = isTwoSame(2, 4, 6, player);
  if (chance !== false) {
    return chance;
  }
  return false;
}

function getAdjacentbtn(btn) {
  var min = parseInt(btn / 3) * 3;
  var max = min + 3;
  if (btn + 1 >= min && btn + 1 < max && isEmpty(btn + 1)) {
    return btn + 1;
  } else if (btn - 1 >= min && btn - 1 < max && isEmpty(btn - 1)) {
    return btn - 1;
  } else if (btn - 3 >= 0 && isEmpty(btn - 3)) {
    return btn - 3;
  } else if (btn + 3 < 9 && isEmpty(btn + 3)) {
    return btn - 3;
  }
}

function getEmptyRandom(){
  var rd = Math.floor(Math.random() * 9);
  while(buttons[rd].innerText.length > 0)
  {
    rd = Math.floor(Math.random() * 10);
  }
  return rd;
}

let rd;
function getComputer() {
  if (count == 1) {
    if (isEmpty(4)) {
      buttons[4].innerText = "O";
      rd = 4;
    } else {
      rd = getEmptyEdgesMiddle();
      buttons[rd].innerText = "O";
    }
    count++;
    flag = !flag;
  } 
  else if (count == 3) {
    var turn = checkWinning("X");
    if (turn !== false) {
      buttons[turn].innerText = "O";
    } else {
      var chance = getAdjacentbtn(rd);
      buttons[chance].innerText = "O";
    }
    count++;
    flag = !flag;
  } 
  else {
    var turn = checkWinning("O");
    if (turn !== false) {
      buttons[turn].innerText = "O";
    } else {
      turn = checkWinning("X");
      if (turn !== false) {
        buttons[turn].innerText = "O";
      }
      else{
        buttons[getEmptyRandom()].innerText = "O";
      }
    }
    count++;
    flag = !flag;
  }
}

function isSame(one, two, three) {
  return (
    buttons[one].innerText === buttons[two].innerText &&
    buttons[one].innerText === buttons[three].innerText
  );
}

function isSameRow(one, two, three) {
  if (
    !isEmpty(one) &&
    !isEmpty(two) &&
    !isEmpty(three) &&
    isSame(one, two, three)
  ) {
    return true;
  }
  return false;
}

function isGameOver() {
  if (isSameRow(0, 3, 6)) {
    return true;
  } else if (isSameRow(1, 4, 7)) {
    return true;
  } else if (isSameRow(2, 5, 8)) {
    return true;
  } else if (isSameRow(0, 1, 2)) {
    return true;
  } else if (isSameRow(3, 4, 5)) {
    return true;
  } else if (isSameRow(6, 7, 8)) {
    return true;
  } else if (isSameRow(0, 4, 8)) {
    return true;
  } else if (isSameRow(2, 4, 6)) {
    return true;
  } else {
    return false;
  }
}

function reset() {
  count = 0;
  flag = true;
  for (let button of buttons) {
    button.innerText = "";
  }
  isOver = false;
  document.getElementById("result").innerText = "";
}

var flag = true;
let count = 0;
var isOver = false;
function XorO() {
  if (this.innerText === "") {
    this.innerText = "X";
    flag = !flag;
    count++;
  }

  if (count >= 5) {
    isOver = isGameOver();
    if (isOver) {
      var winner = !flag === true ? "X" : "O";
      document.getElementById("result").innerText = `Game over : ${winner} Wins`;
      setTimeout(reset, 3000);
    }
  }
  if (count < 9 && !isOver) setTimeout(getComputer,500);

  if (count >= 5 && !isOver) {
    isOver = isGameOver();
    if (isOver) {
      var winner = !flag === true ? "X" : "O";
      document.getElementById("result").innerText = `Game over : ${winner} Wins`;
      setTimeout(reset, 3000);
    }
  }

  if (count >= 9) {
    document.getElementById("result").innerText = "Game Draw";
    setTimeout(reset, 3000);
  }
}
