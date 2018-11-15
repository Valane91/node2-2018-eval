const express = require('express'); 
const app = express();
const fetch = require('node-fetch'); 
 
// Store the result of all the fetches.
let historic = [];
let count = 0; 


// Store the different uris we are going to fetch. 
const uris = {
    'time': 'http://localhost:4000/'
    , 'secret': 'http://localhost:4001/secret'
}; 



/*
 * 'addResult' add the result of the current fetch in global array 'result', 
 * if the fetch for both uri is done.  
 * @param fetchResult : result to put the data result  
 */
const addResult = (fetchResult) => {
    /*
     * First we check if all the fetches are done, 
     * by looping through fetchResult. 
     */
    const done = fetchResult['time'].done && fetchResult['secret'].done; 

    /*
     * Then if the all the fetches are done, we add to the global 'result' 
     * the pair of results in the corresponding format. 
     */
    if(done) {

        count += 1; 

        const resultJSON = {
            'time' : fetchResult['time'].data.time
            , 'secret' : fetchResult['secret'].data.secret
        }
 
        historic.unshift(resultJSON);         
    }    
}


/*
 * Given an uri, we fetch the data from it and them to fetchResult
 * @param uri : indicates uri in where to fetch datas
 * @param key : indicates the nature of the datas we're fetching
 * @param fetchResult : result to put the data result 
 */
const fetchURI = (key, fetchResult) => {
    /*
     * First we check out if the data for this key 
     * has been fetched. 
     */
    if(!fetchResult[key].done) {
        uri = fetchResult[key].uri; 

        fetch(uri, {
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }         
        })
        .then(res => res.json())
        .then(res => {
            fetchResult[key].data = res; 
            fetchResult[key].done = true; 
        })
        .then(() => {
            addResult(fetchResult); 
        })
        .catch(err => {
            console.log(err); 
            process.exit(); 
        }); 
    }
}

/*
 * Entry point to fetch the datas from the different uris. 
 */
const fetchData = () => {
    
    /*
        'fetchResult' will store the data of the fetches for both uri, 
        and indicates if the fetch is done or not.   
     */

    const fetchResult = {
        'time' :
        {
            'uri': uris.time
            , 'done': false
            , 'data' : ''
        }

        , 'secret' :
        {
            'uri': uris.secret
            , 'done': false
            , 'data' : ''
        }
    };

 
    fetchURI('time', fetchResult);
    fetchURI('secret', fetchResult);
}

app.get('/:id', (req, res) => {
    const id = req.params.id; 

    if(id < 1) {
        res.status(400);
        res.json({'error_id' : 'inferior to 1'}); 
    } 
    else if(id > 10) {
        res.status(400);
        res.json({'error_id' : 'superior to 10'}); 
    }
    else if(isNaN(id)) {
        res.status(400);
        res.json({'error_id' : 'not a number'}); 
    } else {
        res.status(200); 
        res.json(historic.slice(0, id));
    }
    
}); 

app.listen(4002, () => {
    console.log('Listenning on port 4002'); 

    setInterval(fetchData, 5000);  
}); 