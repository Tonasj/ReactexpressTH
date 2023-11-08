const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/express_data', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  fetch('https://api.porssisahko.net/v1/latest-prices.json')
  .then(response => response.json())
  .then(json => res.send(json))
  .catch((err) => {
    console.log(err.message);
  });
});