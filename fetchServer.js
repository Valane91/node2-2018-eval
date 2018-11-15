/*
 * Fetch datas from the other servers
 */

const fetch = require('node-fetch');

// Store the result of all the fetches.
let datasHistoric = [];


// Store the different uris we are going to fetch.
const uris = {
    'time': 'http://localhost:4000/'
    , 'secret': 'http://localhost:4001/secret'
    , 'historyServer' : 'http://localhost:4002/1'

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

     let isDone = true;

     for(key in fetchResult) {

        if(fetchResult[key].done === false) {
            isDone = false;
        }

     }

    /*
     * Then if the all the fetches are done, we add to the global 'result'
     * the pair of results in the corresponding format.
     */
    if(isDone) {

        const timeData = (fetchResult['time'].data === 'DOWN') ? 'DOWN' : fetchResult['time'].data.time;
        const secretData = (fetchResult['secret'].data === 'DOWN') ? 'DOWN' :  fetchResult['secret'].data.secret;
        const historyServerData = fetchResult['historyServer'].data;

        const resultJSON = {
            'time' : timeData
            , 'secret' : secretData
            , 'historyServer' : historyServerData
        }

        datasHistoric.push(resultJSON);
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
          fetchResult[key].data = "DOWN";
          fetchResult[key].done = true;
          addResult(fetchResult);
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

    const fetchResult =
    {
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
        , 'historyServer':
        {
            'uri': uris.historyServer
            , 'done': false
            , 'data' : ''
        }
    };


    fetchURI('time', fetchResult);
    fetchURI('secret', fetchResult);
    fetchURI('historyServer', fetchResult);

    return datasHistoric;
}



module.exports = {
    fetchData
};
