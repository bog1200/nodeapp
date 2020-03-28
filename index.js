const Discord = require('discord.js')
require('dotenv').config();
const client = new Discord.Client();
var date = new Date();
var start_time = Date.now();
client.on('ready', () => {
  //console.log(`Logged in as ${client.user.tag}!`);
 //client.user.setActivity("Now with 30% more bananas");
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
   console.log("[Google] Token: "+`${google_token}`);
   console.log("[Google] API Successfully connected!");
 }
});
var axios = require('axios');
var id_pew="UC-lHJZR3Gqxm24_Vd_AJ5Yw"
var id_tsr="UCq-Fj5jknLsUf-MWSy4_brA"
var id_alm="UC73wv11MF_jm6v7iz3kuO8Q"
var pvt='lol';
var pvt2='lol';
var alm_msg;
var type=-1;

setTimeout(update,5000);
function setUrl(channel_id,type)
{
if (type==0)return "https://www.googleapis.com/youtube/v3/channels?id="+`${channel_id}`+"&part=statistics&fields=items/statistics/subscriberCount&access_token="+`${google_token}`;
else return  "https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q="+`${channel_id}`+"&access_token="+`${google_token}`;
}
 function update(){

axios.all([
  axios.get(setUrl(id_pew,0)),
  axios.get(setUrl(id_tsr,0)),
  axios.get(setUrl(id_alm,0))
]).then(axios.spread((response1, response2, response3) => {
  pew_subs=response1.data.items[0].statistics.subscriberCount;
  tsr_subs=response2.data.items[0].statistics.subscriberCount;
  alm_subs=response3.data.items[0].statistics.subscriberCount;
})).catch(error => {
	if (response1.status == 401) jwtClient.authorize();
  console.log(error);
});

setTimeout(lol,5000);
}

function lol(){
alm_msg="Subscribers: "+`${alm_subs}`;
//	console.log("Pew: "+`${pew_subs}`);
//	console.log("Tsr: "+`${tsr_subs}`);
diff=pew_subs-tsr_subs;
if (diff<0) {diff=tsr_subs-pew_subs;winn=1;}
else winn=0;
if (diff>1000000 || diff<-1000000) diff=(diff/1000000)+'M';
pvt='PewDiePie e in fata T-Series cu '+diff+' abonati';
if (winn==1) pvt='T-Series e in fata PewDiePie cu '+diff+' abonati'
if (diff == -2) {console.log('!!!'); pvt="Data not avaliable!"}
pew="PewDiePie: "+(pew_subs/1000000)+'M';
tsr="T-Series: "+(tsr_subs/1000000)+'M';
if (winn==0)pvt2='Win: P+'+diff;
else pvt2="Win: T+"+diff;
//

setTimeout(UpdateStatus, 3000);
}

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
	else if (msg.content.substr(0,3) === '.yt') {
		ct=true;
	Embed.setColor('#123456');
	Embed.setTitle('Youtube Subscriber Count');
	var ch_id=' ';
	var subs=-1;
	Embed.addField("Channel Name",`${msg.content.substr(3,50)}`);
	axios.get(setUrl(msg.content.substr(3,50),1))
	.then(function (response){
		ch_id=response.data.items[0].id.channelId;
		axios.get(setUrl(ch_id=response.data.items[0].id.channelId,0))
		.then(function (response2){
			subs=response2.data.items[0].statistics.subscriberCount;
		});
	});
	Embed.addField("Channel ID",`${ch_id}`);
	Embed.addField("Subscribers",`${subs}`);
	}
	else  if (msg.content === '.uptime') {
		ct=true;
	var alive=((Date.now()-start_time)/1000).toFixed(0);
	Embed.setColor('#ffff00')
	Embed.setTitle('Uptime')
	if (alive <=60) 
	(Embed.setDescription(`Bot is up for ${(alive)} s`))
	else if (alive > 60 && alive < 3600)
	(Embed.setDescription(`Bot is up for ${parseInt(alive/60)} min, ${parseInt(alive%60)} s`))
	else if (alive > 3600 && alive < 86400)
	(Embed.setDescription(`Bot is up for ${parseInt(alive/3600)} h, ${parseInt((alive/60)%60)} min, ${parseInt((alive/3600)%60)} s`))
	else (Embed.setDescription(`Bot is up for ${parseInt(alive/86400)} d, ${parseInt(alive/3600)} h, ${parseInt((alive/60)%60)} min, ${parseInt((alive/3600)%60)} s`))

	}
	else  if (msg.content === '.time') {
		ct=true;
	Embed.setColor('#0099ff')
	.setTitle('Time')
	.setDescription(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} GMT+2`);
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
function UpdateStatus(){

//Romail.ml
client.channels.find(channel => channel.id === "545918988409110548").setName(pvt2);
client.channels.find(channel => channel.id === "545918846754619392").setName(pew);
client.channels.find(channel => channel.id === "545918234822574111").setName(tsr);

//AlmostIce
client.channels.find(channel => channel.id === "581018000019292162").setName(alm_msg);
//client.channels.find(channel => channel.id === "693109405696262164").setName(dro);

  setTimeout(update, 600000);

}
