// what does an axios library need?
// axios.get('/user?ID=12345')
//   .then(function (response) {
//   console.log(response);
// })
//   .catch(function (error) {
//     console.log(error);
//   });

const http = require('http');
const URL = require('url').URL;

const get = (url, params = {}) => new Promise((resolve, reject) => {
  const urlObj = new URL(url);
  const options = {
    host: urlObj.hostname,
    path: urlObj.pathname,
    method: 'GET',
  };
  http.get(options, (res) => {
    resolve(res);
  });
});

get('https://aachallengeone.now.sh/read');
