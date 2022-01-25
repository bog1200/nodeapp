const fs = require('fs');
const {google} = require('googleapis');
const path = require("path");
let privatekey, google_token, jwtClient;
const keyfile=path.resolve(__dirname,"../privatekey.json");
if (fs.existsSync(keyfile)) {
    privatekey = require(keyfile);
    // If modifying these scopes, delete your previously saved credentials
    // at ~/.credentials/google-apis-nodejs-quickstart.json
    jwtClient = new google.auth.JWT(
        privatekey.client_email,
        null,
        privatekey.private_key,
        ['https://www.googleapis.com/auth/youtube.readonly']);
    get_loop();
    
}else {
    console.log("[BOT] Google API not enabled");
}
function get_loop() {
    jwtClient.authorize((err, tokens) => {
    if (err) {
        console.log(err);
    } else {
        if(!google_token)
        {
        console.log("[Google] API Successfully connected!");
        } else {
            console.log("[Google] API Key refreshed!");
        }
        google_token=tokens.access_token;
        setTimeout(get_loop, tokens.expiry_date-Date.now()); 
        }
    })          
}

async function getkey(){
    return new Promise((resolve, reject) => {
        if (google_token) resolve(google_token);
        else reject("No token available");
    })
}
module.exports.getkey = getkey;
