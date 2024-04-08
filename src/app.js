const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log("Per git");

const app = express();
const publicDirectoryPath = path.join(__dirname,'../public' )

//assegno ad una costante il percorso nuovo delle hbs
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname,'../templates/partials')
//Indico che il file da "proiettare su web" non è su questo foglio ma è sulla directory definita prima
app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs') //Il primo dev'esser scritto per forza in questo modo per far capire a express cosa vogliamo utilizzare, il secondo parametro sarà il nome dell'npm.
//Assegno alla variabile il percorso di un' altra directory appunto la directory 

//dico dove andar a trovare il file delle hbs con il nuovo percorso 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//con questa libreria possiamo rendere dinamica la pagina html e possiamo passargli anche un oggetto all'interno di questa funzione, poi una volta andati sulla pagina hbs, 
//passeremo la proprietà dell'oggetto inserita qui precededentemente-
app.get('',(req,res) => {
    res.render('index', {
        title:'Weather APP',
        name:'Francesco Pieralli'
    })
    });

app.get('/weather', (req,res) => {
        geocode(req.query.address,(error,{lat,lon,location}={}) => {
            if(error)
            {
                return res.send(error);
            }
            forecast(lat, lon,(error,forecastData=0)=>{
                if(error)
                {
                    res.send(error)
                }
                
                res.send({
                    'Forecast' : forecastData,
                    location,
                    'Address': req.query.address
                })
            })
        })
    }
    // else
    // {
    //     res.send({
    //         'error' : 'Type a valid address or coordinates.'
    //     })
    // }
)

app.get('/about', (req,res)=> {
    res.render('about', {
        title:'About Me',
        name:'Francesco Pieralli'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help Page',
        description:'If you need help, search this page to have the support that you need.',
        name:'Francesco Pieralli'
    })
})

app.get('/help/*',(req,res) => {
    res.render('404error', {
        title:'404 ERROR',
        name:'Francesco Pieralli',
        description: 'Help article not found'
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:"You must provide a search term"
        })
    }
    
    res.send({
        products:'[]'
    })
})
app.get('*',(req,res) => {
    res.render('404error', {
        title:'404 ERROR',
        name:'Francesco Pieralli',
        description: 'PAGE NOT FOUND'
    })
})

app.listen(3000,()=> {
    console.log("Server is running");
})
