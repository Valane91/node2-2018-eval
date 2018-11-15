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


function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}
var hw = encrypt("itakdemy")
console.log(hw)
// outputs hello world
console.log(decrypt(hw));

var public = path.join(__dirname, 'public');
var momentFile = path.join(__dirname, 'node_modules');
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.get('/secret', function (req, res) {
    fs.readFile('data/secret.txt','utf-8').then(function (data) {
        var secret = decrypt(data);
        res.send(secret)
    }).catch (function (e) {
        console.log(e)
    });
});

app.put('/secret', function (req, res) {
    var hw = encrypt(req.query.secret)
    fs.outputFile('data/secret.txt', hw)
        .then(() => fs.readFile('data/secret.txt', 'utf8'))
        .then(data => {
            res.json({status:"new password set"})
        })
        .catch(err => {
            res.send(err)
        })
});


app.use('/scripts', express.static(momentFile));

app.use('/', express.static(public));
console.log(momentFile)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
