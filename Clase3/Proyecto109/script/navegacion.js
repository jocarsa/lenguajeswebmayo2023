document.getElementById("botonbuscar").onclick = function(){
    console.log("Muestro la pantalla de buscar")
    var principal = document.getElementById("principal")
    principal.innerHTML = ""
    principal.innerHTML += "<input type='text' id='buscador' placeholder='Buscar'>"
    for(var numerofoto = 1;numerofoto <= 81;numerofoto = numerofoto + 1){
        principal.innerHTML += "<img src='fotos/foto ("+numerofoto+").JPG' class='imgbusqueda'>"
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
    document.getElementById("principal").innerHTML = "Nuevo"
}
document.getElementById("botonareapersonal").onclick = function(){
    console.log("Muestro la pantalla del área personal")
    var principal = document.getElementById("principal")
    principal.innerHTML = `
        <div id="misdatos">
            <h2>Área personal</h2>
            <h3>Nombre completo</h3>
            <p>Nombre completo</p>
            <h3>Email</h3>
            <p>Email</p>
            <h3>Contraseña</h3>
            <p>Contraseña</p>
            <button id="enviarcambios"></button>
        </div>
`
   
    
}