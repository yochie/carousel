import "./styles.css";
import * as dropDown from "@yochie/drop-down";

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
    //rerender using updated carousel size whenever it might change
    //needed since strip offsets are based on carousel size
    //could be improved by decoupling these two (carousel size and strip offsets)
    window.addEventListener("resize", () => {
      this.displayIndex(this.currentImageIndex);
    });

    this.view.navigation.nextButton.addEventListener("click", () => {
      this.displayNext();
    });

    this.view.navigation.prevButton.addEventListener("click", () => {
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
  index = 0;
  frame = null;
  strip = null;
  size = 0;
  navigation = {
    container: null,
    nextButton: null,
    prevButton: null,
    indexButtons: [],
  };

  constructor(carouselNode, index) {
    //saving so that we can dynamically read size on display
    this.carouselNode = carouselNode;
    this.index = index;
    this.#generateFrame();
    this.#generateStrip();
    this.#generateNavigation();
  }

  #generateNavigation() {
    const navID = `carousel-${this.index}-nav`;
    this.carouselNode.classList.add("drop-down-trigger");
    this.carouselNode.setAttribute("data-triggers-id", navID);
    const container = document.createElement("div");
    container.classList.add("carousel-navigation");
    container.setAttribute("id", navID);
    this.navigation.container = container;
    this.#generateCycleButtons();
    // this.#generatePageButtons();
    this.carouselNode.appendChild(container);
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

  #generateCycleButtons() {
    const cycleButtons = document.createElement("div");
    cycleButtons.classList.add("cycle-buttons");

    const prevButton = document.createElement("button");
    prevButton.classList.add("carousel-prev");
    prevButton.textContent = "<";
    cycleButtons.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.classList.add("carousel-next");
    nextButton.textContent = ">";
    cycleButtons.appendChild(nextButton);

    this.navigation.container.appendChild(cycleButtons);
    this.navigation.nextButton = nextButton;
    this.navigation.prevButton = prevButton;
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
  let index = 0;
  for (let carouselNode of carouselsNodes) {
    const view = new CarouselView(carouselNode, index++);
    const carousel = new CarouselController(view);
    carousel.setupListeners();
    carousels.push(carousel);
  }
  dropDown.initDropDowns();
}

init();
