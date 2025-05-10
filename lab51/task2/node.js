const axios = require('axios');

axios.get('https://vk.com')
  .then(res => {
    console.log('Node response status:', res.status);
    console.log(res.data.slice(0, 200));
  })
  .catch(err => {
    console.error('Node error:', err.message);
  });