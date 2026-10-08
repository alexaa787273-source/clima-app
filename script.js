const API_KEY = '57278a58488c44bb3827df7bebb3b3482d2';
const URL_BASE = 'https://api.openweathermap.org/data/2.5/weather';

async function consultarClima() {
    const ciudad = document.getElementById('ciudad').value.trim();
    const resultado = document.getElementById('resultado');

    if (!ciudad) {
        resultado.innerHTML = `<p>⚠️ Escribe el nombre de una ciudad</p>`;
        return;
    }

    try {
        const respuesta = await fetch(
            `${URL_BASE}?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
        );

        if (!respuesta.ok) {
            throw new Error('Ciudad no encontrada');
        }

        const datos = await respuesta.json();
        mostrarClima(datos);

    } catch (error) {
        resultado.innerHTML = `<p>❌ No se encontró la ciudad. Verifica el nombre.</p>`;
    }
}

function mostrarClima(datos) {
    const resultado = document.getElementById('resultado');
    const icono = datos.weather[0].icon;
    const descripcion = datos.weather[0].description;

    resultado.innerHTML = `
        <h2>${datos.name}</h2>
        <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="${descripcion}">
        <div class="temperatura">${Math.round(datos.main.temp)}°C</div>
        <div class="descripcion">${descripcion}</div>
        
        <div class="detalles">
            <div class="detalle">
                <div class="detalle-label">SENSACIÓN</div>
                <div class="detalle-valor">${Math.round(datos.main.feels_like)}°C</div>
            </div>
            <div class="detalle">
                <div class="detalle-label">HUMEDAD</div>
                <div class="detalle-valor">${datos.main.humidity}%</div>
            </div>
            <div class="detalle">
                <div class="detalle-label">PRESIÓN</div>
                <div class="detalle-valor">${datos.main.pressure} hPa</div>
            </div>
            <div class="detalle">
                <div class="detalle-label">VIENTO</div>
                <div class="detalle-valor">${datos.wind.speed} m/s</div>
            </div>
        </div>
    `;
}

// Buscar con Enter
document.getElementById('ciudad').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        consultarClima();
    }
});