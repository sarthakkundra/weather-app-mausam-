
const request = require('request')

const forecast = (longitude,latitude,callback) =>{

    const link = 'https://api.darksky.net/forecast/b5d230f9467646a3eac745b4d4129885/'+longitude +','+ latitude+''

    request({url: link, json:true}, (error,{body}) =>{
        if(error){

            callback('Unable to connect to forecast services!', undefined)

        } else if(body.error) {

            callback(body.error,undefined)
        } else {

            callback(undefined,'' + body.hourly.summary +'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of raining.')
    
        }
    })
}

module.exports = forecast