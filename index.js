const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3001

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const fs = require('fs');

app.post('/', (req, res) => {
  console.log(req.body);

  fs.writeFile(req.body.name, req.body.content, function (err) {
    if (err) return console.log(err);
      var child = require('child_process').spawn(
        'java', [req.body.name]
      );
      var result = '';
    
      child.stdout.on('data', (data) => {
        result += data;
      });
    
      child.stderr.on('data', (data) => {
        result += data;
      });
    
      child.on('close', (code) => {
        res.send(result)
      });
  });

  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

