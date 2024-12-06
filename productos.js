const containerCards = document.getElementById("container-cards");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const listaCarrito = document.getElementById("lista-carrito");
const abrirCarrito = document.getElementById("abrir-carrito");
const cerrarCarritoBtn = document.getElementById("cerrar-carrito");
const notificacionCarrito = document.getElementById("notificacion-carrito");
const carritoModal = document.getElementById("carrito");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const totalCompra = document.getElementById("total-compra");
let carrito = [];

// Abrir y cerrar carrito
abrirCarrito.addEventListener("click", () => {
  carritoModal.classList.add("abierto");
});

cerrarCarritoBtn.addEventListener("click", () => {
  carritoModal.classList.remove("abierto");
});

async function obtenerProductos() {
  const respuesta = await fetch("https://fakestoreapi.com/products");
  const productos = await respuesta.json();
  notificacionCarrito.innerHTML = localStorage.getItem("numeroCarrito");

  productos.forEach((producto) => {
    const item = document.createElement("div");
    item.classList.add("card");
    item.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}" class="imagen_card">
      <div class="bajada_producto">
      <h4>${producto.title}</h4>
      <p>Precio: $${producto.price}</p>
      <button data-id="${producto.id}" data-nombre="${producto.title}" data-precio="${producto.price}" data-imagen="${producto.image}" class="btn_comprar">
        Agregar al Carrito
      </button>
      </div>
    `;

    // console.log(` Producto=>\n ID: ${producto.id} \n Nombre: ${producto.title}\n Precio:$ ${producto.price}`)
    containerCards.appendChild(item);
  });
  document.querySelectorAll(".btn_comprar").forEach((boton) => {
    boton.addEventListener("click", agregarProductoCarrito);
  });
}
obtenerProductos();

const agregarProductoCarrito = (e) => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  e.preventDefault();
  const id = e.target.dataset.id;
  const nombre = e.target.dataset.nombre;
  const precio = parseFloat(e.target.dataset.precio);
  const imagen = e.target.dataset.imagen;

  const productoExistente = carrito.find((item) => item.id === id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({
      id,
      nombre,
      precio,
      imagen,
      cantidad: 1,
    });
  }
  actualizarCarrito();
};

// Actualizar carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((producto) => {
    const totalPorProducto = producto.precio * producto.cantidad;
    total += totalPorProducto;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width:40px; height:40px;"></td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>
        <button class="btn-sumar" data-id="${producto.id}">+</button>
        ${producto.cantidad}
        <button class="btn-restar" data-id="${producto.id}">-</button>
      </td>
      <td>$${totalPorProducto}</td>
      <td><button class="btn-eliminar" data-id="${producto.id}">X</button></td>
    `;

    listaCarrito.appendChild(fila);
  });

  totalCompra.textContent = `Total: $${total}`;

  document.querySelectorAll(".btn-sumar").forEach((boton) => {
    boton.addEventListener("click", sumarCantidad);
  });

  document.querySelectorAll(".btn-restar").forEach((boton) => {
    boton.addEventListener("click", restarCantidad);
  });

  document.querySelectorAll(".btn-eliminar").forEach((boton) => {
    boton.addEventListener("click", eliminarProducto);
  });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("numeroCarrito", carrito.length);
  notificacionCarrito.innerHTML = carrito.length;
}

function sumarCantidad(e) {
  const id = e.target.getAttribute("data-id");
  const producto = carrito.find((item) => item.id === id);
  if (producto) {
    producto.cantidad++;
    actualizarCarrito();
  }
}

function restarCantidad(e) {
  const id = e.target.getAttribute("data-id");
  const producto = carrito.find((item) => item.id === id);
  if (producto) {
    producto.cantidad--;
    if (producto.cantidad === 0) {
      carrito = carrito.filter((item) => item.id !== id);
    }
    actualizarCarrito();
  }
}

function eliminarProducto(e) {
  const id = e.target.getAttribute("data-id");
  carrito = carrito.filter((item) => item.id !== id);
  actualizarCarrito();
}

// Vaciar carrito
vaciarCarritoBtn.addEventListener("click", () => {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
});
