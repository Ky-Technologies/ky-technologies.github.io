// 1. CREO LA FUNCION MOSTRAR CARRITO QUE INCLUYE UN CONDICIONAL PARA VER SI HAY ALGUN PRODUCTO, SI NO ES ASI USA LA FUNCION actualizarVistaCarrito().
// 2. SI HAY UN OBJETO, SE CREA UN ITEM USANDO DOM PARA ACTUALIZAR LAS CANTIDADES INGRESADAS Y EL SUBTOTAL.
// 3. A MEDIDA QUE SE AGREGAN MAS PRODUCTOS ESTA LA FUNCION actualizarTotal() PARA IR SUMANDO LOS SUBTOTALES Y LAS CANTIDADES DEL TOTAL DE PRODUCTOS.
// 4. EVENTO CLICK PARA IDENTIFICAR EL PRODUCTO A TRAVES DE UN CONDICIONAL SE SELECCIONA EL PRODUCTO POR EL INDICE Y SE ACTUALIZA LA VISTA DEL CARRITO.
// 5. AL AGREGAR PRODUCTOS SE MUESTRA EL BOTON VACIAR CARRITO, QUE AL HACER CLICK MUESTRA UN SWEETALERT PARA CONTIUNAR CON LA ACCION O CANCELARLA.
// 6. SI SE EJECUTA LA FUNCION lipiarLocal(), SE MUESTRA EL MENSAJE DE CARRITO VACIO.

let carrito = document.getElementById("items");
let menuTotal = document.getElementById("menuTotal");
let mensajeCarrito = document.getElementById("mensajeCarrito");

let itemsCatalogo = JSON.parse(localStorage.getItem("carrito")) || [];

// ***1*** 

function mostrarCarrito() {
    mensajeCarrito.innerHTML = ""; 
    menuTotal.innerHTML = ""; 

    if (itemsCatalogo.length === 0) {
        return actualizarVistaCarrito();
    }

    // ***2***

    itemsCatalogo.forEach((producto, indice) => {
        const item = document.createElement("div");
        item.className = "itemCarrito";
        item.innerHTML = `<div><small>Celular</small><h3>${producto.marca}</h3></div>
                          <div><small>Modelo</small><h3>${producto.modelo}</h3></div>
                          <div>
                            <small id="tituloCantidad">Cantidad</small>
                            <div class="modificarCantidad">
                                <button class="disminuir" data-indice="${indice}">-</button>
                                <p class="cantidad" data-indice="${indice}">${producto.cantidad}</p>
                                <button class="incrementar" data-indice="${indice}">+</button>
                            </div>
                          </div>
                          <div><small>Precio</small><p>u$s ${producto.precio}</p></div>
                          <div><small>Subtotal</small><p id="subtotal">u$s ${producto.cantidad * producto.precio}</p></div>
                          <div><i class="deleteCarrito bi bi-trash" indice="${indice}"></i></div>`;

        mensajeCarrito.appendChild(item);
    });

    let inputTotal = document.createElement("div");
    inputTotal.innerHTML = `
        <h4>Total:</h4>
        <input id="total" placeholder="Total" readonly>
        <button id="finalizarCompra">Finalizar Compra</button>`;

    menuTotal.appendChild(inputTotal);

    document.getElementById("finalizarCompra").addEventListener("click", function() {
        const usuarioLogueado = localStorage.getItem("usuarioLogueado");
        
        if (!usuarioLogueado) {
            Swal.fire({
                title: "¡Debe registrarse!",
                text: "Por favor, registrarse para realizar la compra.",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Regístrese",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../Pages/registro.html"; 
                }
            });
        } else {
            const usuario = JSON.parse(localStorage.getItem("registroUsuario")).find(user => user.usuario === usuarioLogueado);
            const datosCompra = {
                usuario: usuario,
                productos: itemsCatalogo,
                total: itemsCatalogo.reduce((acumulador, producto) => acumulador + (producto.cantidad * producto.precio), 0)
            };

            localStorage.setItem("datosCompra", JSON.stringify(datosCompra));
            window.location.href = "../Pages/ticket.html"; 
        }
        
    });
    
    actualizarTotal();

    const botonVaciar = document.createElement("div");
    botonVaciar.innerHTML = `<button id="vaciar">Vaciar carrito</button>`;
    menuTotal.appendChild(botonVaciar);

    document.getElementById("vaciar").addEventListener("click", vaciarCarrito);
    document.querySelectorAll(".incrementar").forEach(btn => btn.addEventListener("click", incrementarCantidad));
    document.querySelectorAll(".disminuir").forEach(btn => btn.addEventListener("click", decrementarCantidad));
}

function incrementarCantidad(event) {
    const indice = event.target.getAttribute("data-indice");
    itemsCatalogo[indice].cantidad++;
    actualizarCarrito();
}

function decrementarCantidad(event) {
    const indice = event.target.getAttribute("data-indice");
    if (itemsCatalogo[indice].cantidad > 1) {  
        itemsCatalogo[indice].cantidad--;
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(itemsCatalogo));
    mostrarCarrito();
}

// ***3***

function actualizarTotal() {
    let total = itemsCatalogo.reduce((acumulador, producto) => {
        return acumulador + producto.cantidad * producto.precio;
    }, 0);

    const elementoTotal = document.getElementById("total");
    if (elementoTotal) {
        elementoTotal.value = `u$s ${total.toFixed(2)}`;
    }
}

// ***4*** 

mensajeCarrito.addEventListener("click", function (e) {
    const boton = e.target.closest(".deleteCarrito"); 

    if (boton) { 
        const indice = boton.getAttribute("indice");
        
        if (indice !== null) {
            itemsCatalogo.splice(indice, 1);
            localStorage.setItem("carrito", JSON.stringify(itemsCatalogo));
            mostrarCarrito(); 
        }
    }
});

// ***5*** 

function vaciarCarrito() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡¡Tenemos muchas promociones y descuentos!!",
        icon: "warning",
        showCancelButton: true,
        color: "rgb(255, 255, 255)",
        background: "rgb(0, 0, 0)",
        confirmButtonColor: "rgb(253, 48, 48)",
        cancelButtonColor: "rgb(117, 116, 116)",
        confirmButtonText: "Vaciar Carrito"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Carrito vacío",
                text: "Tenemos más ofertas para vos",
                icon: "info",
                color: "rgb(255, 255, 255)",
                background: "rgb(53, 53, 53)"
            });
            limpiarLocal();
        }
    });
}

// ***6*** 

function limpiarLocal() {
    localStorage.removeItem("carrito");
    itemsCatalogo = [];
    actualizarVistaCarrito();
    actualizarTotal();
}

function actualizarVistaCarrito() {
    mensajeCarrito.innerHTML = `<p class="carritoVacio">Tu carrito está vacío <i class="bi bi-emoji-frown"></i></p>`;
    menuTotal.innerHTML = "";
}

mostrarCarrito();
