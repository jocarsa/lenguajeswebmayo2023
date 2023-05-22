document.getElementById("botonbuscar").onclick = function(){
    console.log("Muestro la pantalla de buscar")
    var principal = document.getElementById("principal")
    principal.innerHTML = ""
    principal.innerHTML += "<input type='text' id='buscador' placeholder='Buscar'>"
    
    
    document.getElementById("buscador").onkeyup = function(){
        
         console.log("voy a buscar algo")
        contenido = this.value
        console.log(contenido)
        fetch(rutajson+"busqueda.json?contenido="+contenido)
            .then(res => res.json())
            .then(res => dameBusqueda(res))
    }
    

}
function dameBusqueda(recurso){
    console.log("ok te doy resultados de busqueda")
    console.log(recurso)
    for(var i = 0;i<recurso.entradas.length;i++){
        principal.innerHTML += "<img src='fotos/"+recurso.entradas[i].imagen+"' class='imgbusqueda'>"
    }
}

document.getElementById("botonmensaje").onclick = function(){
    console.log("Muestro la pantalla de mensajes")
    fetch(rutajson+"mensajes.json")
        .then(res => res.json())
        .then(res => dameMensajes(res))
}

function dameMensajes(recurso){
    var principal = document.getElementById("principal")
    principal.innerHTML = ""
    for(var i = 0;i<recurso.mensajes.length;i++){
        principal.innerHTML += "<div class='mensaje'>"+
            "<img src='fotos/"+recurso.mensajes[i].imagen+"'>"+
            "<div>"+
            "<p class='persona'>"+recurso.mensajes[i].persona+"</p>"+
            "<p class='mensaje'>"+recurso.mensajes[i].mensaje+"</p>"+
            "</div>"+
            "<img src='imagenes/iconomensaje.svg' class='enviamensaje'>"+
            "<div class='clearfix'></div>"+
            "</div>"
    }
}
document.getElementById("botoninicio").onclick = function(){
    console.log("Muestro la pantalla de inicio")
    fetch(rutajson+"entradas.json")
        .then(res => res.json())
        .then(res => dameEntradas(res))
    
}
document.getElementById("botonnuevo").onclick = function(){
    console.log("Muestro la pantalla de nuevo elemento")
    document.getElementById("principal").innerHTML = `
        <div id="nuevaentrada">
            <h3>Crear nueva entrada</h3>
            <p>Imagen</p>
            <input type="file" id="archivonuevo">   
            <p>Descripción</p>
            <textarea id="descripcionnuevo"></textarea>
            <button id="envianuevaentrada">Enviar</button>
        </div>
    `
    document.getElementById("envianuevaentrada").onclick = function(){
        console.log("voy a enviar tu entrada")
        var archivo = document.getElementById("archivonuevo")

        var datos = new FormData()
        datos.append('file', archivo.files[0])
        datos.append('mensaje', document.getElementById("descripcionnuevo").value)

        fetch('servidor/nuevo.php', {
          method: 'POST',
          body: datos
        })
    }
    
}
document.getElementById("botonareapersonal").onclick = function(){
    console.log("Muestro la pantalla del área personal")
    var principal = document.getElementById("principal")
    principal.innerHTML = `
        <div id="misdatos">
            <table border=0>
                <thead>
                    <tr>
                        <td></td>
                        <td>
                            <h2>Área personal</h2>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <h3>Nombre completo</h3>
                        </td>
                    </tr>
                    <tr>
                        <td><img src="imagenes/iconoeditar.svg" id="editarnombre"></td>
                        <td>
                        <p id="camponombre">Nombre completo</p>
                    </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        <h3>Email</h3>
                    </td>
                    </tr>
                    <tr>
                        <td><img src="imagenes/iconoeditar.svg" id="editaremail"></td>
                        <td>
                        <p id="campoemail">Email</p>
                    </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        <h3>Contraseña</h3>
                    </td>
                    </tr>
                    <tr>
                        <td><img src="imagenes/iconoeditar.svg" id="editarcontrasena"></td>
                        <td>
                        <p id="campocontrasena">Contraseña</p>
                    </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        <button id="enviarcambios">Enviar</button>
                    </td>
                    </tr>
<tr>
                        <td></td>
                        <td>
                        <button id="cerrarsesion">Cerrar sesion</button>
                    </td>
                    </tr>
        </div>
`
   document.getElementById("editarnombre").onclick = function(){
       let nombre = document.getElementById("camponombre").innerHTML
       document.getElementById("camponombre").innerHTML = '<input type="text" id="camponombre" value="'+nombre+'">'
   }
   document.getElementById("editaremail").onclick = function(){
       let email = document.getElementById("campoemail").innerHTML
       document.getElementById("campoemail").innerHTML = '<input type="text" id="campoemail" value="'+email+'">'
   }
   document.getElementById("editarcontrasena").onclick = function(){
      
       document.getElementById("campocontrasena").innerHTML = '<input type="text" id="campocontrasena" value="" placeholder="Introduce una nueva contraseña">'
   }
   document.getElementById("cerrarsesion").onclick = function(){
      deleteAllCookies()
       window.location = window.location;
   }
    
}