import "./styles.css";

const carousels = document.querySelectorAll(".yo-carousel");

function init() {
  for (let carousel of carousels) {
    const images = carousel.querySelectorAll(".yo-carousel img");
    const strip = document.createElement("div");
    strip.classList.add("carousel-strip");

    const cells = [];
    for (let img of images) {
      const cell = document.createElement("div");
      cell.classList.add("carousel-cell");
      cell.appendChild(img);
      cells.push(cell);
    }
    strip.append(...cells);
    carousel.appendChild(strip);
  }
}

init();
