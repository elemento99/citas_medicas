import express from 'express'
import { engine } from 'express-handlebars';
import path from 'path'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import { nanoid } from 'nanoid'

const app = express()
const users = []
const __dirname = import.meta.dirname

//public directory
app.use(express.static(path.join(__dirname , '/public')))
app.use('/css', express.static(path.join(__dirname ,'/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname ,'/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname ,'/node_modules/jquery/dist')))

//handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname , './views'));



// app.get('/services', (req, res) => {
// res.render('services', {services: services})
// })
 
// app.get('/services/:name', (req, res) => {
    
    
//     const nameURL = req.params.name

//     //cómo buscar algo dentro de un array? re: find

//     const service = services.find((item) => item.url === `/services/${nameURL}` )
//     console.log(service)

//     //undefined
//     if(!service){
//         return res.render('404', { title: "No se encuentra el servicio"})
//     }

//         res.render('service', {service})

    
// });

app.get('/', async (req, res) => {

    const response = await axios.get("https://randomuser.me/api/")
    const gender = response.data.results[0].gender
    const first = response.data.results[0].name.first
    const last = response.data.results[0].name.last
    
    const user = {
        gender,
        first,
        last,
        id: nanoid(),
        timestamp: moment().format('LLL')
    }
    
    users.push(user)


    const newUsers = _.partition(users, (item) => item.gender === 'female')
    
    
    
   // const female = users.filter(item => item.gender === 'female')
    //const male = users.filter(item => item.gender === 'male')
    
    res.render('home', { item: newUsers });
});

//404

app.get ('*', (req, res) => {
    res.status(404).send('Página no encontrada');
});


app.listen(3001, () => console.log(`Servidor encendido http://localhost:${3001}`))