const express = require('express')
const app = express()

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

app.use('/client',
    express.static(__dirname + '/public')
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
