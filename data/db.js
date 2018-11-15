var fs = require('fs-extra'); //var fs = require('fs')
fs.readFile('data/secret.txt','utf-8').then(function (data) {

    console.log(data);

}).catch (function (e) {

    console.log(e)

});

const ReadSecretFile =  () => new Promise((resolve, reject) => {
    fs.readFile(FILE, options, (err, contents) => {
        if (err) {
            reject(err)
        } else {
            const data = JSON.parse(contents)
            resolve(data)
        }
    })



    fs.readFile('data/secret.txt','utf-8').then(function (data) {

        console.log(data);

    }).catch (function (e) {

        console.log(e)

    });

})
