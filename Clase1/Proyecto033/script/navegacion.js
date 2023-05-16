document.getElementById("botonbuscar").onclick = function(){
    console.log("Muestro la pantalla de buscar")
    var principal = document.getElementById("principal")
    principal.innerHTML = ""
    principal.innerHTML += "<input type='text' id='buscador' placeholder='Buscar'>"
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