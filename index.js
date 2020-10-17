const express = require('express');
const app = express();
const http = require('http');
const morgan = require('morgan');
const { GoogleSpreadsheet } = require('google-spreadsheet');

require("dotenv").config();

app.use(morgan('dev')); // Morgan to log requests on server console

const credentials = require('./credentils.json');
const server = http.createServer(app);

app.get('/',(req,res) =>{
    console.log("Hello Logger!!")
    res.send('Hello there! This is Coder\'s Calendar server!');
})


app.get('/data', async (req,res)=>{

    const doc = new GoogleSpreadsheet(process.env.SHEET_KEY);
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    const rows = await sheet.getRows({offset:1});

    var datalist = [];

    rows.forEach(row=>{
        const obj = {
            platform: row.contestsite,
            id: row.id,
            title: row.name,
            start: row.start,
            end: row.end,
            duration: row.duration,
            link: row.link,
            status: row.status,
        };
        datalist.push(obj);
    })

    const finalObj = {
        built_by: "Hemang Nakarani",
        length: datalist.length,
        objects: datalist,
    }

    res.send(finalObj);

})


// If request is able pass till here, route was not found. => Send 404 error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });
  
  // Handle all the previous errors (including 404 and others)
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error : {
        message: error.message
      }
    });
  })

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}...`
  );
});