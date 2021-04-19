const express = require('express');
const app = express();
const https = require('https')
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
const { response } = require('express');
const { error } = require('console');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));
var request = require("request");
const port = process.env.PORT || 3200;

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/result', (req, res) => {
    console.log(req.body.title);
    const apiKey = "f1dc652";
    let title = req.body.title;
    let reqUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`
    console.log(reqUrl);
    request(reqUrl, (error, response, body) => {
      

      
        var movieData = JSON.parse(body);
        console.log(movieData);
        if(movieData.Response == 'False'){
          console.log("not a movie");
          res.render('error');
         
        }
        else {
        res.render('result', {movieData});
        }
        
        
      
    });
    });

  


app.listen(port, () => {
  console.log('Example app listening!')
});