console.log("esto se ejecuta en el inicio")
// Voy a cargar un json
fetch(rutajson+"entradas.json")
    .then(res => res.json())
    .then(res => dameMensajes(res))

function dameMensajes(recurso){
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