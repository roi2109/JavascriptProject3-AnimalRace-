"use-strict";
let runners = [
  //   dog: {
  //     name: "dog",
  //     id: "dog",
  //     voice: "woof",
  //     img: "dog.gif",
  //     step: 50,
  //   },
];
function Runner(name, id, voice, img, step, pos = 10) {
  {
    this.name = name;
    this.id = id;
    this.voice = voice;
    this.img = img;
    this.step = step;
    this.pos = pos;
  }
  makeSound;
}
let dog = new Runner(
  "dog",
  "dog",
  "woof",
  "https://img.freepik.com/premium-vector/design-bigol-animated-dog-sitting_469988-3.jpg",
  Math.floor(Math.random() * 30) + 25
);
let horse = new Runner(
  "horse",
  "horse",
  "neigh",
  "https://thumbs.dreamstime.com/z/horse-cartoon-drawing-vector-illustration-funny-cute-painted-brown-blue-eyes-isolated-white-background-animated-c-121143800.jpg",
  // Returns a random integer from 1 to 10:
  Math.floor(Math.random() * 30) + 25
);
let duck = new Runner(
  "duck",
  "duck",
  "quack",
  "https://img.freepik.com/premium-vector/duck-cartoon_119631-40.jpg?w=2000",
  Math.floor(Math.random() * 30) + 25
);
let chick = new Runner(
  "chick",
  "chick",
  "cheap",
  "https://img.freepik.com/premium-vector/cool-chicken_6460-729.jpg?w=2000",
  Math.floor(Math.random() * 30) + 25
);

runners.push(dog, horse, duck, chick);

let card = document.querySelector(".cards-container");
card.style.right = 50;
function createCards(arr) {
  for (let key of arr) {
    let element = document.createElement("div");
    element.classList.add(...["my-3"]);
    element.innerHTML = ` <div style="width:50px" id="${key.id}" dir="ltr" onclick="makeSound(id)"  class="my-5" >
    <img  style="height:80px; width:80px"  src="${key.img}"alt="${key.name}'s img" />
 
  </div>`;

    card.appendChild(element);
  }
}

const dogAudio = new Audio("sounds/dogsound.wav");
const horseAudio = new Audio("sounds/horsesound.wav");
const duckAudio = new Audio("sounds/ducksound.mp3");
const chickenAudio = new Audio("sounds/chickensound.wav");

createCards(runners);
let chosenRunner = document.querySelector(".chosen-runner");
function makeSound(id) {
  switch (id) {
    case "dog":
      dogAudio.play();
      dogAudio.currentTime = 0;
      chosenRunner.innerHTML = `${id} is chosen`;
      enlargeImg(0);

      break;
    case "horse":
      horseAudio.play();
      horseAudio.currentTime = 0;
      chosenRunner.innerHTML = `${id} is chosen`;
      enlargeImg(1);
      break;
    case "duck":
      duckAudio.play();
      duckAudio.currentTime = 0;
      chosenRunner.innerHTML = `${id} is chosen`;
      enlargeImg(2);
      break;
    case "chick":
      chickenAudio.play();
      chickenAudio.currentTime = 0;
      chosenRunner.innerHTML = `${id} is chosen`;
      enlargeImg(3);

      break;
  }
}
function enlargeImg(i) {
  card.children[i].children[0].children[0].style.width = 100 + "px";
  card.children[i].children[0].children[0].style.height = 100 + "px";
  setTimeout(() => {
    card.children[i].children[0].children[0].style.width = 80 + "px";
    card.children[i].children[0].children[0].style.height = 80 + "px";
  }, 2000);
}

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", startGame);
let gameInterval;
let isGameOn = false;
function startGame() {
  if (isGameOn) return;
  isGameOn = true;
  gameInterval = setInterval(() => {
    for (let key of runners) {
      key.pos += key.step;
      let div = document.getElementById(`${key.id}`);
      div.style.right = key.pos + "px";
      if (key.pos >= 1050) {
        clearInterval(gameInterval);
        chosenRunner.innerHTML = `${key.id} is winner!🥇`;
        isGameOn = false;
      }
    }
  }, 500);
}

let resetGameButton = document.querySelector(".reset");
resetGameButton.addEventListener("click", resetGame);
function resetGame() {
  chosenRunner.innerHTML = "";
  console.log("start", isGameOn);

  if (isGameOn) return;
  for (let key of runners) {
    key.pos = 10;
    let div = document.getElementById(`${key.id}`);
    div.style.right = key.pos + "px";
    key.step = Math.floor(Math.random() * 30) + 25;
    isGameOn = false;
  }
  console.log("end", isGameOn);
}
