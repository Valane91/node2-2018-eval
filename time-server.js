const express = require('express');
const app = express();
const moment = require('moment');

app.get('/', (req, res) => {
  let now = moment().local().format('hh:mm:ss')
  var contype = req.headers['accept'];
   if (!contype || contype.indexOf('application/json') !== 0){
     res.send('<h1 style= "color:blue">'+now+'</h1>');
   }else{
     res.json({time:now})
   }
})

app.use('/client',
  express.static(__dirname + '/public')
)

app.listen(4000, () => {
    console.log('Server is listenning on localhost:4000');
});
