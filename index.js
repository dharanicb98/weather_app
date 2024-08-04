const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/weather', async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }
    try {
        const options = {
            method: 'GET',
            url: `https://open-weather13.p.rapidapi.com/city/${city}/EN`,
            headers: {
              'x-rapidapi-key': '1da8a5accbmsha8841e371b1e610p129464jsn6acf805d8f87',
              'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
            }
          };
        const response = await axios.request(options);
        res.send(response.data)
         
    }
     catch (error) {
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Weather service listening at http://localhost:${port}`);
});



