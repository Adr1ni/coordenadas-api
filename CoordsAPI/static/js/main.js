import {my_coords} from './almacen/coords.js'

// C O N S E J O:
// si estás en VSCode, presiona Ctrl + k + 1 


// SE EJECUTA CUANDO EL MAPA ES CARGADO COMPLETAMENTE
document.addEventListener('DOMContentLoaded', () => {
    // C R E A C I O N   D E   M A P A
    let map = createMap([-16.40407753, -71.526992], 20);                    // ( [coords] , zoom )
    
    let coords_polyline = []
    let yo_estoy = null
    let my_polyline = null
    let index = 570
    function getMarkers(){
        $.ajax({
            url: "http://localhost:8000/coords/",
            type : 'GET',
            dataType : 'json',
            success : function(data){
                if (index < data.length) {
                    coords_polyline.push([data[index].lat, data[index].lng])

                    if (yo_estoy) { map.removeLayer(yo_estoy) }
                    if (my_polyline) { map.removeLayer(my_polyline) }
                    
                    yo_estoy = L.marker([data[index].lat, data[index].lng], {icon: my_icon}).addTo(map)      // console.log(`${index} seg.`);
                    my_polyline = L.polyline(coords_polyline).addTo(map)
                    index++
                    console.log(`tiempo ${index} seg.`);
                }
            },
            error: function(error) { console.error('Error en la solicitud:', error) },
        })
    }
    setInterval(getMarkers, 500)
    
    // soy_novato(map)
});


// INICIALIZACIÓN DEL MAPA
function createMap(center, zoom) {
    let map = L.map('map', { zoomControl:true, animate:true }).setView(center, zoom)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>" }).addTo(map)
    map.invalidateSize()
    return map
}




// TUTORIAL
function soy_novato(map){
    
    // C R E A C I O N   D E   L I N E A
    const polyline = L.polyline( my_coords ).addTo(map)


    // C R E A C I O N   D E   P O L I G O N O
    const polygon = L.polygon( coords_polygon ).addTo(map)


    // C R E A C I O N   D E   M A R C A D O R
    const marcador = L.marker([-16.43713039, -71.5178472], {icon: my_icon}).addTo(map)


    // C R E A C I O N   D E   P O P P U S
    const popup = L.popup()
        .setLatLng([-16.40713039, -71.5278472])
        .setContent(`<h5>Arequipa</h5><pre>Soy un popup ^^!</pre>`)
        .openOn(map)


    // C R E A C I O N   D E   C I R C U L O
    const circulo = L.circle([-16.3613095094, -71.5137342339], {radius: 2000, color: 'green'}).addTo(map)


    // C R E A C I O N   D E   E V E N T O      =>      CAPTURAR COORDS DEL MAPA CON UN CLIC
    map.on('click', function(evento){ 
        let msg =`${evento.latlng.lat}, ${evento.latlng.lng}`
        navigator.clipboard.writeText(msg)
        console.log(msg)
    })


    // C R E A C I O N   D E   M A R C A D O R E S      => APARTIR DE UNA MATRIZ
    my_villagers.map((point) => { L.marker([point[0], point[1]]).addTo(map) })
    const my_villa = L.circle([-16.580724627540015, -71.25888110135423], {radius: 400}).addTo(map)
    // villa.bindTooltip("Reino Muy muy lejano.").onTooltip()      // info flotante


    // C E N T R A R   U B I C A C I O N   C O N   V A R I O S   M A R C A D O R E S        => solo admite coordanadas, objeto marcador
    // map.fitBounds ([ ...my_villagers.map( point => [point[0], point[1]]) ] )


    // C R E A C I O N   D E   M A R C A D O R   A R R A S T R A B L E
    const marcador_dragg = L.marker([-16.41703039, -71.5173472], {draggable: true}).addTo(map)


    // E V E N T O   N O   MENU DE NAVEGADOR
    map.on('contextmenu', function(){console.log("clic derecho.");})

    
    // E V E N T O   E L I M I N A R   M A R C A D O R
    marcador_dragg.on('contextmenu', function(){map.removeLayer(marcador_dragg); console.log("Marcador removido.");;})


    // C R E A C I O N   D E   M A R C A D O R E S   E L I M I N A B L E S   C A D A   U N O
    my_villagers_draggers.map((point) => { 
        const makerItem = L.marker([point[0], point[1]], {draggable:true}).addTo(map);
        makerItem.on('contextmenu', function(){
            console.log(`marcador [${point[0]}, ${point[1]}] eliminado.`);
            map.removeLayer(makerItem);
        })
     })
    const my_villa_dragg = L.circle([-16.425547506916725, -71.81746732289217], {radius: 400}).addTo(map)


    // E V E N T O   OPEN Y CLOSE   POPUP   EN   MARCADOR 
    const marcado_popup = L.marker([-16.42023729352281, -71.47581070049183], {draggable: true}).addTo(map)
    marcado_popup.bindPopup("Está en mi chacra.")           // a veces muestra errores
    marcado_popup.on('mouseover', function(){ marcado_popup.openPopup() })       // console.log("Estoy abierto.");
    marcado_popup.on('mouseout', function(){ marcado_popup.closePopup() })       // console.log('Estoy cerrado.');
}

// COORDENADAS DEL POLIGONO
const coords_polygon = [
    [-16.40713039, -71.5278472], 
    [-16.60470123, -71.5278015], 
    [-16.42781067, -71.7202170], 
    [-16.17019104, -71.3195846]
]

// ICONO DEL MARCADOR
const my_icon = L.icon({
    iconUrl: 'https://icons.veryicon.com/png/o/business/classic-icon/bus-20.png',
    iconSize: [30, 30],
})

// COORDENADAS PARA MI PUEBLO
const my_villagers = [
    [-16.580238768800115, -71.25885881519724],
    [-16.580238768800115, -71.25885881519724],
    [-16.580238768800115, -71.25885881519724],
    [-16.58089172177729, -71.25779144037755],
    [-16.58089172177729, -71.25779144037755],
    [-16.580578098970282, -71.26027214818718],
    [-16.581444416375266, -71.25860166410195],
    [-16.58165521113975, -71.25939549060104],
]

const my_villagers_draggers = [
    [-16.425063830694004, -71.81711331932028],
    [-16.425043248700383, -71.81621221931907],
    [-16.425722453339166, -71.81858297051272],
    [-16.426566310341457, -71.8174244133683],
    [-16.42461102633079, -71.81891551932269],
    [-16.423880362520265, -71.81338019074383],
    [-16.425763617180387, -71.81724204789188],
    [-16.426525146670258, -71.81878679075109],
]
