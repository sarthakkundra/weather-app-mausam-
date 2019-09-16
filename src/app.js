const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//Defining parts for Express config
const viewsPath = path.join(__dirname,'../templates/views')
const publicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()
//Setting up handlebars and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) =>{
    res.render('index', {
        title: '',
        name: 'Sarthak Kundra',
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help ',
        description: ' Get all sorts of help from this page',
        name: 'Sarthak Kundra'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Sarthak Kundra'
    })
})
app.get('/weather', (req, res) =>{

    if(!req.query.address){
        return res.send ({
            error: 'You must provide a search term!'
        })
    }
        geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{

            if(error){
                return res.send({error})
            }

            forecast(latitude,longitude, (error,forecastData) =>{
                if(error){
                    return res.send({error})
                }

                res.send ({
                    forecast: forecastData,
                    location,
                    address: req.query.search
                })
            })
        })
        
    
   
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title:'404',
        name: 'Sarthak Kundra',
        errorMessage: 'Help page not found!'
    })
})

app.get('*', (req, res) =>{

    res.render('404', {
        title: '404',
        name: 'Sarthak Kundra',
        errorMessage: '404 page not found!'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000!')
})