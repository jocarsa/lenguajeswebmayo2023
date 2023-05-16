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