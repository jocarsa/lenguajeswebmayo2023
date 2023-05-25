function dameDatos(recurso){
    console.log(recurso)
    console.log(recurso)
   
    for (var k in recurso[0]){
        document.cookie = k+"="+recurso[0][k]+"; expires=Thu, 18 Dec 2023 12:00:00 UTC";
    }
}