// what does an axios library need?
// axios.get('/user?ID=12345')
//   .then(function (response) {
//   console.log(response);
// })
//   .catch(function (error) {
//     console.log(error);
//   });

const https = require('https');
const URL = require('url').URL;

const get = (url, params = {}) => new Promise((resolve, reject) => {
  const urlObj = new URL(url);
  const options = {
    host: urlObj.hostname,
    path: urlObj.pathname,
    method: 'GET',
  };
  https.get(url, (res) => {
    let finalData;
    res.on('data', (data) => {
      console.log(typeof data);
      // wtf is this data?
      // https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93
      // https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/
      finalData = data;
    });
    res.on('end', () => {
      console.log(finalData);
    });
    resolve(res);
  });
});

get('https://aachallengeone.now.sh/read');
