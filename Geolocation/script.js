
let h2 = document.querySelector('h2'); // Seleciona  o elemento h2 do html
var map;
console.log(map);

// Função de sucesso na geolocalização
function sucesso(pos){
    console.log(pos.coords.latitude, pos.coords.longitude);
    h2.textContent = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`;

    // Laço de repetição para verificar se o mapa foi iniciado ou não pelo usuario
    // Abaixo ele remove o mapa existente, para caso o usuario queira mudar a localização
    if (map === undefined) {
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);
    } else {
        map.remove();
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);
    }

    // Código oferecido no próprio site do Leafflet para adicionar as camadas de tiles do openstreet
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adiciona o marcador de posição
    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
        .bindPopup('Aquie é a sua localização atual.')
        .openPopup();

}

// Função para encontrar erros na geolocalização
function erro(err){
    console.log(err);
}

// Chama a função erro e sucesso conforme necessário
var watchID = navigator.geolocation.watchPosition(sucesso, erro, {
    enableHighAccuracy: true, //Script JS que mantém a localização precisa
    timeout : 5000 //Definiçaõ do tempo de resposta
});