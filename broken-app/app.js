const express = require('express');
let axios = require('axios');
var app = express();

app.post('/', async function(req, res, next) {
  try {
    // Wait for all requests to complete
    let userData = await Promise.all(req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    }));

    // Map over the results array to create the output array
    let output = userData.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(output));
  } catch (err) {
    next(err);
  }
});

app.listen(3000);
