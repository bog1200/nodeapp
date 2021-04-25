const fs = require('fs');
const {google} = require('googleapis');
const { get } = require('http');
let privatekey, google_token, jwtClient, last_update;
let enabled = true;
if (fs.existsSync("../privatekey.json")) {
    privatekey = require("../privatekey.json");
    // If modifying these scopes, delete your previously saved credentials
    // at ~/.credentials/google-apis-nodejs-quickstart.json
     jwtClient = new google.auth.JWT(
        privatekey.client_email,
        null,
        privatekey.private_key,
        ['https://www.googleapis.com/auth/youtube.readonly']);
} else {enabled=false;}
    
    
        function getkey()
    {
    //authenticate request
    if (enabled){
    return new Promise ((resolve, reject) =>
    {
        if(!google_token)
        {
                jwtClient.authorize((err, tokens) => {
                if (err) {
                    console.log(err);
            } else {
                console.log("[Google] API Successfully connected!");
                google_token=tokens.access_token;
                last_update = Date.now();
                }
            })
        }else{
                if (Date.now() - last_update > 360000)
                {
                    jwtClient.getAccessToken((err, tokens) => {
                    if (err) {console.error(err);}
                    else{
                    google_token=tokens.access_token;
                    console.log("[Google] API Key refreshed!");
                    }
                    });}
                
            }
            resolve(google_token);
    })}
    else {
        console.log("[BOT] Google API not enabled");
        return null;
    }
    }
    




module.exports.enabled = enabled;
module.exports.getkey = getkey;
