const productsArea = document.querySelector('.items');
const cartArea = document.querySelector('.cart__items');
const mainContainer = document.querySelector('.container');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const createLoadingScreen = () => {
  const loadingDiv = createCustomElement('div', 'loadscreen', 'carregando...');
  mainContainer.appendChild(loadingDiv);
};

const removeLoadingScreen = () => {
  const divLoading = document.querySelector('.loadscreen');
  divLoading.remove();
};

function cartItemClickListener(event) {
  const currProduct = event.target;
  currProduct.remove(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const savedCartItems = (() => {
  const cartItems = getSavedCartItems();
  if (cartItems) {
    cartArea.innerHTML = cartItems;
    const savedItem = document.querySelectorAll('.cart__item');
    savedItem.forEach((item) => item.addEventListener('click', cartItemClickListener));
  }
});

// função para adicionar o item ao carrinho
const addSelectedProductToCart = async (prodID) => {
  const finalObjProduct = await fetchItem(prodID);
  const { id: sku, title: name, price: salePrice } = finalObjProduct;
  const createSelectedProduct = createCartItemElement({ sku, name, salePrice });
  cartArea.appendChild(createSelectedProduct);
  saveCartItems(cartArea.innerHTML);
};

// estava tendo problemas pra fazer essa lógica funcionar, usei como exemplo o pr do Mario fernando
const buttonClick = (event) => {
  if (event.target.classList.contains('item__add')) {
    addSelectedProductToCart(event.target.parentNode.firstElementChild.innerText);
  }
};

const makeButtonAddProduct = () => {
  const addToCartButtons = document.querySelectorAll('.cart__item');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', cartItemClickListener);
  });
};

const addProductsOnScreen = async () => {
  createLoadingScreen();
  const products = await fetchProducts('computador');
  const { results } = products;
  results.forEach(({ id, title, thumbnail }) => {
    const elementProduct = createProductItemElement({ sku: id, name: title, image: thumbnail });
    productsArea.appendChild(elementProduct);
  });
  removeLoadingScreen();
};

window.onload = async () => {
  await addProductsOnScreen();
  savedCartItems();
  makeButtonAddProduct();
  productsArea.addEventListener('click', buttonClick);
};
