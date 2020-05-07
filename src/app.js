//adding comment
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup statis directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Conor Lynch'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Conor Lynch'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Conor Lynch',
        message: 'This is a help message'
    })
})

app.get('/products', (req, res) => {
    //search is a parameter
    if (!req.query.search) {
        return res.send({ error: 'You must provide a search term' })
    }

    res.send({

        products: []
    })
})

app.get('/weather', (req, res) => {

    //search is a parameter
    if (!req.query.address) {
        return res.send({ error: 'You must provide an address' })
    }
    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ 'error': error })
        }

        console.log(location)

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ 'Forecast Error': error })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Conor Lynch',
        errorMessage: 'This is a help error message'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Conor Lynch',
        errorMessage: 'This is an error message'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})