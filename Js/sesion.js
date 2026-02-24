// 1. TOMO DEL LOCALSTORAGE EL USUARIO NUEVO Y LOS MUESTRO EN EL BOTON DE INICIO DE SESION. APARECE EL BOTON DE CERRAR FUNCION.
// 2. HAGO UN BOTON DE CERRAR SESION QUE LIMPIA EL LOCALSTORAGE (VER COMO ELIMINAR INDIVIDUALMENTE CADA USUARIO).

///***1***/

function mostrarUsuarioLogueado() {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    if (usuarioLogueado) {
        let cambiarBoton = document.getElementById("botonCambiar");
        cambiarBoton.innerHTML = `<button class="botonLog">${usuarioLogueado}</button>
                                  <button id="logoutBoton">Cerrar sesión</button>`;
        const logoutBoton = document.getElementById("logoutBoton");
        logoutBoton.addEventListener("click", cerrarSesion);
    }
}

mostrarUsuarioLogueado();

///***2***/

function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    let cambiarBoton = document.getElementById("botonCambiar");
    cambiarBoton.innerHTML = `<button class="botonLog"><a href="../index.html">Iniciar sesión</a></button>`;
}
