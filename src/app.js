const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode");
const forcast = require("./utils/forecast");

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Priyanshu shrama'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Priyanshu sharma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Priyanshu sharma'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address;
    if(!address) {
        return res.send({
            error: "please provide address in search query to get weather ex: (?address=place)!"
        })
    }

    geocode(address,(error,{latitude,longitude,location}={}) => {
        if(error) {
            return res.json({
                error
            })
        }

        forcast(latitude,longitude,(error,{temperature,weather_descriptions,weather_icons}={}) => {
            if(error) {
                return res.json({
                    error
                })
            }
            
            res.json({
                temperature: `${temperature} deg`,
                weather_descriptions: `Currently weather is ${weather_descriptions}`,
                location,
                address,
                weather_icons: weather_icons[0]
            })
        })
    })
})


// app.get("/store",(req,res) => {
//     console.log(req.query)
//     if(!req.query.search) {
//        return res.json({
//             error: "Please provide search query!"
//         })
//     }
//     res.json({
//         product: []
//     })
// })


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Priyanshu sharma',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Priyanshu sharma',
        errorMessage: 'Page not found.'
    })
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is up on port: ' + PORT);
})