import express from 'express';
import path from 'path';
import hbs from 'hbs';
import forecast from './utils/forecast.js';
import geocode from './utils/geocode.js';

const app = express();
//const port; //write which port at the deployment


//directory paths

const projectDir = `${path.resolve()}`;
const publicDir = path.join(projectDir, './public/');
const viewsPath = path.join(projectDir, './templates/views');
const partialsPath = path.join(projectDir, './templates/partials/');

//setting handlebars

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setting static directory in a public folder
app.use(express.static(publicDir))

//home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'home page',
        name: 'Paulina Okulska'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('address not found')
    } else {
        //we want to find the function to run

        geocode(req.query.address, forecast);
        console.log('geocoding', req.query.address);
        //geocode(res.query.address, forecast)

        res.render('index', {
            city: req.query.address,
        })
    }

})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('*', (req, res) => {
    // return res.send('<h1>404. Page not found. Please write another url.</h1>')
    res.render('404', {
        error: 'Page not found. Please type another url.'
    })
})

app.listen(3001, console.log('listening to 3001'));