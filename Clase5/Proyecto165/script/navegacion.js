document.getElementById("botonbuscar").onclick = function(){
    paginaactual = "buscar"
    if(leeCookie("usuario") != undefined){
    console.log("Muestro la pantalla de buscar")
    var principal = document.getElementById("principal")
    principal.innerHTML = ""
    principal.innerHTML += "<input type='text' id='buscador' placeholder='Buscar'><button id='iniciabusqueda'><img src='imagenes/iconobuscar.svg'></button>"
    
    
    document.getElementById("iniciabusqueda").onclick = function(){
        
         console.log("voy a buscar algo")
        contenido = document.getElementById("buscador").value
        console.log(contenido)
        fetch("admin/json/busqueda.php?contenido="+contenido)
            .then(res => res.json())
            .then(res => dameBusqueda(res))
    }
    
    }
}
function dameBusqueda(recurso){
    console.log("ok te doy resultados de busqueda")
    console.log(recurso)
    for(var i = 0;i<recurso.entradas.length;i++){
        principal.innerHTML += "<img src='admin/foto/"+recurso.entradas[i].imagen+"' identificador='"+recurso.entradas[i].identificador+"' class='imgbusqueda'>"
    }
    var elementos = document.getElementsByClassName("imgbusqueda")
       console.log(elementos)
    for(var i = 0; i < elementos.length; i++) {
        var elemento = elementos[i];
            elemento.onclick = function() {
                console.log("click en la imagen")
                let id = this.getAttribute("identificador") 
                console.log(id)
                fetch("admin/json/entradasbusqueda.php?idpost="+id)
                .then(res => res.json())
                .then(res => dameEntradasBusqueda(res))
                }
    }
}

document.getElementById("botonmensaje").onclick = function(){
    paginaactual = "mensaje"
    if(leeCookie("usuario") != undefined){
    console.log("Muestro la pantalla de mensajes")
    fetch("admin/json/mismensajes.php?usuario="+leeCookie("usuario"))
        .then(res => res.json())
        .then(res => dameMensajes(res))
    }
}

function dameMensajes(recurso){
    var principal = document.getElementById("principal")
    principal.innerHTML = ""
    for(var i = 0;i<recurso.mensajes.length;i++){
        principal.innerHTML += "<div class='mensaje'>"+
            "<img src='fotos/"+recurso.mensajes[i].imagen+"'>"+
            "<div>"+
            "<p class='persona'>"+recurso.mensajes[i].usuario+"</p>"+
            "<p class='mensaje'>"+recurso.mensajes[i].mensaje+"</p>"+
            "</div>"+
            "<img src='imagenes/iconomensaje.svg' class='enviamensaje'>"+
            "<div class='clearfix'></div>"+
            "</div>"
    }
}
document.getElementById("botoninicio").onclick = function(){
    paginaactual = "inicio"
    if(leeCookie("usuario") != undefined){
    console.log("Muestro la pantalla de inicio")
    fetch("admin/json/entradas.php")
        .then(res => res.json())
        .then(res => dameEntradas(res))
    }
}

document.getElementById("corporativo").onclick = function(){
    paginaactual = "inicio"
    if(leeCookie("usuario") != undefined){
    console.log("Muestro la pantalla de inicio")
    fetch("admin/json/entradas.php")
        .then(res => res.json())
        .then(res => dameEntradas(res))
    }
}
document.getElementById("botonnuevo").onclick = function(){
    paginaactual = "nuevaentrada"
    if(leeCookie("usuario") != undefined){
    console.log("Muestro la pantalla de nuevo elemento")
    document.getElementById("principal").innerHTML = `
        <div id="nuevaentrada">
            <h3>Crear nueva entrada</h3>
            <p>Imagen</p>
            <label for="archivonuevo" id="areaarchivonuevo">
                <p>Selecciona desde tu dispositivo</p>
                <img src="imagenes/iconosubirimagen.svg" id="imagencarga">
                </label>
            <input type="file" id="archivonuevo"  style="visibility:hidden;" accept=".gif,.jpg,.jpeg,.png">   
            <p>Descripción</p>
            <textarea id="descripcionnuevo"></textarea>
            <button id="envianuevaentrada">Enviar</button>
        </div>
    `
    document.getElementById("archivonuevo").onchange = evt => {
      const [file] = document.getElementById("archivonuevo").files
      if (file) {
        document.getElementById("imagencarga").src = URL.createObjectURL(file)
      }
    }
    document.getElementById("envianuevaentrada").onclick = function(){
        console.log("voy a enviar tu entrada")
        var archivo = document.getElementById("archivonuevo")

        var datos = new FormData()
        datos.append('usuario', leeCookie("usuario"))
        datos.append('file', archivo.files[0])
        //datos.append('mensaje', encodeURIComponent(document.getElementById("descripcionnuevo").value))
        datos.append('mensaje', document.getElementById("descripcionnuevo").value)

        fetch('admin/json/nuevaentrada.php', {
          method: 'POST',
          body: datos
        })
        fetch("admin/json/entradas.php")
        .then(res => res.json())
        .then(res => dameEntradas(res))
    }
    }
}
document.getElementById("botonareapersonal").onclick = function(){
    paginaactual = "areapersonal"
    if(leeCookie("usuario") != undefined){
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
                            <h3>Fotografía</h3>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        <p>Imagen</p>
            <label for="fotonueva" id="areaarchivonuevo">
                <p>Selecciona desde tu dispositivo</p>
                <img src="imagenes/iconosubirimagen.svg" id="targetusuario">
                </label>
            <input type="file" id="fotonueva"  style="visibility:hidden;" accept=".gif,.jpg,.jpeg,.png">   
                        </td>
                    <tr>
                        <td></td>
                        <td>
                            <h3>Nombre completo</h3>
                        </td>
                    </tr>
                    <tr>
                        <td><img src="imagenes/iconoeditar.svg" id="editarnombre"></td>
                        <td>
                        <p id="camponombre">`+leeCookie('nombrecompleto')+`</p>
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
                        <p id="campoemail">`+leeCookie("correo")+`</p>
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
                    <tr>
                        <td><img src="imagenes/iconoeditar.svg" id="editarprivacidad"></td>
                        <td>
                        <select id="privacidad">
                            <option value="0">Público</option>
                            <option value="1">Privado</option>
                        </select>
                    </td>
                    </tr>
                    
                    
                    </tr>
<tr>
                        <td></td>
                        <td>
                        <button id="cerrarsesion">Cerrar sesion</button>
                    </td>
                    </tr>
        </div>
`   
    console.log(leeCookie("nombrecompleto"))
    
    document.getElementById("fotonueva").onchange = function(){
        const [file] = document.getElementById("fotonueva").files
          if (file) {
            document.getElementById("targetusuario").src = URL.createObjectURL(file)
          }
        console.log("voy a actualizar tu foto")
        var datos = new FormData()
        var archivo = document.getElementById("fotonueva")
        datos.append('usuario', leeCookie("usuario"))
        datos.append('file', archivo.files[0])
        //datos.append('mensaje', encodeURIComponent(document.getElementById("descripcionnuevo").value))
        

        fetch('admin/json/nuevafotocliente.php', {
          method: 'POST',
          body: datos
        }).then(res => res.text())
            .then(res => dime(res))
    }
    
    function dime(res){
        console.log(res)
    }
    
   document.getElementById("editarnombre").onclick = function(){
       let nombre = document.getElementById("camponombre").innerHTML
       document.getElementById("camponombre").innerHTML = '<input type="text" id="camponombreinput" value="'+nombre+'">'
        document.getElementById("camponombreinput").onblur = function(){
           console.log("el nombre ha cambiado")
            console.log("el nombre es: "+this.value)
            fetch("admin/json/cambiadatos.php?dato=nombrecompleto&valor="+this.value+"&usuario="+leeCookie("usuario"))
       }
   }
   document.getElementById("editaremail").onclick = function(){
       let email = document.getElementById("campoemail").innerHTML
       document.getElementById("campoemail").innerHTML = '<input type="text" id="campoemailinput" value="'+email+'">'
       document.getElementById("campoemailinput").onblur = function(){
           console.log("el email ha cambiado")
           fetch("admin/json/cambiadatos.php?dato=email&valor="+this.value+"&usuario="+leeCookie("usuario"))
       }
   }
   document.getElementById("editarcontrasena").onclick = function(){
      
       document.getElementById("campocontrasena").innerHTML = '<input type="text" id="campocontrasenainput" value="" placeholder="Introduce una nueva contraseña">'
       document.getElementById("campocontrasenainput").onblur = function(){
           console.log("la contraseña ha cambiado")
           fetch("admin/json/cambiadatos.php?dato=contrasena&valor="+this.value+"&usuario="+leeCookie("usuario"))
       }
   }
   document.getElementById("privacidad").onchange = function(){
      
       console.log("la privacidad ha cambiado")
       fetch("admin/json/cambiadatos.php?dato=privado&valor="+this.value+"&usuario="+leeCookie("usuario"))
   }
   document.getElementById("cerrarsesion").onclick = function(){
      deleteAllCookies()
       window.location = window.location;
   }
   
    
    

    }
}