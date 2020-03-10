const express = require('express');

const app = express();
app.use(express.json())

function convertStringDateToInteger(date){
    years = parseInt(date.split("-")[0]);
    months = parseInt(date.split("-")[1]);
    days = parseInt(date.split("-")[2]);
    return years*946080000000 + months*2592000000 + days*86400000;
}


/*
{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}

*/

app.get('/api/timestamp/', (req, res) => {
    inDate = new Date();
    res.json({
        unix: inDate.getTime(),
        utc: inDate.toUTCString()
    });
})


function isDateValid(date){
    years = parseInt(date.split("-")[0]);
    months = parseInt(date.split("-")[1]);
    days = parseInt(date.split("-")[2]);
    if(years>0 && months<=12 && days<=31) return true;
    else{
        return false;
    }
}

app.get('/api/timestamp/:date_string', (req, res) => {
    if (req.params.hasOwnProperty('date_string')){
        if(isDateValid(req.params.date_string)){
            let inDate = new Date(req.params.date_string); // req.params.date_string
            console.log(inDate);

            res.json({
                unix: inDate.getTime(),
                utc: inDate.toUTCString()
            });
        }
        else{
            res.json({
                error: "Invalid Date"
            })
        }
        
    }
       
})

app.listen(3000);
console.log("listening on port 3000...");