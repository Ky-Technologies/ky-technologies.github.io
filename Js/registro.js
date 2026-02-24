// 1. REGISTRO DE USUARIO NUEVO CON LA FUNCION CONTRUCTORA.
// 2. EVENTO PARA TOMAR LOS VALORES, SUBIRLOS AL LOCALSTORAGE, CON UN CONDICIONAL PARA VALIDAR LOS DATOS INGRESADOS.
// 3. TOMO DEL LOCALSTORAGE EL USUARIO NUEVO Y LOS MUESTRO EN EL BOTON DE INICIO DE SESION. APARECE EL BOTON DE CERRAR FUNCION.
// 4. HAGO UN BOTON DE CERRAR SESION QUE LIMPIA EL LOCALSTORAGE (VER COMO ELIMINAR INDIVIDUALMENTE CADA USUARIO).

//***1***//

let registroUsuario = JSON.parse(localStorage.getItem("registroUsuario")) || [];

class DatosUsuario {
    constructor(nombre, apellido, mail, usuario, contrasena) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.usuario = usuario;
        this.contrasena = contrasena;
    };
}

//***2***//

let ingresar = document.getElementsByClassName(`botonLogin`)[0];

ingresar.addEventListener("click", function registro() {
    let usuarioNombre = document.getElementById("nombre").value;
    let usuarioApellido = document.getElementById("apellido").value;
    let usuarioMail = document.getElementById("mail").value;
    let usuarioUsuario = document.getElementById("usuario").value;
    let usuarioContrasena = document.getElementById("contrasena").value;
    let usuarioRepetirContrasena = document.getElementById("repetirContrasena").value;

    try{
    if (usuarioNombre === "" || usuarioApellido === "" || usuarioMail === "" || usuarioUsuario === "" || usuarioContrasena.length < 8 || usuarioContrasena.length > 12 || usuarioContrasena !== usuarioRepetirContrasena) {
        Toastify({
            text: "Datos ingresados de forma incorrecta",
            duration: 2000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "bottom", 
            position: "center", 
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right,rgb(253, 104, 104),rgb(184, 0, 0))",
            },
            onClick: function(){}
          }).showToast();;
        return;
    } else {
        const nuevoUsuario = new DatosUsuario(usuarioNombre, usuarioApellido, usuarioMail, usuarioUsuario, usuarioContrasena);
        registroUsuario.push(nuevoUsuario);
        localStorage.setItem("registroUsuario", JSON.stringify(registroUsuario));
        localStorage.setItem("usuarioLogueado", usuarioUsuario);
        let cambiarBoton = document.getElementById("botonCambiar");
        cambiarBoton.innerHTML = `<button class="botonLog">${usuarioUsuario}</button>
                                  <button id="logoutBoton" class="botonLog">Cerrar sesión</button>`;                          
        const logoutBoton = document.getElementById("logoutBoton");
        logoutBoton.addEventListener("click", cerrarSesion);
    }
    }catch(error){
        console.error(error);
        Toastify({
            text: error.message,
            duration: 2000,
            gravity: "bottom",
            position: "center",
            style: {
                background: "linear-gradient(to right,rgb(253, 104, 104),rgb(184, 0, 0))",
            }
        }).showToast();
    }
    Swal.fire({
            position: "center",
            icon: "success",
            title: `Bienvenido ${usuarioUsuario}`,
            showConfirmButton: false,
            timer: 2000
        });
});

//***3***//

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

//***4***//

function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    let cambiarBoton = document.getElementById("botonCambiar");
    cambiarBoton.innerHTML = `<button class="botonLog"><a href="../index.html">Iniciar sesión</a></button>`;
}