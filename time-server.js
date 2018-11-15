const express = require('express');
const app = express();


app.get('/', (req, res) => {
//  res.sendFile(__dirname + '/public/index.html')
res.write('<h1>TEST</h1>')
})

app.use('/client',
  express.static(__dirname + '/public')
)



app.listen(4000, () => {
    console.log('Server is listenning on localhost:4000');
});
