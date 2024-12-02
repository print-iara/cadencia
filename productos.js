const containerCards = document.getElementById("container-cards");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const abrirCarrito = document.getElementById("abrir-carrito");
const cerrarCarritoBtn = document.getElementById("cerrar-carrito");
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
  document.querySelectorAll(".btn_comprar").forEach((boton)=>{
    boton.addEventListener("click", agregarProductoCarrito)
  })
}
obtenerProductos();


const agregarProductoCarrito=(e)=>{
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
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
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrar();

}
const mostrar=()=>{
  console.log("lista completa:")
  carrito.forEach((item)=>{
    console.log(`Producto: ${item.nombre} - Precio: $${item.precio}- cantidad: ${item.cantidad}`)
  })
}

