import axios from 'axios';

const mapsKey = '&key=AIzaSyAJKuQuJmS59G-GrpuQYL95b1N4916Mxu4';
const mapsUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const darkskyUrl = 'https://api.darksky.net/forecast/ce5a5cd0daa1829db41e745178cf2800/'
const corsUrl = 'https://cors-anywhere.herokuapp.com/';

export const GET_WEATHER = 'GET_WEATHER';

function getHistoric(coordinates, callback) {
        const { lat, lng } = coordinates;            

        //historic weather info
        let historicArr = [];
        const numOfDays = 7;
        const currentTime = Date.now() / 1000;
        //one day in secs
        const oneDay = 86400;
        //seven days in secs;
        const daysAgo = 604800;
        for (let i = 0; i < numOfDays; i++) {
            //unix time for seven days ago in seconds
            //(current unix time in secs) - ((seven days ago in secs) - (one day in secs) * (num of days in secs))
            let time = Math.round(currentTime - (daysAgo - (oneDay * i)));
            historicArr.push(corsUrl + darkskyUrl + lat + "," + lng + "," + time);
        }
        
        let axiosArr = historicArr.map(url => axios.get(url));
        axios.all(axiosArr).then(result => {
            const allData = result.map(res => res.data);
            callback(allData);
        })
}

export function getWeather(coordinates) {
    const { lat, lng } = coordinates;
    const url = corsUrl + darkskyUrl + lat + ',' + lng;
    const request = axios.get(url);

    return {
        type: GET_WEATHER,
        payload: request
    }
}

export function getCoordinates(address, callback, callback2) {
    const url = mapsUrl + address + mapsKey;

    axios.get(url).then(
        function (data) {
            if (data.data.status !== 'ZERO_RESULTS') {
                const coordinates = data.data.results[0].geometry.location;
                callback(coordinates);
                getHistoric(coordinates, callback2);

            }
            else {
                alert("Please enter a valid city or address");
            }

        }
    );

}