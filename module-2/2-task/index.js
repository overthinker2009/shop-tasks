export default class ProductCard {

constructor(product){
  this.product = product
  this.cardProduct = document.createElement('div')
  this.cardProduct.classList.add('card');

  this.cardProduct.insertAdjacentHTML(
    'beforeend',
    `
    <div class="card__top">
        <img src="/assets/images/products/laab_kai_chicken_salad.png" class="card__image" alt="product">
        <span class="card__price">€10.00</span>
      </div>
      <div class="card__body">
        <div class="card__title">Laab kai chicken salad</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    `
  )

  this.cardProduct.addEventListener('click', (event) => {
    const btn = event.target.closest('.card__button');
    if(btn) {
      const productAddEvent = new CustomEvent('product-add', {
        detail: this.product.id,
        bubbles:true
      });
      btn.dispatchEvent(productAddEvent)
      console.log(productAddEvent);
    }
  })
}




  get elem() {
    return this.cardProduct
  }
}



createElement()
