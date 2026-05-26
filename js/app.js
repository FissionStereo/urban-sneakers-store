const container = document.getElementById("products-container");

async function getProducts() {

  const response = await fetch("./data/products.json");

  const products = await response.json();

  renderProducts(products);

}

function renderProducts(products){

  products.forEach(product => {

    container.innerHTML += `

      <div class="product-card">

        <img src="${product.image}" alt="${product.name}">

        <div class="product-info">

          <h3>${product.name}</h3>

          <p>$${product.price}</p>

          <button>
            Agregar al carrito
          </button>

        </div>

      </div>

    `;

  });

}

getProducts();