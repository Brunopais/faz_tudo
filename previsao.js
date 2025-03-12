document.addEventListener("DOMContentLoaded", function () {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current_weather=true&timezone=America/Sao_Paulo";

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
});
