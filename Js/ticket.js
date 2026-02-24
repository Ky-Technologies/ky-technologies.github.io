// 1. RECUPERO LOS DATOS DE USUARIO Y DEL CARRITO
// 2. FUNCION PARA LIMPIAR EL LOCALSTORAGE LUEGO DE LA COMPRA

// ***1***

const datosCompra = JSON.parse(localStorage.getItem("datosCompra"));

if (datosCompra) {
    document.getElementById("nombreUsuario").textContent = `Nombre: ${datosCompra.usuario.nombre} ${datosCompra.usuario.apellido}`;
    document.getElementById("emailUsuario").textContent = `Correo electrónico: ${datosCompra.usuario.mail}`;

    const listaProductos = document.getElementById("listaProductos");
    datosCompra.productos.forEach(producto => {
        const item = document.createElement("li");
        item.textContent = `${producto.marca} - Cantidad: ${producto.cantidad} - Precio: u$s ${producto.precio} - Subtotal: u$s ${producto.cantidad * producto.precio}`;
        listaProductos.appendChild(item);
    });

    document.getElementById("cantidadTotal").textContent = `u$s ${datosCompra.total.toFixed(2)}`;
} 

// ***2***

document.getElementById("volverInicio").addEventListener("click", function() {

        limpiarLocal();
        window.location.href = "../index.html"; 

});

function limpiarLocal() {
    localStorage.removeItem("carrito");
    localStorage.removeItem("datosCompra");
}
