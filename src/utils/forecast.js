const request = require('postman-request')
const forecast = (lon,lat,callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lon+'&lon='+lat+'&appid=96f58f73549e17991a8d167445e31b54';
    urlMetric = url+'&units=metric';
    request({ 'url':urlMetric, 'json':true }, (error,response)=> {
        const data = response.body;
        const {description: weatherDescritpion} = data.weather[0];
        const {temp: dataTemp, humidity: dataHumidity} = data.main;
        const {name} = data
        if(error)
        {
            callback("Unable to connect to the server !");
        }
        else if(response.statusCode != 200 && data.wheather.lenght === 0)
        {
            callback("Unable to solve the query.");
        }
        else
        {
            callback(undefined," In "+name+" it's "+ weatherDescritpion +". There is "+dataTemp+ " degrees out and " +dataHumidity+" % to rain")
        }
    })

} 

module.exports = forecast