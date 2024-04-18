document.addEventListener("DOMContentLoaded", function() {
    // Realizar una solicitud al servidor para obtener los datos de las oficinas
    fetch('http://localhost:3000/api/v1/get-offices')
    .then(response => response.json())
    .then(data => {
        // Verificar si los datos son un array
        if (Array.isArray(data)) {
            // Inicializar el mapa
            var map = L.map("map").setView([6.28010, -75.58262], 17);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            }).addTo(map);

            // Agregar marcadores para cada oficina
            data.forEach(function(office) {
                L.marker([office.latitude, office.longitude]).addTo(map).bindPopup(office.name);
                console.log(office);
            });
        } else {
            console.log('Data no es un array');
        }
    })
    .catch(error => console.error('Error al obtener los datos de las oficinas:', error));
});