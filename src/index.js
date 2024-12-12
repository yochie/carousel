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
    this.view.nextButton.addEventListener("click", () => {
      this.displayNext();
    });

    this.view.prevButton.addEventListener("click", () => {
      this.displayPrevious();
    });
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
  frame = null;
  strip = null;
  size = 0;
  nextButton = null;
  prevButton = null;
  indexButtons = [];

  constructor(carouselNode) {
    //saving so that we can dynamically read size on display
    this.carouselNode = carouselNode;
    this.#generateFrame();
    this.#generateStrip();
    this.#generateNavButtons();
    // this.#generatePageButtons();
  }

  #generateFrame() {
    const frame = document.createElement("div");
    frame.classList.add("carousel-frame");
    this.frame = frame;
    this.carouselNode.appendChild(frame);
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
    this.frame.appendChild(strip);

    this.strip = strip;
    this.size = cells.length;
  }

  #generateNavButtons() {
    const buttons = document.createElement("div");
    buttons.classList.add("nav-buttons");

    const prevButton = document.createElement("button");
    prevButton.classList.add("carousel-prev");
    prevButton.textContent = "<";
    buttons.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.classList.add("carousel-prev");
    nextButton.textContent = ">";
    buttons.appendChild(nextButton);

    this.carouselNode.appendChild(buttons);
    this.nextButton = nextButton;
    this.prevButton = prevButton;
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
