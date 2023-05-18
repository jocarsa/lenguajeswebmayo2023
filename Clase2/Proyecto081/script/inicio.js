console.log("esto se ejecuta en el inicio")
// Voy a cargar un json


if(leeCookie("usuario") != null){
    console.log("cargo tus noticias")
    fetch(rutajson+"entradas.json")
        .then(res => res.json())
        .then(res => dameEntradas(res))
}else{
    console.log("no has iniciado sesión y te voy a enseñar el login")
    document.getElementById("principal").innerHTML += `
                <div id="login">
                    <input type="text" id="loginusuario" placeholder="Usuario:">
                    <input type="password" id="loginpassword" placeholder="Contraseña:">
                    <button id="loginboton">Entrar</button>
                    <div id="resultado"></div>
                    <p>Todavía no tienes un usuario y contraseña?</p>
                    <p id="registrate">Registrate aqui</p>
                </div>
            `
}



function dameEntradas(recurso){
    console.log(recurso)
    console.log(recurso.entradas)
    //document.getElementById("principal").innerHTML = recurso.entradas
    // Quiero tomar las entradas una a una
    for(var i = 0;i<recurso.entradas.length;i++){
        document.getElementById("principal").innerHTML += `
                <article>
                    <img src="fotos/`+recurso.entradas[i].imagen+`">
                    <div class="acciones">
                        <img src="imagenes/iconocomentarios.svg">
                        <img src="imagenes/iconomensaje.svg">
                        <img src="imagenes/iconoinformacion.svg">
                    </div>
                    <time datetime="`+recurso.entradas[i].fecha+`">`+recurso.entradas[i].fecha+`</time>
                    <p>`+recurso.entradas[i].texto+`</p>
                </article>`
    }
}

document.getElementById("registrate").onclick = function(){
    console.log("te voy a mostrar el formulario de registro")
    document.getElementById("principal").innerHTML = `
                <div id="login">
                    <input type="email" id="signinemail" placeholder="Correo electrónico:">
                    <input type="nombre" id="signinnombre" placeholder="Nombre completo">
                    <input type="text" id="signinusuario" placeholder="Usuario:">
                    <input type="password" id="signinpassword" placeholder="Contraseña:">
                    <button id="loginboton">Entrar</button>
                    <p>
                    Al registrarte, aceptas nuestras 
                    <a href="paginas/condiciones.html">Condiciones</a>
                    . Obtén más información sobre cómo recopilamos, usamos y compartimos tu información en la 
                    <a href="paginas/privacidad.html">Política de privacidad</a>
                    , así como el uso que hacemos de las cookies y tecnologías similares en nuestra 
                    <a href="paginas/cookies.html">Política de cookies.</a>
                    </p>
                </div>
            `
}

document.getElementById("loginboton").onclick = function(){
    console.log("vamos a ver si lo que has escrito es correcto")
    var usuario = document.getElementById("loginusuario").value
    var contrasena = document.getElementById("loginpassword").value
    console.log("voy a enviar: "+usuario+" + "+contrasena)
    fetch("servidor/login.php?usuario="+usuario+"&contrasena="+contrasena)
        .then(res => res.json())
        .then(res => resultadoLogin(res))
}

function resultadoLogin(res){
    console.log(res)
    if(res.mensaje == "Acceso denegado"){
        document.getElementById("resultado").innerHTML = "<p class='rojo'>Intento de acceso incorrecto</p>"
    }
    if(res.mensaje == "Tu usuario es correcto"){
        document.cookie = "usuario=josevicente; expires=Thu, 18 Dec 2023 12:00:00 UTC";
        document.getElementById("principal").innerHTML = ""
        fetch(rutajson+"entradas.json")
        .then(res => res.json())
        .then(res => dameEntradas(res))
    }
}







