import tabJoursEnOrdre from "./Utilitaire/gestionTemps.js";

const CLEFAPI = 'e09109e10f1a8bd2e83ccf7ac1982d33';
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');

//Pour récupérer la position de l'utilisateur
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(lon, lat);

    }, () => {
        alert(`Vous avez refuser la géolocalisation, l'application ne peux pas fonctionner, veuillez l'activer !`);
    })
}

//Fonction d'appel de l'API 
function AppelAPI(lon, lat) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        
        resultatsAPI = data;

        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
        localisation.innerText = resultatsAPI.timezone;

        //Les heures par tranches de 3, avec leurs températures

        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++) {

            let heureIncr = heureActuelle + i * 3;

            if(heureIncr > 24) {
            heure[i].innerText = `${heureIncr - 24} h`;
            } else if(heureIncr === 24) {
                heure[i].innerText = '00 h'
            } else {
                heure[i].innerText = `${heureIncr} h`
            }

        }

        //temp pour 3h 
        for(let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)} °`
        }

    })

}