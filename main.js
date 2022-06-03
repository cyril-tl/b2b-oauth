const express = require('express')
// declare const Buffer
var cors = require('cors')
const app = express()

app.use(cors());

app.use('/app', express.static(__dirname + '/ui/dist'));

let count = "1";

app.get('/count', (req, res) => {
  res.json({
    "changed": count
  });
})

// const background = function () {
//   console.log('background executed');
//   setTimeout(background, 5000);
//   count++;
// }

// background();

// test GMAO
const { httpGet, getUrl } = require("./crypto-hash");

app.get("/gmao/login", async (req, res) => {
  const authHeader = req.headers['authorization'];
  console.log('authHeader: ' + authHeader);
  if (authHeader != null && authHeader.substring(0, 5) == "Basic") {
    //Extract credentials
    var encodedUsernamePassword = authHeader.substring("Basic ".length).trim();
    // Base64 encoded string
    const base64 = encodedUsernamePassword;
    // create a buffer
    const buff = Buffer.from(base64, 'base64');
    // decode buffer as UTF-8
    const str = buff.toString('utf-8');
    // print normal string
    console.log(str);

    var usernamePassword = Buffer.from(encodedUsernamePassword, 'base64').toString()
    var splitedParams = usernamePassword.split(':');
    var username = splitedParams[0];
    var password = splitedParams[1];
    console.log(username, password)

    // utilisation des credentials
    const url = getUrl(username, password)
    if (url) {
      const message = await httpGet(url);
      console.log(message.data)
      res.status(200).json(message.data);
    }
  } else {
    //Handle what happens if that isn't the case
    res.status(401).json({ test: "error" });
  }
});

// const login = function (email, password) {
//   console.log('login executed');
// }

app.listen(3000, () => {
  console.log(`MESS (Mongo Event Sourcing) listening at http://localhost:3000`);
});