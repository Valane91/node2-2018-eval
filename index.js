const express = require('express')
const app = express()

const fetchServer = require('./fetchServer'); 

const port = 5000
var path = require('path');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));



var public = path.join(__dirname, 'public');
var momentFile = path.join(__dirname, 'node_modules');

app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});


app.get('/server', function(req, res) {
    var datas = fetchServer.fetchData()
    console.log(datas);
    res.json({data:datas})
});
app.get('/server/:name', function(req, res) {
   console.log("toto")
});


app.use('/client',
    express.static(__dirname + '/public')
)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
