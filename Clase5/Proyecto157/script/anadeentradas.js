function anadeEntradas(recurso){
    console.log(recurso)
    console.log(recurso.entradas)
    //document.getElementById("principal").innerHTML = recurso.entradas
    // Quiero tomar las entradas una a una
    //principal.innerHTML = ""
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
    ultimopost += 5
}