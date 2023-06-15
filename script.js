function consultarClima(){
    const ciudad = document.querySelector('#ciudad').value;
    const API_KEY = '7988e38cdeafad1d912e3c3ab218ad65';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;

    fetch(url)
    .then(response => {
        if (response.ok){
            return response.json();
        } else {
            throw new Error('Error en la respuesta de la API');
        }
    })
    .then(data => {
        // console.log(data);
        const tabla = document.querySelector('#tabla-clima').getElementsByTagName('tbody')[0];

        //Valida si ya existe la ciudad no la inserte de nuevo
        const tr = tabla.getElementsByTagName('tr');
        for (let i = 0; i < tr.length; i++) {
            let ciudadTabla = tr[i].getElementsByTagName('td')[0];

            if (ciudadTabla.textContent.toLowerCase() == ciudad.toLowerCase()) return; 
        }

        const fila = tabla.insertRow();
        fila.insertCell().innerHTML = data.name;
        fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
        fila.insertCell().innerHTML = data.weather[0].description;
    })
    .catch(error => {
        console.error('Error al consultar el clima', error);
    });

}

function consultarClimas() {
    const ciudades = document.querySelector('#ciudades').value.split(',').map(ciudad => ciudad.trim());
    const API_KEY = '7988e38cdeafad1d912e3c3ab218ad65';

    Promise.all(ciudades.map(ciudad => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;

        return fetch(url).then(response => {
            if (response.ok) {
                return response.json();
            }else {
                throw new Error('Error en la respuesta de la API');
            }
        });
    }))
    .then(data => {
        const tabla = document.querySelector('#tabla-clima').getElementsByTagName('tbody')[0];

        data.forEach(ciudad => {
            const fila = tabla.insertRow();
            fila.insertCell().innerHTML = ciudad.name;
            fila.insertCell().innerHTML = `${(ciudad.main.temp - 273.15).toFixed(1)}°C`;
            fila.insertCell().innerHTML = ciudad.weather[0].description;
        });
    })
    .catch(error => {
        console.error('Error al consultar el clima', error);
    });
}

function limpiarTabla() {
    const tabla = document.querySelector('#tabla-clima').getElementsByTagName('tbody');

    for (let i = 0; i < tabla.length; i++) {
        tabla[i].innerHTML = '';        
    }
}