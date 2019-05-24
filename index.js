const Discord = require('discord.js')
const client = new Discord.Client()
client.on('ready', () => {
  //console.log(`Logged in as ${client.user.tag}!`);
 client.user.setActivity("Google API", {
  type: "LISTENING",
});
//client.user.setStatus('dnd') 
})
client.on('message', msg => {
  if (msg.content === '.ping') {
	  var date = new Date();
	  console.log(`Command .ping triggered by ${msg.author.username}#${msg.author.discriminator} (#${msg.channel.name} on ${msg.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
      msg.channel.send('Pong!');
  }
  }
)

client.login('NDc2NDQxMjQ5NzM4NjUzNzA2.D0b9VQ.xCuQh85vjFI67rS2Az-B3PUXIzg')
///
var token2=" ";
//
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var check=-1;
var dd=" ";
var d=-1;
var h2=" "
var p=-1;
var t=-1;
var a=-1;
var tw=-1;

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/google-apis-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly']
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'google-apis-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  //See full code sample for authorize() function code.
authorize(JSON.parse(content));

});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
 var g_secret =" ";
 var g_id=" ";
 var g_reftoken=" ";
function authorize(credentials, requestData, callback) {
  var clientSecret = credentials.installed.client_secret;
  g_secret=clientSecret;
  var clientId = credentials.installed.client_id;
  g_id=clientId;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, requestData, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, requestData);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, requestData, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      //storeToken(token);
	 // token2 = JSON.stringify(token.access_token);
	//  g_reftoken = JSON.stringify(token.refresh_token);
	  token2= token.access_token;
	  g_reftoken= token.refresh_token;
	  //console.log("tt ",tt);
	  setTimeout(load,15000);
      //callback(oauth2Client, requestData);
    });
  });
}
/**
 * Remove parameters that do not have values.
 *
 * @param {Object} params A list of key-value pairs representing request
 *                        parameters and their values.
 * @return {Object} The params object minus parameters with no values set.
 */
function removeEmptyParameters(params) {
  for (var p in params) {
    if (!params[p] || params[p] == 'undefined') {
      delete params[p];
    }
  }
  return params;
}

/**
 * Create a JSON object, representing an API resource, from a list of
 * properties and their values.
 *
 * @param {Object} properties A list of key-value pairs representing resource
 *                            properties and their values.
 * @return {Object} A JSON object. The function nests properties based on
 *                  periods (.) in property names.
 */
function createResource(properties) {
  var resource = {};
  var normalizedProps = properties;
  for (var p in properties) {
    var value = properties[p];
    if (p && p.substr(-2, 2) == '[]') {
      var adjustedName = p.replace('[]', '');
      if (value) {
        normalizedProps[adjustedName] = value.split(',');
      }
      delete normalizedProps[p];
    }
  }
  for (var p in normalizedProps) {
    // Leave properties that don't have values out of inserted resource.
    if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
      var propArray = p.split('.');
      var ref = resource;
      for (var pa = 0; pa < propArray.length; pa++) {
        var key = propArray[pa];
        if (pa == propArray.length - 1) {
          ref[key] = normalizedProps[p];
        } else {
          ref = ref[key] = ref[key] || {};
        }
      }
    };
  }
  return resource;
  console.log(resource);
}





///

const request = require('request');
//const token = 'Bearer ya29.GlyxBi08Q26iSu5IqzKdzmfsm539c6BY79GZwpTVvhxZ_rV6EaL_1iNdZOHmD6kwOCZyi-z9_EwsEGpyPhNsarz2bvOOIqrZzOruVQWmyPbG9Pb-Su0R76L0SbQBYw';

var ss="";
var options_p = {
  url: '',
};
var options_t = {
  url: '',
};
var options_a = {
  url: '',
};


function callback_p(error, responsep, bodyp) {
  if (!error && responsep.statusCode == 200) {
	const infop = JSON.parse(bodyp);
	// const subs = JSON.parse(stat);
	var psub= infop.items[0].statistics.subscriberCount
    p=parseInt(psub, 10);}
  else {/*console.error("Error:",responsep.statuscode)*/; }
	//console.error('Google API:',responsep.statusCode)
	
	request(options_t, callback_t);
}

function callback_a(error3, responsea, bodya) {
  if (!error3 && responsea.statusCode == 200) {
	const infoa = JSON.parse(bodya);
	// const subs = JSON.parse(stat);
	var asub= infoa.items[0].statistics.subscriberCount
    a=parseInt(asub, 10);}
  else {/*console.error("Error:",responsep.statuscode)*/; }
	//console.error('Google API:',responsep.statusCode)
	
}

function callback_t(error2, responset, bodyt) {
	//console.error("ER ",options_p)
  if (!error2 && responset.statusCode == 200) {
  const infot = JSON.parse(bodyt);
  // const subs = JSON.parse(stat);
  var tsub= infot.items[0].statistics.subscriberCount
   t=parseInt(tsub, 10);
	request(options_a, callback_a);    
       // console.log('T-Series:',responset.statuscode,'abonati');
		
  }
else {/*console.error("Error:",responset.statuscode);*/}
	setTimeout(lol, 1000);
}
function callback_r(error3, responser, bodyr) { token2=bodyr.access_token; console.log("Renew",bodyr);}
var pvt='lol';
var pvt2='lol';
var options_r = {
	url: 'https://www.googleapis.com/oauth2/v4/token',
	method: 'POST',
	headers: 'Content-Type: application/x-www-form-urlencoded',
	body: {'client_id': `${g_id}`,
	'client_secret':`${g_secret}`,
	'refresh_token':'1/bA-Jd5ioYH7uefR26K9rhlIqiKeZa_g1CqIQn4trY4E',
	'&grant_type':'refresh_token',}
	};
	
load();
function load(){
	console.error("Token: ",token2);
	console.error("Refresh Token: ",g_reftoken);
	dd=token2.substr(0,129);
	//var uri="https://www.googleapis.com/youtube/v3/channels?part=statistics&access_token="+`${dd}`+"&id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&fields=items/statistics/subscriberCount"
	var uri="https://www.googleapis.com/youtube/v3/channels?id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&part=statistics&fields=items/statistics/subscriberCount&access_token="+`${dd}`;
	var uri2="https://www.googleapis.com/youtube/v3/channels?id=UCq-Fj5jknLsUf-MWSy4_brA&part=statistics&fields=items/statistics/subscriberCount&access_token="+`${dd}`;
	var uri3="https://www.googleapis.com/youtube/v3/channels?id=UC73wv11MF_jm6v7iz3kuO8Q&part=statistics&fields=items/statistics/subscriberCount&access_token="+`${dd}`;
	
	//var refresh_body='client_id:'+`${g_id}`+'&client_secret:'+`${g_secret}`+'&refresh_token:'+`${g_reftoken}`+'&grant_type:refresh_token'
	console.error("T2: ",uri);
	tmp=`"Authorization": "Bearer ${dd}"`;
options_p.url=uri;
options_t.url=uri2;
options_a.url=uri3;
/*if (g_reftoken.length>3){ options_r.body=refresh_body;*/ //request(options_r, callback_r);/*}*/

//ss='Bearer ya29.GluyBjA5l4oOgaWWUSJ_FIHO9UYQDM9lPfa6uAmEqQVeCvDIRtuG05ydgGV6-B1dmcuQUuYr6mW7ErJAUaiCgKzfrpdzZBlIoVxUC7QTVbtzQjk0_yW-Z2OxBgJx'
request(options_p, callback_p);
}
var date = new Date()
var alm="";
function lol(){
	//console.log
d=p-t;
if (d<0) {d=t-p;tw=1;}
else tw=0;

pvt='PewDiePie e in fata T-Series cu '+d+' abonati';
if (tw==1) pvt='T-Series e in fata PewDiePie cu '+d+' abonati'
if (d == -1) {console.log('!!!'); pvt="Data not avaliable!"}
pew="PewDiePie: "+(p/1000000).toFixed(3)+'M';
tsr="T-Series: "+(t/1000000).toFixed(3)+'M';
if (d>1000000 || d<-1000000) d=(d/1000000).toFixed(3)+'M';
if (tw==0)pvt2='Win: P+'+d;
else pvt2="Win: T+"+d;
//
alm="Subscribers: "+`${a}`;

setTimeout(repeat, 30000);}

client.on('message', msg => {
  if (msg.content === '.pvt') {
	  //console.log(`Command .pvt triggered by ${msg.author.username}#${msg.author.discriminator} (#${msg.channel.name} on ${msg.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
	  console.log(`Bot triggered with "${msg.content}" by ${msg.author.username}#${msg.author.discriminator} (#${msg.channel.name} on ${msg.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
      request(options_p, callback_p);
	//  channel.setName('not_general')
	  msg.channel.send(pvt);
  }}
  )
function repeat(){
//console.log('Diferenta:', d);
///lient.channels.find("id","545918988409110548").setName(pvt2);
///client.channels.find("id","545918846754619392").setName(pew);
//Romail.ml
client.channels.find(channel => channel.id === "545918988409110548").setName(pvt2);
client.channels.find(channel => channel.id === "545918846754619392").setName(pew);
client.channels.find(channel => channel.id === "545918234822574111").setName(tsr);

//AlmostIce
client.channels.find(channel => channel.id === "581018000019292162").setName(alm);

//Yuppy Puppy
/*client.channels.find(channel => channel.id === "545918988409110548").setName(pvt2);
client.channels.find(channel => channel.id === "545918846754619392").setName(pew);
client.channels.find(channel => channel.id === "545918234822574111").setName(tsr);*/

  request(options_p, callback_p);
 // request(update_d, callback_d);
}