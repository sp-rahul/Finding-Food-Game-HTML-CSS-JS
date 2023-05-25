let FOOD;
let CURRENT_POS = 0;
let ROW = 11;
let UN_VISITED = [];
let FOOD_POSITION;
let TOTAL_SCORE = 0;
const meal = document.createElement("div");
meal.classList.add("food-appear");

const myPosition = document.createElement("div");
myPosition.classList.add("myMove");

const Board = (row = 5) => {
  console.log(row);
  let board = document.getElementById("board");
  board.innerHTML = "";
  UN_VISITED = [];
  board.style.cssText += `
  grid-template-columns: repeat(${row}, 1fr);
  grid-template-rows: repeat(${row}, 1fr);`;
  let pos = 0;
  // let child = ``
  let child = []

  for (let x = 0; x < row; x++) {
    for (let y = 0; y < row; y++) {
      UN_VISITED.push(pos);

      child += `<div class="${
        (x + y) % 2 ? "colored-w" : "colored-b"
      }" id="${pos}">
      </div>`;

      pos = pos + 1;
    }
  }

  board.insertAdjacentHTML("beforeend", child);
  UN_VISITED.splice(0, 1);
  placeFood();
  myMove();
};

const placeFood = async () => {
  let food = getRandomItem(UN_VISITED, 1);
  FOOD_POSITION = food;
  foodDisplay(food);
};

function getRandomItem(UN_VISITED, num) {
  const shuffled = [...UN_VISITED].sort(() => 0.5 - Math.random());
  console.log(shuffled.slice(0, num));
  return shuffled.slice(0, num)[0];
}

const foodDisplay = (food) => {
  console.log("food", food, UN_VISITED);
  let foodPosition = document.getElementById(`${food}`);
  foodPosition.appendChild(meal);
};

const myMove = (curPosition = 0) => {
  if (UN_VISITED.length <= 0) {
    alert(`GAME OVER & SCORE IS : ${TOTAL_SCORE} `);
    myCurrentPosition = document.getElementById(`${curPosition}`);
    myCurrentPosition.replaceChild(meal, myPosition);
    return;
  }

  const index = UN_VISITED.indexOf(curPosition);
  if (index > -1) {
    UN_VISITED.splice(index, 1);
  }

  myCurrentPosition = document.getElementById(`${curPosition}`);
  myCurrentPosition.classList.add("visited");
  myCurrentPosition.appendChild(myPosition);
};

document.addEventListener("keydown", (event) => {
  //left
  let temPos = CURRENT_POS % ROW;
  if (event.keyCode == 37 && CURRENT_POS > 0 && temPos != 0) {
    CURRENT_POS -= 1;
  }

  //top
  else if (event.keyCode == 38 && CURRENT_POS >= ROW) {
    CURRENT_POS -= ROW;
  }

  //right
  else if (
    event.keyCode == 39 &&
    CURRENT_POS < ROW * ROW &&
    temPos != ROW - 1
  ) {
    CURRENT_POS += 1;
  }

  //bottom
  else if (event.keyCode == 40 && CURRENT_POS <= ROW * (ROW - 1)) {
    CURRENT_POS += ROW;
  }

  checkFoodEatenOrNot();
});

const checkFoodEatenOrNot = () => {
  myMove(CURRENT_POS);
  if (FOOD_POSITION == CURRENT_POS) {
    TOTAL_SCORE = TOTAL_SCORE + 1;
    console.log("total val", TOTAL_SCORE);
    document.getElementById("score").innerHTML = TOTAL_SCORE;
    placeFood();
  }
};

Board(ROW);

const myRowsize = (event) => {
  ROW = parseInt(document.getElementById("number").value);
  Board(ROW);
};
