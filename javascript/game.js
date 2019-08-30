let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
const startButton = document.getElementById("start");

const botDoorPath = "https://i.imgur.com/C5sMnEc.png";
const beachDoorPath = "https://i.imgur.com/ZlL5zOz.png";
const spaceDoorPath = "https://i.imgur.com/0I7ng7s.png";

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

const closedDoorPath = "https://i.imgur.com/caxAsgo.png";

var currentlyPlaying = true;

// Определяем бота в двери
const isBot = door => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

// Делаем дверь кликабельной только 1 раз
const isClicked = door => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
};

// Проверяем условие выигрыша
const playDoor = door => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    return gameOver("win");
  } else if (isBot(door) === true) {
    return gameOver();
  }
};

// Генератор случайных дверей
const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor3 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = spaceDoorPath;
    openDoor3 = beachDoorPath;
  } else if (choreDoor === 2) {
    openDoor3 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  }
};

doorImage1.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};

doorImage2.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

doorImage3.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = "Good luck!";
  randomChoreDoorGenerator();
};

startButton.onclick = () => {
  if (currentlyPlaying === false) {
    startRound();
  }
};

// Cтатус игры
const gameOver = status => {
  if (status === "win") {
    startButton.innerHTML = "You win! Play again?";
  } else {
    startButton.innerHTML = "Game over! Play again?";
  }
  currentlyPlaying = false;
};

startRound();
