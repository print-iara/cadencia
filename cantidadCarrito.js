document.addEventListener("DOMContentLoaded", () => {
    const miVariable = localStorage.getItem("numeroCarrito");
    if (miVariable) {
      document.getElementById("notificacion-carrito").innerHTML = miVariable;
    } else {
      document.getElementById("notificacion-carrito").innerHTML = "N";
    }
  });