console.log("esto se ejecuta en el inicio")
// Voy a cargar un json
console.log(leeCookie("usuario"))


if(leeCookie("usuario") != null){
    console.log("cargo tus noticias")
    fetch("admin/json/entradas.php")
        .then(res => res.json())
        .then(res => dameEntradas(res))
}else{
    console.log("no has iniciado sesión y te voy a enseñar el login")
    document.getElementById("principal").innerHTML += `
                <div id="login">
                    <canvas id="logo" width=512px height=512px></canvas>    
                    <h1>IdeaOniric</h1>
                    <p>En este portal podrás registrar tus sueños y buscar información acerca del significado de los mismos. Para continuar, regístrate o inicia sesión</p>
                    <input type="text" id="loginusuario" placeholder="Usuario:">
                    <input type="password" id="loginpassword" placeholder="Contraseña:">
                    <button id="loginboton">Entrar</button>
                    <div id="resultado"></div>
                    <p>Todavía no tienes un usuario y contraseña?</p>
                    <button id="signinboton"><p id="registrate">Registrate aqui</p></button>
                </div>
            `
    var contexto = document.getElementById("logo").getContext("2d")
            // Círculo exterior, línea y relleno
            
            contexto.strokeStyle = "black"
            contexto.fillStyle = "white"
            contexto.lineWidth = 25
            contexto.beginPath();
            contexto.arc(256,256,220,0,Math.PI*2)
            contexto.stroke();
            contexto.fill();
            // Círculo interior, relleno
            contexto.fillStyle = "black"
            contexto.beginPath();
            contexto.arc(256,256,10,0,Math.PI*2)
            contexto.fill();
            
            centrox = 256
            centroy = 256
            var numeroiteraciones = 15;
            var incrementoangulo = Math.PI*2/numeroiteraciones
            contexto.lineWidth = 5
            for(var i = 0;i<10;i+=incrementoangulo){
                contexto.strokeStyle = "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")"
                // Dibujo una gota
                contexto.beginPath();
                contexto.moveTo(centrox,centroy)
                contexto.lineTo(
                    centrox+Math.cos(-1+i)*60,
                    centrox+Math.sin(-1+i)*60
                )
                contexto.lineTo(
                    centrox+Math.cos(-0.5+i)*120,
                    centrox+Math.sin(-0.5+i)*120
                )
                contexto.lineTo(
                    centrox+Math.cos(-0.2+i)*180,
                    centrox+Math.sin(-0.2+i)*180
                )
                contexto.lineTo(
                    centrox+Math.cos(0+i)*220,
                    centrox+Math.sin(0+i)*220
                )
                contexto.stroke();
                // Dibujo una gota
                contexto.beginPath();
                contexto.moveTo(centrox,centroy)
                contexto.lineTo(
                    centrox+Math.cos(1+i)*60,
                    centrox+Math.sin(1+i)*60
                )
                contexto.lineTo(
                    centrox+Math.cos(0.5+i)*120,
                    centrox+Math.sin(0.5+i)*120
                )
                contexto.lineTo(
                    centrox+Math.cos(0.2+i)*180,
                    centrox+Math.sin(0.2+i)*180
                )
                contexto.lineTo(
                    centrox+Math.cos(0+i)*220,
                    centrox+Math.sin(0+i)*220
                )
                contexto.stroke();
            }
            // Círculo medio, trazo
            contexto.lineWidth = 3
            contexto.fillStyle = "black"
            contexto.beginPath();
            contexto.arc(256,256,60,0,Math.PI*2)
            contexto.stroke();
}



function dameEntradas(recurso){
    console.log(recurso)
    console.log(recurso.entradas)
    //document.getElementById("principal").innerHTML = recurso.entradas
    // Quiero tomar las entradas una a una
    principal.innerHTML = ""
    for(var i = 0;i<recurso.entradas.length;i++){
        var fecha = new Date(recurso.entradas[i].fecha*1000);
        var anio = fecha.getFullYear();
        var mes = String(fecha.getMonth()).padStart(2, '0');
        var dia = String(fecha.getDate()).padStart(2, '0');
        var hora = String(fecha.getHours()).padStart(2, '0');
        var minuto = String(fecha.getMinutes()).padStart(2, '0');
        var segundo = String(fecha.getSeconds()).padStart(2, '0');
        var fechaformateada = anio+"/"+mes+"/"+dia+" - "+hora+":"+minuto+":"+segundo
        console.log(fecha)
        document.getElementById("principal").innerHTML += `
                <article>
                    <h4>`+recurso.entradas[i].usuario+`</h4>
                    <img src="admin/foto/`+recurso.entradas[i].imagen+`">
                    <div class="acciones">
                        <img src="imagenes/iconocomentarios.svg"
                        class="enviacomentario" Identificador="`+recurso.entradas[i].Identificador+`">
                        <img src="imagenes/iconomensaje.svg" class="enviamensaje" usuario="`+recurso.entradas[i].usuario+`">
                        <img src="imagenes/iconoinformacion.svg">
                    </div>
                    <time datetime="`+fechaformateada+`">`+fechaformateada+`</time>
                    <p>`+recurso.entradas[i].texto+`</p>
                    `
            for(var j = 0;j<recurso.entradas[i].comentarios.length;j++){
                document.getElementById("principal").innerHTML += "<p class='comentario'>"+recurso.entradas[i].comentarios[j].usuario+": "+recurso.entradas[i].comentarios[j].texto+"</p>"
            }
                document.getElementById("principal").innerHTML += `
                </article>`
    }
    // Enviar mensaje
    var elementos = document.getElementsByClassName("enviamensaje")
       console.log(elementos)
    for(var i = 0; i < elementos.length; i++) {
            var elemento = elementos[i];
            elemento.onclick = function() {
                console.log("envío un mensaje")
                let destinatario = this.getAttribute("usuario") 
                console.log("Le envio un mensaje a: "+destinatario)
                document.getElementById("principal").innerHTML = `
                    <div id="formmensajenuevo">
                    <h3>Formulario de envío de mensajes</h3>
                    <textarea id="mensajeaenviar"></textarea>
                    <input type="hidden" id="remitente" value="`+leeCookie("usuario")+`">
                    <input type="hidden" id="destinatario" value="`+destinatario+`">
                    <button id="botonenviomensaje">Enviar</button>
                    </div>
                `
                document.getElementById("botonenviomensaje").onclick = function(){
                    let mensaje = document.getElementById("mensajeaenviar").value
                    let destinatario = document.getElementById("destinatario").value
                    let remitente = document.getElementById("remitente").value
                    console.log("mensaje: "+mensaje + " - destinatario: "+destinatario+" - remitente: "+remitente)
                    fetch("admin/json/nuevomensaje.php?remitente="+encodeURI(remitente)+"&destinatario="+encodeURI(destinatario)+"&mensaje="+encodeURI(mensaje))
                    fetch("admin/json/entradas.php")
                    .then(res => res.json())
                    .then(res => dameEntradas(res))
                }
            }
        }
    // Enviar comentario
    var elementos = document.getElementsByClassName("enviacomentario")
       console.log(elementos)
    for(var i = 0; i < elementos.length; i++) {
            var elemento = elementos[i];
            elemento.onclick = function() {
                console.log("envío un comentario")
                let destinatario = this.getAttribute("Identificador") 
                console.log("Le envio un comentario a: "+destinatario)
                document.getElementById("principal").innerHTML = `
                    <div id="formmensajenuevo">
                    <h3>Formulario de envío de comentarios</h3>
                    <textarea id="mensajeaenviar"></textarea>
                    <input type="hidden" id="remitente" value="`+leeCookie("usuario")+`">
                    <input type="hidden" id="Identificador" value="`+destinatario+`">
                    <button id="botonenviocomentario">Enviar</button>
                    </div>
                `
                document.getElementById("botonenviocomentario").onclick = function(){
                    let mensaje = document.getElementById("mensajeaenviar").value
                    let remitente = document.getElementById("remitente").value
                    let idpost = document.getElementById("Identificador").value
                    console.log("mensaje: "+mensaje + " - idpost: "+idpost)
                    fetch("admin/json/nuevocomentario.php?idpost="+encodeURI(idpost)+"&remitente="+encodeURI(remitente)+"&mensaje="+encodeURI(mensaje))
                    fetch("admin/json/entradas.php")
                    .then(res => res.json())
                    .then(res => dameEntradas(res))
                }
            }
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
                    <button id="registroboton">Entrar</button>
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
    document.getElementById("registroboton").onclick = function(){
        console.log("Voy a enviar tus datos al servidor para registrar")
        let tunombre = document.getElementById("signinnombre").value
        let tucorreo = document.getElementById("signinemail").value
        let tuusuario = document.getElementById("signinusuario").value
        let tucontrasena = document.getElementById("signinpassword").value
        console.log("voy a enviar: "+tunombre+" - "+tucorreo+" - "+tuusuario+" - "+tucontrasena)
        fetch("admin/json/registranuevousuario.php?usuario="+tuusuario+"&contrasena="+tucontrasena+"&nombre="+tunombre+"&correo="+tucorreo)
        .then(res => res.json())
        .then(res => resultadoSignin(res))
    }
}


document.getElementById("loginboton").onclick = function(){
    console.log("vamos a ver si lo que has escrito es correcto")
    var usuario = document.getElementById("loginusuario").value
    var contrasena = document.getElementById("loginpassword").value
    console.log("voy a enviar: "+usuario+" + "+contrasena)
    fetch("admin/json/login.php?usuario="+usuario+"&contrasena="+contrasena)
        .then(res => res.json())
        .then(res => resultadoLogin(res))
}

function resultadoLogin(res){
    console.log(res)
    if(res.mensaje == "Acceso denegado"){
        document.getElementById("resultado").innerHTML = "<p class='rojo'>Intento de acceso incorrecto</p>"
    }
    if(res.mensaje == "Tu usuario es correcto"){
        document.cookie = "usuario="+res.usuario+"; expires=Thu, 18 Dec 2023 12:00:00 UTC";
        document.getElementById("principal").innerHTML = ""
        fetch("admin/json/entradas.php")
        .then(res => res.json())
        .then(res => dameEntradas(res))
    }
}
function resultadoSignin(res){
    console.log(res)
    
    if(res.mensaje == "Tu usuario es correcto"){
        document.cookie = "usuario="+res.usuario+"; expires=Thu, 18 Dec 2023 12:00:00 UTC";
        document.getElementById("principal").innerHTML = ""
        fetch("admin/json/entradas.php")
        .then(res => res.json())
        .then(res => dameEntradas(res))
    }
}



document.getElementById("corporativo").onclick = function(){
    fetch("admin/json/entradas.php")
        .then(res => res.json())
        .then(res => dameEntradas(res))
}





