const container = document.getElementById("products-container");

const cartContainer = document.getElementById("cart-container");

const cartCount = document.getElementById("cart-count");

const cartTotal = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function getProducts() {

  const response = await fetch("./data/products.json");

  const products = await response.json();

  renderProducts(products);

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
          <p>
            $${item.price} x ${item.quantity}
          </p>
        </div>

        <button onclick="removeFromCart(${item.id})">
          Eliminar
        </button>

      </div>

    `;

  });

  cartCount.textContent = cart.length;

  cartTotal.textContent = `Total: $${total}`;

}

function removeFromCart(id){

  cart = cart.filter(item => item.id !== id);

  saveCart();

}

getProducts();

renderCart();