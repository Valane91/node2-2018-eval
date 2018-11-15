const express = require('express')
const app = express()
const fetch = require('node-fetch');

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
    res.json({data:datas})
});
app.get('/server/:name', function(req, res) {
   console.log("toto")
});
app.put('/secret', function(req, res) {
    var secret = fetchURI(req.body.secret)
    //res.json(secret);
});


app.use('/client',
    express.static(__dirname + '/public')
)

const fetchURI = (body) => {
        fetch("http://localhost:4001/secret", {
            method: 'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
            },
            body:JSON.stringify(body),
        })
            .then(res => res.json())
            .then(res => {
               return res
            })
            .catch(err => {
                console.log(err);
                process.exit();
            });

}



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
