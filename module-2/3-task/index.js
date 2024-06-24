import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;
    this.elem = this.render();
    this.initCarousel();
  }

  render() {

    this._container = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(slide => this.createSlide(slide)).join('')}
        </div>
      </div>
    `);

    this._container.querySelector('.carousel__arrow_left').style.display = 'none';
    return this._container;
  }

  createSlide(slide) {
    return `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price}.00</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  initCarousel() {
    const carouselInner = this._container.querySelector('.carousel__inner');
    const rightArrow = this._container.querySelector('.carousel__arrow_right');
    const leftArrow = this._container.querySelector('.carousel__arrow_left');

    rightArrow.addEventListener('click', () => this.nextSlide());
    leftArrow.addEventListener('click', () => this.prevSlide());

    this._container.addEventListener('click', (event) => {
      if (event.target.closest('.carousel__button')) {
        const slideId = event.target.closest('.carousel__slide').dataset.id;
        const customEvent = new CustomEvent('product-add', {
          detail: slideId,
          bubbles: true
        });
        this._container.dispatchEvent(customEvent);
      }
    });
  }

  nextSlide() {
    this.currentSlideIndex++;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentSlideIndex--;
    this.updateCarousel();
  }

  updateCarousel() {
    const carouselInner = this._container.querySelector('.carousel__inner');
    const rightArrow = this._container.querySelector('.carousel__arrow_right');
    const leftArrow = this._container.querySelector('.carousel__arrow_left');

    const offset = -carouselInner.offsetWidth * this.currentSlideIndex;
    carouselInner.style.transform = `translateX(${offset}px)`;

    if (this.currentSlideIndex === 0) {
      leftArrow.style.display = 'none';
    } else {
      leftArrow.style.display = '';
    }

    if (this.currentSlideIndex === this.slides.length - 1) {
      rightArrow.style.display = 'none';
    } else {
      rightArrow.style.display = '';
    }
  }
}
