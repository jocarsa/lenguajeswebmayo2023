document.getElementById("botonbuscar").onclick = function(){
    console.log("Muestro la pantalla de buscar")
    var principal = document.getElementById("principal")
    principal.innerHTML = ""
    principal.innerHTML += "<input type='text' id='buscador' placeholder='Buscar'>"
    principal.innerHTML += "<img src='fotos/foto (1).JPG' class='imgbusqueda'>"
    principal.innerHTML += "<img src='fotos/foto (2).JPG' class='imgbusqueda'>"
    principal.innerHTML += "<img src='fotos/foto (3).JPG' class='imgbusqueda'>"
    principal.innerHTML += "<img src='fotos/foto (4).JPG' class='imgbusqueda'>"
}
document.getElementById("botonmensaje").onclick = function(){
    console.log("Muestro la pantalla de mensajes")
    document.getElementById("principal").innerHTML = "Mensajes"
}
document.getElementById("botoninicio").onclick = function(){
    console.log("Muestro la pantalla de inicio")
    document.getElementById("principal").innerHTML = "Inicio"
}
document.getElementById("botonnuevo").onclick = function(){
    console.log("Muestro la pantalla de nuevo elemento")
    document.getElementById("principal").innerHTML = "Nuevo"
}
document.getElementById("botonareapersonal").onclick = function(){
    console.log("Muestro la pantalla del área personal")
    document.getElementById("principal").innerHTML = "Area personal"
}