document.addEventListener("DOMContentLoaded", function () {
    // Obtém a localização via GPS
    function obterLocalizacaoGPS() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(obterPrevisaoTempo, erroGPS);
        } else {
            alert("Geolocalização não é suportada neste navegador.");
        }
    }

    // Obtém a localização via IP
    function obterLocalizacaoPorIP() {
        fetch("https://ipapi.co/json/")
            .then(response => response.json())
            .then(data => {
                const latitude = data.latitude;
                const longitude = data.longitude;
                const cidade = data.city;

                document.getElementById("localizacao").innerHTML = `
                    🌍 Sua localização por IP: <strong>${cidade}</strong> 
                    <br>📍 Coordenadas: ${latitude}, ${longitude}
                `;

                obterPrevisaoTempo({ coords: { latitude, longitude } });
            })
            .catch(error => {
                document.getElementById("localizacao").innerHTML = "Erro ao obter localização por IP.";
                console.error("Erro ao obter localização por IP:", error);
            });
    }

    // Exibe erro se o usuário negar o GPS
    function erroGPS(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("Usuário negou a solicitação de geolocalização.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Informações de localização não disponíveis.");
                break;
            case error.TIMEOUT:
                alert("A requisição de geolocalização expirou.");
                break;
            case error.UNKNOWN_ERROR:
                alert("Ocorreu um erro desconhecido.");
                break;
        }
    }

    // Busca a previsão do tempo
    function obterPrevisaoTempo(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        document.getElementById("localizacao").innerHTML += `
            <br>📍 Coordenadas: ${latitude}, ${longitude}
        `;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=America/Sao_Paulo`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temperatura = data.current_weather.temperature;
                const vento = data.current_weather.windspeed;
                const condicao = data.current_weather.weathercode;

                const condicoesClimaticas = {
                    0: "Céu limpo ☀️",
                    1: "Predomínio de sol 🌤️",
                    2: "Parcialmente nublado ⛅",
                    3: "Nublado ☁️",
                    45: "Nevoeiro 🌫️",
                    48: "Nevoeiro com geada 🌫️❄️",
                    51: "Chuvisco leve 🌧️",
                    53: "Chuvisco moderado 🌧️",
                    55: "Chuvisco forte 🌧️🌧️",
                    61: "Chuva leve 🌦️",
                    63: "Chuva moderada 🌧️",
                    65: "Chuva forte 🌧️🌧️",
                    71: "Neve leve ❄️",
                    73: "Neve moderada ❄️❄️",
                    75: "Neve intensa ❄️❄️❄️",
                    80: "Aguaceiros leves 🌧️",
                    81: "Aguaceiros moderados 🌧️",
                    82: "Aguaceiros fortes 🌧️🌧️",
                };

                document.getElementById("previsao").innerHTML = `
                    <p>🌡️ Temperatura: <strong>${temperatura}°C</strong></p>
                    <p>💨 Velocidade do vento: <strong>${vento} km/h</strong></p>
                    <p>🌥️ Condição: <strong>${condicoesClimaticas[condicao] || "Desconhecido"}</strong></p>
                `;
            })
            .catch(error => {
                document.getElementById("previsao").innerHTML = "<p>Erro ao carregar previsão do tempo.</p>";
                console.error("Erro na API:", error);
            });
    }

    // Disponibiliza as funções para os botões
    window.obterLocalizacaoGPS = obterLocalizacaoGPS;
    window.obterLocalizacaoPorIP = obterLocalizacaoPorIP;
});
