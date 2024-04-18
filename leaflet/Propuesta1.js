//console.log(producto);
//const cuerposagua = getData("https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/AGUAS/CUERPOS/cuerpos_agua_09201.geojson");
const url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/AGUAS/CUERPOS/cuerpos_agua_01403.geojson";
const valoresPermitido = ['GENERALES/administrativa_de_primer_nivel','GENERALES/administrativa_de_segundo_nivel', 'GENERALES/administrativa_de_tercer_nivel', 'GENERALES/ordenamiento', 'GENERALES/asentamiento_humano', 'GENERALES/calculate_codigo_pais', 'GENERALES/calculate_codigo_municipio', 'GENERALES/calculate_codigo_pre_asentamiento', 'GENERALES/calculate_codigo_pre_asentamiento_cod', 'GENERALES/calculate_codigo_asentamiento', 'GENERALES/entorno_asentamiento', 'GENERALES/ubicacion', 'GENERALES/shape_extension', 'GENERALES/area_calculada', 'GENERALES/cantidad_de_viviendas', 'VIVIENDA/cantidad_de_habitantes', 'VIVIENDA/n_hogares', 'VIVIENDA/area_promedio_vivienda', 'VIVIENDA/promedio_habitantes_viviendas', 'VIVIENDA/promedio_habitantes_viviendas_layer', 'VIVIENDA/hacinamiento_hogares', 'VIVIENDA/hacinamiento_hogares_layer', 'VIVIENDA/promedio_area_promedio_vivienda', 'VIVIENDA/promedio_area_promedio_vivienda_layer', 'VIVIENDA/materialidad/cantidad_viviendas_paredes', 'VIVIENDA/materialidad/porcentaje_viviendas_paredes', 'VIVIENDA/materialidad/porcentaje_viviendas_paredes_layer', 'VIVIENDA/materialidad/cantidad_viviendas_piso', 'VIVIENDA/materialidad/porcentaje_viviendas_piso', 'VIVIENDA/materialidad/porcentaje_viviendas_piso_layer', 'VIVIENDA/materialidad/cantidad_viviendas_techo', 'VIVIENDA/materialidad/porcentaje_viviendas_techo', 'VIVIENDA/materialidad/porcentaje_viviendas_techo_layer', 'VIVIENDA/materialidad/cantidad_viviendas_tenencia_segura', 'VIVIENDA/materialidad/porcentaje_viviendas_tenencia_segura', 'VIVIENDA/materialidad/porcentaje_viviendas_tenencia_segura_layer', 'HABITAT/Materialidad/cantidad_de_hogares_red_agua_potable', 'HABITAT/Materialidad/porcentaje_de_hogares_red_agua_potable', 'HABITAT/Materialidad/porcentaje_de_hogares_red_agua_potable_layer', 'HABITAT/Materialidad/cantidad_de_hogares_aguas_negras', 'HABITAT/Materialidad/porcentaje_de_hogares_aguas_negras', 'HABITAT/Materialidad/porcentaje_de_hogares_aguas_negras_layer', 'HABITAT/Materialidad/cantidad_viviendas_fosa_septica', 'HABITAT/Materialidad/porcentaje_viviendas_fosa_septica', 'HABITAT/Materialidad/porcentaje_viviendas_fosa_septica_layer', 'HABITAT/Materialidad/cantidad_hogares_red_electrica', 'HABITAT/Materialidad/porcentaje_hogares_red_electrica', 'HABITAT/Materialidad/porcentaje_hogares_red_electrica_layer', 'HABITAT/Materialidad/cantidad_poblacion_telefonia', 'HABITAT/Materialidad/porcentaje_poblacion_telefonia', 'HABITAT/Materialidad/porcentaje_poblacion_telefonia_layer', 'HABITAT/Materialidad/cantidad_poblacion_acceso_internet', 'HABITAT/Materialidad/porcentaje_poblacion_acceso_internet', 'HABITAT/Materialidad/porcentaje_poblacion_acceso_internet_layer', 'HABITAT/distancia_espacios_publicos', 'HABITAT/distancia_equipamiento_educativos', 'HABITAT/distancia_equipamiento_salud', 'HABITAT/distancia_mercados', 'HABITAT/distancia_estacion_transporte', 'HABITAT/desechos_solidos', 'HABITAT/area_verde_asentamiento_humano', 'HABITAT/porcentaje_area_verde_asentamiento_humano', 'HABITAT/porcentaje_area_verde_asentamiento_humano_layer', 'HABITAT/metros_area_verde', 'HABITAT/trama_vial', 'RIESGO/riesgo_por_inundacion', 'RIESGO/riesgo_por_deslizamiento', 'RIESGO/riesgo_por_incendio', 'RIESGO/alerta_temprana_comunitaria', 'SOCIOECONOMICA/poblacion_femenina', 'SOCIOECONOMICA/poblacion_masculina', 'SOCIOECONOMICA/poblacion_femenina_discapacidad', 'SOCIOECONOMICA/poblacion_masculina_discapacidad', 'SOCIOECONOMICA/poblacion_femenina_tercera_edad', 'SOCIOECONOMICA/poblacion_masculina_tercera_edad', 'SOCIOECONOMICA/poblacion_menor_femenina', 'SOCIOECONOMICA/poblacion_menor_masculina', 'SOCIOECONOMICA/jefatura_hogar_femenina', 'SOCIOECONOMICA/Cantidad_poblacion_activa_desocupada', 'SOCIOECONOMICA/ingreso_promedio_us'];
const cuerposagua = getData("https://raw.githubusercontent.com/Sud-Austral/propuesta_kobol/main/mi_diccionario3.geojson");

cuerposagua["features"] = cuerposagua["features"].map( a => {
    console.log(a)
    const llaves = Object.keys(a["properties"]);
    llaves.forEach(llave => {
        if (!valoresPermitido.includes(llave)) {
          delete a["properties"][llave];
        }
    });
    return a;
})

//const cuerposagua2 = getData(url);
//console.log(cuerposagua2)
//PopUp automatico
const customOptions =
        {
            'className': 'custom'
        }
function getStringHTML2(feature, nombreCapa) {
    let htmlString = "<b><center> " + nombreCapa + "</b> : "  + feature.properties[nombreCapa] + " </center>";
    return htmlString;
}
/*function popup(feature,layer){
   
}*/


//Simplificar el feature tomando solo la variable SUPERFICIE.
//map aplica la funcion a todos los elementos
let SUPERFICIE = chile.features.map(x => x.properties.SUPERFICIE);
let maximo = SUPERFICIE.reduce((x,y) => Math.max(x,y));
let minimo = SUPERFICIE.reduce((x,y) => Math.min(x,y));

let intervalo = (maximo - minimo)/5;
//Color de acuerdo al Intervalo
function getColor(d){
    return d < minimo + 1*intervalo ? '#F6DDCC' :
           d < minimo + 2*intervalo ? '#E59866' :
           d < minimo + 3*intervalo ? '#D35400' :
           d < minimo + 4*intervalo ? '#A04000' :
           d > minimo + 4*intervalo ? '#6E2C00':
                                       '#884EA0';

}

//funcion para mostrar la simbologia (rango de color)
function style(feature){
    return{
        fillColor: getColor(feature.properties.SUPERFICIE),
        weight: 2,
        Opacity: 0.3,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }
}

//Agregar interracion del puntero con la capa RESALTA EL OBJETO
function highlightFeature(e){
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: '',
        fillOpacity: 0.7
    });

    info.update(layer.feature.properties)
}

//Configurar los cambios de resaltado y zoom de la capa
var chileJS;

function resetHighlight(e){
//    console.log("this",this);
    //console.log("e",e.sourceTarget._eventParents["45"]);
    let keysparent = Object.keys(e.sourceTarget._eventParents);
    console.log(keysparent)
    e.sourceTarget._eventParents[keysparent].resetStyle(e.target)
    //chileJS.resetStyle(e.target);
    info.update();
}
function zoomToFeature(e){
    map.fitBounds(e.target.getBounds());
}
function onEachFeature(feature, layer){
    try {
        let htmlString = Object.keys(feature.properties).map(element => getStringHTML2(feature, element)).toString();
        htmlString = htmlString.replaceAll(",", "")
        htmlString = htmlString + 
        "</div><center><img class='banner2' src='https://raw.githubusercontent.com/Sud-Austral/mapa_glaciares/main/img/logo_DataIntelligence_normal.png' alt='Data Intelligence'/></center>";
        //console.log(lista)
        layer.bindPopup("<div class='parrafo_popup'>" + htmlString + "</div>", customOptions);

    } catch (e) {
        console.error(error);
        //layer.bindPopup("Sin Información", customOptions);

    }
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
    })
}

// Agregar capa en formato GeoJason
//L.geoJson(cuerposagua).addTo(map);
/*
var chileJS = L.geoJson(chile,{
    style: style,
    onEachFeature: onEachFeature
    
}).addTo(map);
*/
var cuerposaguaJS2 = L.geoJson(cuerposagua,{
    onEachFeature: onEachFeature
}).addTo(map);

console.log(cuerposagua)

// Aquí se agregan las capas al menu
var overlayMapsRegiones = {            
   "Polígonos": cuerposaguaJS2,
   //"Polígonos": chileJS
};

        
console.log(base3)        
var capas_base = {"Mapa claro":base, "Mapa Oscuro":base2, "Mapa Satelital":base3}

var capaRegiones2 = L.control.layers(capas_base, overlayMapsRegiones, {
    position: 'topright', // 'topleft', 'bottomleft', 'bottomright'
    collapsed: false // true
}).addTo(map);


 // Para centrar en el objeto que uno quiera. Las 4
 map.fitBounds(cuerposaguaJS2.getBounds());
 //let zoom = map.getZoom();
 //let zoomMin = 10
 //map.setZoom(zoom > zoomMin ? zoomMin : zoom);