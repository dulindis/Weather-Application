import express from 'express';
import path from 'path';
import hbs from 'hbs';

const app = express();


//directory paths
const projectDir = `${path.resolve()}`;
const publicDir = path.join(projectDir,'./public/')
//console.log(publicDir);

app.use(express.static(publicDir))









app.get('/weather', (req, res) => {
    res.send({"title":"cloudy", "rain": true})
})

app.listen(3001, console.log('listening to 3001'));