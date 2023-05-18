console.log("esto se ejecuta en el inicio")
// Voy a cargar un json
fetch(rutajson+"entradas.json")
    .then(res => res.json())
    .then(res => dameMensajes(res))

function dameMensajes(recurso){
    console.log(recurso)
    console.log(recurso.entradas)
    document.getElementById("principal").innerHTML = recurso.entradas
}