function leeCookie(clave){
    let cookies = document.cookie;
    let coleccion = cookies.split(";")
    let cookie = [];
    for(var i = 0;i<coleccion.length;i++){
        cookie[coleccion[i].split("=")[0]] = coleccion[i].split("=")[1]
    }
    return cookie[clave]
}