// Construye la url a partir del CUT_COM
let urlBase = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/chile_comunas/${getComuna()}.json`;
//console.log(urlBase)
//Se lee la comuna deseada
//const chile = getData("https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/Chile/Comunas_Chile_2020_GCS.json");
const chile = getData(urlBase)
//chile.features= chile.features.filter (x=>x.properties.CUT_COM == "09201")
let comunas_filtro = ["09101","09102","09103","09104","09201","09202","09203","09204","10301","10302","10303","10304"];
//chile.features = chile.features.filter(x => comunas_filtro.indexOf(x.properties.CUT_COM)> -1);
// coordenadas y luego de la coma el zoom inicial que queremos.

let map = L.map("mapid").setView([-33.458725187656356, -70.66008634501547],10);

//El mapa a utilizar y los valores correspondientes a este.
var base = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,    
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

// MAPA BASE 2
var base2 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/dark-v9',
    tileSize: 512,
    zoomOffset: -1
});

// MAPA BASE 3
var base3 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/satellite-streets-v9',
    tileSize: 512,
    zoomOffset: -1
});

//Funcion para los botones inferiores, cambiar mapa
$(document).ready(function() {
    $('.op1').on('click', function(){
        base2.remove();
        base3.remove();
        base.addTo(map);
    });
    $('.op2').on('click', function(){
        base.remove();
        base3.remove();
        base2.addTo(map);
    });
    $('.op3').on('click', function(){
        base.remove();
        base2.remove();
        base3.remove();
        base3.addTo(map);
    });
});