const images = [...document.querySelectorAll(".image")];
const areas = [...document.querySelectorAll(".item")];
const panel = document.querySelector("span");
const wrapper = document.querySelector(".wrapper");
const btn = document.createElement("button");
btn.textContent = "Zagraj ponownie!";
const svgArray = [
  "images/chicken.svg",
  "images/chips.svg",
  "images/cookie.svg",
  "images/hot-dog.svg",
  "images/muffin.svg",
  "images/peach.svg",
  "images/pizza.svg",
  "images/watermelon.svg",
];

let temp = [0, 0, 0, 0, 0, 0, 0, 0];
let counter = 0;
let time = 0;
let active = false;
let idI;

const numberGenerator = () => {
  const random = Math.floor(Math.random() * svgArray.length);
  return random;
};
images.forEach((image) => {
  let number = numberGenerator();
  if (temp[number] === 2) {
    while (temp[number] === 2) {
      number = numberGenerator();
    }
  }
  temp[number]++;
  image.src = svgArray[number];
});

function reset() {
  areas.forEach((area) => {
    area.style.backgroundColor = "#8c8680";
    area.style.border = "#bfbbb4 2px solid";
    area.style.transform = "none";
    const child = area.children;
    child.item(0).style.opacity = "0%";
  });
}

const arr = [];
const arr2 = [];
let count = 0;
areas.forEach((area) =>
  area.addEventListener("click", (e) => {
    timer();
    arr.push(e.target.src);
    arr2.push(e.target.parentNode);
    console.log(arr2);
    const child = area.children;
    child.item(0).style.animation = "animation 1s";
    child.item(0).style.opacity = "100%";
    counter++;
    area.style.transform = "rotateX(180deg)";
    area.style.border = "#bfbbb4 2px solid";
    area.style.backgroundColor = "#bfbbb4";
    if (counter == 2 && arr[0] != arr[1]) {
      changePointerClass();
      setTimeout(() => reset(), 1000);
      setTimeout(() => changePointerClass(), 1000);
      counter = 0;
      arr.length = 0;
      arr2.length = 0;
    }
    if (counter == 2 && arr[0] == arr[1]) {
      arr2[0].style.opacity = "0%";
      arr2[1].style.opacity = "0%";
      arr2[0].classList.add("no-pointer");
      arr2[1].classList.add("no-pointer");
      counter = 0;
      arr.length = 0;
      arr2.length = 0;
      count++;
      if (count === 8) {
        stopTimer();
        wrapper.appendChild(btn);
        btn.addEventListener("click", () => location.reload());
      }
    }
  })
);

const changePointerClass = () => {
  areas.forEach((area) => area.classList.toggle("no-pointer"));
};

const timer = () => {
  if (!active) {
    active = !active;
    idI = setInterval(start, 10);
  }
};

const start = () => {
  time++;
  panel.textContent = (time / 100).toFixed(2);
};

const stopTimer = () => {
  clearInterval(idI);
};
