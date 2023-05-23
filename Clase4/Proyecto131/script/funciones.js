function leeCookie(clave){
    let cookies = document.cookie;
    let coleccion = cookies.split(";")
    let cookie = [];
    for(var i = 0;i<coleccion.length;i++){
        cookie[coleccion[i].split("=")[0]] = coleccion[i].split("=")[1]
    }
    return cookie[clave]
}

function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}