const request = require('postman-request')

const geocode = (address,callback) => {
    const url = 'https://api.tomtom.com/search/2/geocode/'+ encodeURIComponent(address) +'.json?storeResult=false&view=Unified&key=KhOD2v0ZyjYYdYyEbuMLGEn1o87GxxHp'
    request({'url': url, 'json':true}, (error, response) => {
        if(error)
        {
            callback('Unable to connect to server!!')
        }
        else if (!response.body.results.length)
        {
            callback("Cannot find the location that you have inputed")
        }
        else
        {
            const data = response.body.results[0].position
            const  {lat,lon} = data
            const {freeformAddress : location} = response.body.results[0].address
            if(lat === undefined || lon === undefined)
            {
                console.log("The position is not correct");
            }
            else
            {
                callback(undefined,{
                    'lat': lat, 
                    'lon': lon,
                    'location' : location
                })
            }
        }


    })
}
module.exports = geocode