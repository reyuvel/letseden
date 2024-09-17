const express = require('express');
const request = require('request');
const cors = require('cors'); // Add this line to handle CORS
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Use CORS middleware to avoid CORS issues

app.get('/api/distancematrix', (req, res) => {
  const { origins, destinations } = req.query;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}`;

  request(url).pipe(res);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
