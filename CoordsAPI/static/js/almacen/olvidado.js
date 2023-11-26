
function getMarkers(){
    let person = null
    $.ajax({
        url: `http://localhost:8000/coords/`,
        type : 'GET',
        dataType : 'json',
        success : function(data){
            // elimina marcadores antiguos
            let index = 0
            if (index < data.length) {
                const coordinate = data[index];
                console.log('Latitud:', coordinate.latitude, 'Longitud:', coordinate.longitude);
                index++;
            }
        },
        error: function(xhr, status, error) {
            // Manejar errores
            console.error('Error en la solicitud:', error);
        },
    })
}
setInterval(getMarkers, 500)




let yo_estoy = null;
let index = 0; // Índice para obtener las coordenadas
const coordenadas = []; // Almacena las coordenadas obtenidas

function obtenerCoordenadas() {
    fetch(`http://localhost:8000/coords/`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            coordenadas.push(data[index]);
            if (index >= coordenadas.length) { index = 0; }
            if (yo_estoy) { map.removeLayer(yo_estoy) }
            
            yo_estoy = L.marker([coordenadas[index].latitude, coordenadas[index].longitude], { icon: my_icon }).addTo(map);
            index++;                
            
            console.log(`${index} seg.`)
            
        })
        .catch(error => { console.error('Error al obtener coordenadas:', error); });
}
setInterval(obtenerCoordenadas, 100);
