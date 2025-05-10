axios.get('https://vk.com')
  .then(response => {
    console.log('Browser got data:', response.data);
    document.getElementById('result').textContent = JSON.stringify(response.data, null, 2);
  })
  .catch(error => {
    console.error('Browser error:', error);
    document.getElementById('result').textContent = error;
  });