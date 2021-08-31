const CLEFAPI = 'e09109e10f1a8bd2e83ccf7ac1982d33';
let resultatsAPI;

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
        console.log(data);
    })

}