
const containerCards = document.getElementById("container-cards");




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
    console.log(` Producto=>\n ID: ${producto.id} \n Nombre: ${producto.title}\n Precio:$ ${producto.price}`)
    containerCards.appendChild(item);
  });

}
obtenerProductos();
