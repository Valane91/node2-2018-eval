const express = require('express')
const app = express()
var fs = require('fs-extra'); //var fs = require('fs')
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
const port = 4001
var path = require('path');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Encrypt funcion using Crypo
function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

// Decrypt funcion using Crypo
function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

var public = path.join(__dirname, 'public');
var momentFile = path.join(__dirname, 'node_modules');
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.get('/secret', function (req, res) {
    fs.readFile('data/secret.txt','utf-8').then(function (data) {
        var secret = decrypt(data);
        res.status(200).json({'secret':secret})
    }).catch (function (e) {
        res.status(400).json({'error':"bad request"})
    });
});

app.put('/secret', function (req, res) {
    console.log(req);
    var hw = encrypt(req.body.secret)
    fs.outputFile('data/secret.txt', hw)
        .then(() => fs.readFile('data/secret.txt', 'utf8'))
        .then(data => {
            res.status(200).json({'status':'new password set'})
        })
        .catch(err => {
            res.status(400).json({'status':'bad request'})
        })
});
app.use('/scripts', express.static(momentFile));

app.use('/', express.static(public));
console.log(momentFile)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
