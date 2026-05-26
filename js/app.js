const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});

const container = document.getElementById("products-container");

const searchInput = document.getElementById("search-input");
let productsList = [];

const cartContainer = document.getElementById("cart-container");

const cartCount = document.getElementById("cart-count");

const cartTotal = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function getProducts() {

  const response = await fetch("./data/products.json");

  const products = await response.json();

  productsList = products;

    renderProducts(productsList);

}

function renderProducts(products){

  container.innerHTML = "";

  products.forEach(product => {

    container.innerHTML += `

      <div class="product-card">

        <img src="${product.image}" alt="${product.name}">

        <div class="product-info">

          <h3>${product.name}</h3>

          <p>$${product.price}</p>

          <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
            Agregar al carrito
          </button>

        </div>

      </div>

    `;

  });

}

function addToCart(id, name, price){

  const product = cart.find(item => item.id === id);

  if(product){

    product.quantity++;

  }else{

    cart.push({
      id,
      name,
      price,
      quantity: 1
    });

  }

  saveCart();

}

function saveCart(){

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();

}

function renderCart(){

  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;

    cartContainer.innerHTML += `

      <div class="cart-item">

        <div>
          <h3>${item.name}</h3>
        <div class="quantity-controls">

        <button onclick="decreaseQuantity(${item.id})">
            -
        </button>

        <span>
            ${item.quantity}
        </span>

        <button onclick="increaseQuantity(${item.id})">
            +
        </button>

        </div>

        <p>
        $${item.price * item.quantity}
        </p>
        </div>

        <button onclick="removeFromCart(${item.id})">
          Eliminar
        </button>

      </div>

    `;

  });

  cartCount.textContent = cart.length;const totalProducts = cart.reduce((acc, item) => {
  return acc + item.quantity;
}, 0);

cartCount.textContent = totalProducts;

  cartTotal.textContent = `Total: $${total}`;

}

function removeFromCart(id){

  cart = cart.filter(item => item.id !== id);

  saveCart();

}

function increaseQuantity(id){

  const product = cart.find(item => item.id === id);

  product.quantity++;

  saveCart();

}

function decreaseQuantity(id){

  const product = cart.find(item => item.id === id);

  if(product.quantity > 1){

    product.quantity--;

  }else{

    removeFromCart(id);

  }

  saveCart();

}

searchInput.addEventListener("input", () => {

  const searchText = searchInput.value.toLowerCase();

  const filteredProducts = productsList.filter(product => {

    return product.name.toLowerCase().includes(searchText);

  });

  renderProducts(filteredProducts);

});

let slides = document.querySelectorAll(".hero-slider .slide");
let index = 0;

setInterval(() => {
    slides[index].classList.remove("active");

    index = (index + 1) % slides.length;

    slides[index].classList.add("active");
}, 3000);

getProducts();

renderCart();

