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

function updateScrollPercentage() {
  const scrollTop = document.documentElement.scrollTop;
    
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;

  // Round the scroll percentage to two decimal places
  const roundedPercentage = Math.round(scrollPercentage * 100) / 100;
    if(roundedPercentage > 80 && paginaactual == "inicio"){
        console.log("vamos a cargar más entradas")
        
        fetch("admin/json/entradas.php?posicion="+ultimopost)
            .then(res => res.json())
            .then(res => anadeEntradas(res))
    }
  return(`${roundedPercentage}`);
}