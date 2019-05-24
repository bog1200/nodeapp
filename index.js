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
	  console.log(`Bot triggered with "${msg.content}" by ${msg.author.username}#${msg.author.discriminator} (#${msg.channel.name} on ${msg.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
      msg.channel.send('Pong!');
  }
  }
)

client.login('NDc2NDQxMjQ5NzM4NjUzNzA2.D0b9VQ.xCuQh85vjFI67rS2Az-B3PUXIzg')
///
const http = require('http')
const port=process.env.PORT || 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
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

var check=-1;
var dd=" ";
var d=-1;
var h2=" "
var min=0;
var p=-1;
var t=-1;
var a=-1;
var tw=-1;
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
	dd=tokens.access_token;
   console.log("[Google API] Successfully connected!");
 }
});




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

  
	request(options_a, callback_a); 
function callback_r(error3, responser, bodyr) { token2=bodyr.access_token; console.log("Renew",bodyr);}
var pvt='lol';
var pvt2='lol';

	
setTimeout(load,5000);
 function load(){
	//dd=token2.substr(0,129);
	//var uri="https://www.googleapis.com/youtube/v3/channels?part=statistics&access_token="+`${dd}`+"&id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&fields=items/statistics/subscriberCount"
	var uri="https://www.googleapis.com/youtube/v3/channels?id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&part=statistics&fields=items/statistics/subscriberCount&access_token="+`${dd}`;
	var uri2="https://www.googleapis.com/youtube/v3/channels?id=UCq-Fj5jknLsUf-MWSy4_brA&part=statistics&fields=items/statistics/subscriberCount&access_token="+`${dd}`;
	var uri3="https://www.googleapis.com/youtube/v3/channels?id=UC73wv11MF_jm6v7iz3kuO8Q&part=statistics&fields=items/statistics/subscriberCount&access_token="+`${dd}`;
	
	//var refresh_body='client_id:'+`${g_id}`+'&client_secret:'+`${g_secret}`+'&refresh_token:'+`${g_reftoken}`+'&grant_type:refresh_token'
	//console.error("T2: ",uri);
	tmp=`"Authorization": "Bearer ${dd}"`;
options_p.url=uri;
options_t.url=uri2;
options_a.url=uri3;
/*if (g_reftoken.length>3){ options_r.body=refresh_body;*/ //request(options_r, callback_r);/*}*/

//ss='Bearer ya29.GluyBjA5l4oOgaWWUSJ_FIHO9UYQDM9lPfa6uAmEqQVeCvDIRtuG05ydgGV6-B1dmcuQUuYr6mW7ErJAUaiCgKzfrpdzZBlIoVxUC7QTVbtzQjk0_yW-Z2OxBgJx'
request(options_p, callback_p);
}
var date = new Date()
var started = Date.now();
var alm="";
function lol(){
	//console.log
d=p-t;
if (d<0) {d=t-p;tw=1;}
else tw=0;
if (d>1000000 || d<-1000000) d=(d/1000000).toFixed(3)+'M';
pvt='PewDiePie e in fata T-Series cu '+d+' abonati';
if (tw==1) pvt='T-Series e in fata PewDiePie cu '+d+' abonati'
if (d == -1) {console.log('!!!'); pvt="Data not avaliable!"}
pew="PewDiePie: "+(p/1000000).toFixed(3)+'M';
tsr="T-Series: "+(t/1000000).toFixed(3)+'M';
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
	  const Embed = new Discord.RichEmbed()
	.setColor('#800080')
	.setTitle('PewDiePie vs T-Series')
	.setDescription(pvt)
	.setTimestamp()
	.setFooter(`Message requested by ${msg.author.username}#${msg.author.discriminator}` );
	//  channel.setName('not_general')
	  msg.channel.send(Embed);
  }}
  )
 client.on('message', msg => {
  if (msg.content === '.uptime') {
	  //console.log(`Command .pvt triggered by ${msg.author.username}#${msg.author.discriminator} (#${msg.channel.name} on ${msg.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
	  console.log(`Bot triggered with "${msg.content}" by ${msg.author.username}#${msg.author.discriminator} (#${msg.channel.name} on ${msg.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
	var alive=((Date.now()-started)/1000).toFixed(0);
	  const Embed = new Discord.RichEmbed()
	.setColor('#ffff00')
	.setTitle('Uptime')
	.setDescription(`Bot is up for ${alive} s`)
	.setTimestamp()
	.setFooter(`Message requested by ${msg.author.username}#${msg.author.discriminator}` );
	//  channel.setName('not_general')
	  msg.channel.send(Embed);
	  msg.delete(1);
  }}
  )

  client.on('message', msg => {
  if (msg.content === '.time') {
	  //console.log(`Command .pvt triggered by ${msg.author.username}#${msg.author.discriminator} (#${msg.channel.name} on ${msg.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
	  console.log(`Bot triggered with "${msg.content}" by ${msg.author.username}#${msg.author.discriminator} (#${msg.channel.name} on ${msg.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
	const Embed = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('Time')
	.setDescription(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} GMT`)
	.setTimestamp()
	.setFooter(`Message requested by ${msg.author.username}#${msg.author.discriminator}` );
	  msg.channel.send(Embed);
	  msg.delete(1);
  }}
  )
 client.on('message', msg => {
  if (msg.content.substr(0,5) === '.subs') {
	  console.log(`Bot triggered with "${msg.content}" by ${msg.author.username}#${msg.author.discriminator} (#${msg.channel.name} on ${msg.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
	 // if (msg.content.substr(6,31).length()!=24){https://www.googleapis.com/youtube/v3/channels?&forUsername=`${msg.content.substr(6,31)}`&part=id&access_token="+`${dd}`
	  options_s.url="https://www.googleapis.com/youtube/v3/channels?id="+`${msg.content.substr(6,31)}`+"&part=statistics&fields=items/statistics/subscriberCount&access_token="+`${dd}`;

	console.error("T3: ",options_s);
	
	var aPromise = new Promise(function(resolve, reject) {
		request(options_s, callback_s);
		if (sa!=-1){
	resolve(`${sa}`)}
	});
aPromise
.then{ 
	const Embed = new Discord.RichEmbed()
	.setColor('#000fff')
	.setTitle('Subscriber Count')
  .addField("Channel ID: ",`${msg.content.substr(6,31)}`)
  .addField("Subscribers: ",`${sa}`)
	.setTimestamp()
	.setFooter(`Message requested by ${msg.author.username}#${msg.author.discriminator}` );
	  msg.channel.send(Embed);
	  console.log("C1",sa);
msg.delete(1);}
.catch{
	
}
  }}
  )  
  //dd=token2.substr(0,129);
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