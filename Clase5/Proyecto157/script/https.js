var ubicacion = window.location.href+'';
if (ubicacion.indexOf('http://')==0){
    window.location.href = ubicacion.replace('http://','https://');
}