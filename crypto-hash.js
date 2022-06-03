var CryptoJS = require("crypto-js");
var axios = require("axios").default;


function getNonce() {
    var word_characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var nonce = '';
    for (var i = 0; i < 20; i++) {
        nonce += word_characters[parseInt(Math.random() * word_characters.length, 10)];
    };
    return nonce;
}

function getUrl(email, password) {
    const NONCE = getNonce()
    const USER_ID = email
    const USER_PASS = password
    const CONSUMER_ID = "4MQvOWX6hWBtfzdKw6tz4OTHHZTipXY4lbf304S46FYLBsFGeW"
    const CONSUMER_SECRET = "uVSWLGnUQ0tdIJvCepB4qSBR63Fjm1ndCv2Ev76uvi3EfqAoiv"
    const time_stamp = parseInt((new Date()).getTime() / 1000, 10);
    var bassign = `oauth_nonce="${NONCE}"`
    bassign += `,oauth_token="${USER_ID}"`
    bassign += `,oauth_consumer_key="${CONSUMER_ID}"`
    bassign += `,oauth_timestamp="${time_stamp}"`
    var sign = encodeURI(bassign)
    sign = CryptoJS.HmacSHA256(sign, CONSUMER_SECRET + "&" + USER_PASS + "&" + NONCE).toString(CryptoJS.digest)
    console.log('sign:\n' + sign)

    // console.log(
    //     httpGet('https://api.thiriez-literie.fr/auth/tokenV2?Authorization=OAuth' + encodeURI(bassign + `,oauth_signature="${sign}"`))
    // )
    const testUrl = 'https://api.thiriez-literie.fr/auth/tokenV2?Authorization=OAuth ' + encodeURI(bassign + `,oauth_signature="${sign}"`)
    return testUrl;
}

async function httpGet(theUrl) {
    try {
        console.log('theUrl:\n' + theUrl);
        const response = await axios.get(theUrl);
        // console.log("httpGet:\n" + response);
        return response
    } catch (error) {
        console.error("httpGet error:\n" + error);
        return error
    }
}

module.exports = {
    getUrl,
    httpGet,
};