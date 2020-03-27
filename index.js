const Discord = require('discord.js')
require('dotenv').config();
const client = new Discord.Client();
var date = new Date();
client.on('ready', () => {
  //console.log(`Logged in as ${client.user.tag}!`);
 client.user.setActivity("Google API", {
  type: "LISTENING",
});
console.log("[Discord] API Successfully connected!")
//client.user.setStatus('dnd') 
})
client.on('message', msg => {
  if (msg.content === '.ping') {
	  console.log(`Bot triggered with "${msg.content}" by ${msg.author.username}#${msg.author.discriminator} (#${msg.channel.name} on ${msg.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
      msg.channel.send('Pong!');
  }
  }
)

client.login(process.env.DISCORD_KEY)
///
const http = require('http')
const port=process.env.PORT || 3000

const requestHandler = (request, response) => {
  console.log(request.url)
if (request.url == "/"){ response.writeHead(302, { Location: '/api/' }); response.end();}; 
if (request.url == "/api/"){response.end('Bot is online!')}
if (request.url == "/api/time"){response.end(`${Date.now()}`);}
if (request.url.substr(0,7) == "/redir/"){response.writeHead(302, { Location: "https://romail.ml/redir/"+`${request.url.substr(7,100)}`}); response.end();}
else {response.writeHead(404); response.end();}; 
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`[HTTP] server is listening on ${port}`)
})
var token2=" ";
//
var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var googleAuth = require('google-auth-library');
let privatekey = require("./privatekey.json");
///
///

var google_token=" ";
var diff=-1;
var pew_subs=-1;
var tsr_subs=-1;
var alm_subs=-1;
var winn=-1;
var sa=-1;

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/google-apis-nodejs-quickstart.json

let jwtClient = new google.auth.JWT(
       privatekey.client_email,
       null,
       privatekey.private_key,
       ['https://www.googleapis.com/auth/youtube.readonly']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
 if (err) {
   console.log(err);
   return;
 } else {
	google_token=tokens.access_token;
   console.log("[Google] API Successfully connected!");
 }
});




///

const request = require('request');
//const token = 'Bearer ya29.GlyxBi08Q26iSu5IqzKdzmfsm539c6BY79GZwpTVvhxZ_rV6EaL_1iNdZOHmD6kwOCZyi-z9_EwsEGpyPhNsarz2bvOOIqrZzOruVQWmyPbG9Pb-Su0R76L0SbQBYw';

var options_p = {
  url: '',
};
var options_t = {
  url: '',
};
var options_a = {
  url: '',
};
var options_i = {
  url: '',
};


function callback_p(error, responsep, bodyp) {
  if (!error && responsep.statusCode == 200) {
	const infop = JSON.parse(bodyp);
	// const subs = JSON.parse(stat);
	var psub= infop.items[0].statistics.subscriberCount
    pew_subs=parseInt(psub, 10);}
  else {/*console.error("Error:",responsep.statuscode)*/; }
	//console.error('Google API:',responsep.statusCode)
	
	request(options_t, callback_t);
}

function callback_a(error3, responsea, bodya) {
  if (!error3 && responsea.statusCode == 200) {
	const infoa = JSON.parse(bodya);
	// const subs = JSON.parse(stat);
	var asub= infoa.items[0].statistics.subscriberCount
    alm_subs=parseInt(asub, 10);}
  else {/*console.error("Error:",responsep.statuscode)*/; }
	//console.error('Google API:',responsep.statusCode)
	
}

function callback_t(error2, responset, bodyt) {
	//console.error("ER ",options_p)
  if (!error2 && responset.statusCode == 200) {
  const infot = JSON.parse(bodyt);
  // const subs = JSON.parse(stat);
  var tsub= infot.items[0].statistics.subscriberCount
   tsr_subs=parseInt(tsub, 10);
	request(options_a, callback_a);    
       // console.log('T-Series:',responset.statuscode,'abonati');
		
  }
else {/*console.error("Error:",responset.statuscode);*/}
	setTimeout(lol, 1000);
}
var url_t="";
var options_s = {
	url: '',};
function callback_s(error4, responses, bodys) {
	//console.error("ER ",options_p)
  if (!error4 && responses.statusCode == 200) {
  const infos = JSON.parse(bodys);
  // const subs = JSON.parse(stat);
  var ssub= infos.items[0].statistics.subscriberCount
sa=parseInt(ssub, 10); console.log("C1:",sa)}
else {console.error("Error:",responses.statuscode);}}

function callback_i(error4, responses, bodys) {
	//console.error("ER ",options_p)
  if (!error4 && responses.statusCode == 200) {
  const infos = JSON.parse(bodys);
  // const subs = JSON.parse(stat);
  var iid= infos.items[0].id;
  return iid;
  } else {console.error("Error:",responses.statuscode);}}


  
	request(options_a, callback_a); 
function callback_r(error3, responser, bodyr) { token2=bodyr.access_token; console.log("Renew",bodyr);}
var pvt='lol';
var pvt2='lol';

var id_url1="UC-lHJZR3Gqxm24_Vd_AJ5Yw"
var id_url2="UCq-Fj5jknLsUf-MWSy4_brA"
var id_url3="UC73wv11MF_jm6v7iz3kuO8Q"
	
setTimeout(load,5000);

function setUrl(channel_id)
{
return "https://www.googleapis.com/youtube/v3/channels?id="+`${channel_id}`+"&part=statistics&fields=items/statistics/subscriberCount&access_token="+`${google_token}`;
}
 function load(){
	//google_token=token2.substr(0,129);
	//var uri="https://www.googleapis.com/youtube/v3/channels?part=statistics&access_token="+`${google_token}`+"&id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&fields=items/statistics/subscriberCount"
	var uri=setUrl(id_url1);
	var uri2=setUrl(id_url2);
	var uri3=setUrl(id_url3);

	
	//var refresh_body='client_id:'+`${g_id}`+'&client_secret:'+`${g_secret}`+'&refresh_token:'+`${g_reftoken}`+'&grant_type:refresh_token'
	//console.error("T2: ",uri);
	tmp=`"Authorization": "Bearer ${google_token}"`;
options_p.url=uri;
options_t.url=uri2;
options_a.url=uri3;

request(options_p, callback_p);
}

var started = Date.now();

function lol(){
	//console.log
diff=pew_subs-tsr_subs;
if (diff<0) {diff=tsr_subs-pew_subs;winn=1;}
else winn=0;
if (diff>1000000 || diff<-1000000) diff=(diff/1000000)+'M';
pvt='PewDiePie e in fata T-Series cu '+diff+' abonati';
if (winn==1) pvt='T-Series e in fata PewDiePie cu '+diff+' abonati'
if (diff == -1) {console.log('!!!'); pvt="Data not avaliable!"}
pew="PewDiePie: "+(pew_subs/1000000)+'M';
tsr="T-Series: "+(tsr_subs/1000000)+'M';
if (winn==0)pvt2='Win: P+'+diff;
else pvt2="Win: T+"+diff;
//
var alm="Subscribers: "+`${alm_subs}`;

setTimeout(repeat, 600000);}

client.on('message', msg => {
	var ct=false;
	var date = new Date();
	  const Embed = new Discord.RichEmbed()
	  .setTimestamp()
	.setFooter(`${msg.author.username}#${msg.author.discriminator}` );
	if (msg.content === '.pvt') {
		ct=true;
	Embed.setColor('#800080');
	Embed.setTitle('PewDiePie vs T-Series');
	Embed.setDescription(pvt);
	}
	else  if (msg.content === '.uptime') {
		ct=true;
	var alive=((Date.now()-started)/1000).toFixed(0);
	Embed.setColor('#ffff00')
	Embed.setTitle('Uptime')
	if (alive <=60) 
	(Embed.setDescription(`Bot is up for ${(alive)} s`))
	if (alive > 60 && alive < 3600)
	(Embed.setDescription(`Bot is up for ${parseInt(alive/60)} min, ${parseInt(alive%60)} s`))
	if (alive > 3600 && alive < 86400)
	(Embed.setDescription(`Bot is up for ${parseInt(alive/3600)} h, ${parseInt((alive/60)%60)} min, ${parseInt((alive/3600)%60)} s`))
	}
	else  if (msg.content === '.time') {
		ct=true;
	Embed.setColor('#0099ff')
	.setTitle('Time')
	.setDescription(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} GMT`);
	}
	else if (msg.content.substr(0,6) === '.quote') {
	Embed.setColor('#ff00ff')
	.setTitle('Quote')
	.setDescription(msg.content.substr(6,56));
	}
	else if (msg.content === '.help') {
		ct=true;
	Embed.setColor('#0adcff')
	.setTitle('Help')
	.addField(".time","Shows current time")
	.addField(".uptime","Shows bot online time")
	.addField(".pvt","PewDiePie vs T-Series Subscribers difference");
	}
	else  if ((msg.content).substr(0,10) === 'romail.ml/') {
		ct=true;
	Embed.setColor('#000000')
	.setTitle('Romail.ml')
	.setDescription("Visit "+`${msg.content.substr(10,100)}`+" on romail.ml")
	.addField("Link:","https://romail.ml/"+`${msg.content.substr(10,100)}`);
	}
	if (ct==true){
	console.log(`Bot triggered with "${msg.content}" by ${msg.author.username}#${msg.author.discriminator} (#${msg.channel.name} on ${msg.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
	msg.channel.send(Embed);
	msg.delete(1);}
  })

  //dd=token2.substr(0,129);
function repeat(){
//console.log('Diferenta:', diff);
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
