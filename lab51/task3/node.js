const axios = require('axios');

axios.get('https://json.geoiplookup.io/')
  .then(res => {
    console.log('Node response status:', res.status);
    console.log('Node response data:\n', JSON.stringify(res.data, null, 2));
  })
  .catch(err => {
    console.error('Node error:', err.message);
  });