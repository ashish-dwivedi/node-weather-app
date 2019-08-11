const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');


// Set handlebar engine and view location
app.set('views', viewsPath)
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Set static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ashish Dwivedi'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ashish Dwivedi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Ashish Dwivedi'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a valid address!'
        });
    }
    geocode(req.query.address, (error, response) => {
        if (error) {
            return res.send({ error });
        }
        forecast(response.longitude, response.longitude, (error, forecastResponse) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                address: req.query.address,
                forecast: forecastResponse.summary,
                location: response.location
            })
        });
    })
});

app.get('/help/*', (req, res) => {
    res.render('404-handler', {
        message: 'Help article not found!',
        title: 'Article not found',
        name: 'Ashish Dwivedi'
    });
})

app.get('*', (req, res) => {
    res.render('404-handler', {
        message: 'Page Not Found',
        title: 'Page not found',
        name: 'Ashish Dwivedi'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000 🚀');
});