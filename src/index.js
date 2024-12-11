import "./styles.css";

const carousel = document.querySelector(".yo-carousel");
const images = document.querySelectorAll(".yo-carousel img");

const carouselWidth = carousel.clientWidth;
const carouselHeight = carousel.clientHeight;

const strip = document.createElement("div");
strip.classList.add("carousel-strip");
strip.style.setProperty("grid-template-rows", `${carouselHeight}px`);
strip.style.setProperty("grid-auto-columns", `${carouselWidth}px`);

const cells = [];
for (let img of images) {
  const cell = document.createElement("div");
  cell.classList.add("carousel-cell");
  cell.appendChild(img);
  cells.push(cell);
}
strip.append(...cells);
carousel.appendChild(strip);
