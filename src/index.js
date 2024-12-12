import "./styles.css";

const carouselsNodes = document.querySelectorAll(".yo-carousel");
const carousels = [];

class CarouselController {
  currentImageIndex = 0;
  view = null;
  size = 0;
  constructor(view) {
    this.view = view;
    this.size = this.view.size;
  }

  setupListeners() {
    //todo: hook up controller functions to view buttons
  }

  displayNext() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.size;
    this.view.displayIndex(this.currentImageIndex);
  }

  displayPrevious() {
    this.currentImageIndex =
      this.currentImageIndex == 0 ? this.size - 1 : this.currentImageIndex - 1;
    this.view.displayIndex(this.currentImageIndex);
  }

  displayIndex(index) {
    this.view.displayIndex(index);
  }
}

class CarouselView {
  carouselNode = null;
  strip = null;
  size = 0;
  nextButton = null;
  prevButton = null;
  indexButtons = [];

  constructor(carouselNode) {
    //saving so that we can dynamically read size on display
    this.carouselNode = carouselNode;
    this.#generateStrip();
    // this.#generateNavButtons();
    // this.#generatePageButtons();
  }

  //sets size and strip
  #generateStrip() {
    const strip = document.createElement("div");
    strip.classList.add("carousel-strip");
    const images = this.carouselNode.querySelectorAll(".yo-carousel img");
    const cells = [];
    for (let img of images) {
      const cell = document.createElement("div");
      cell.classList.add("carousel-cell");
      cell.appendChild(img);
      cells.push(cell);
    }
    strip.append(...cells);
    this.carouselNode.appendChild(strip);

    this.strip = strip;
    this.size = cells.length;
  }

  #generateNavButtons() {
    //todo : create and set next/prev buttons
  }

  displayIndex(index) {
    if (index >= this.size) {
      throw new Error("Index out of carousel bounds");
    }

    const carouselWidth = this.carouselNode.offsetWidth;
    this.strip.style.left = `${-(carouselWidth * index)}px`;
  }
}

function init() {
  for (let carouselNode of carouselsNodes) {
    const view = new CarouselView(carouselNode);
    const carousel = new CarouselController(view);
    carousel.setupListeners();
    carousels.push(carousel);
  }
}

init();
