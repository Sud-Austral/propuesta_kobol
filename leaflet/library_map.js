//Esta funcion toma una url publica y devuelve un objeto con los datos geograficos
function getData(urlData) {
    let rawData;
    $.get({
        url: urlData,
        success: function (data, status) {
            rawData = data;
        }, async: false
    });
    return JSON.parse(rawData);
}
//Esta funcion recibe el parametro CUT_COM de la url y devuelve el codigo
function getComuna(){
    const valores = window.location.search;
    //Creamos la instancia
    const urlParams = new URLSearchParams(valores);
    //Accedemos a los valores
    let codigo_comuna = urlParams.get('CUT_COM');
    codigo_comuna = codigo_comuna.length == 5? codigo_comuna:  `0${codigo_comuna}`;
    return codigo_comuna;
}