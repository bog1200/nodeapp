const Discord = require('discord.js')
require('dotenv').config();
const client = new Discord.Client();
var start_time = Date.now();
var start_time_gmt = new Date(start_time);
var stream_link=process.env.DISCORD_STREAM_LINK;
var status_type="PLAYING";
var stream_status=process.env.DISCORD_STATUS;
client.on('ready', () => {
  //console.log(`Logged in as ${client.user.tag}!`);
 client.user.setActivity(process.env.DISCORD_STATUS);
console.log("[Discord] API Successfully connected!")
//client.user.setStatus('dnd') 
})
client.login(process.env.DISCORD_KEY)
///
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
 function refreshKey(){

 jwtClient.refreshAccessToken((err, tokens) => {
 if (err) {console.error(err);}
 else{
google_token=tokens.access_token;
console.log("[Google] API Key refreshed!");
}
});
}

var axios = require('axios');
var id_pew="UC-lHJZR3Gqxm24_Vd_AJ5Yw"
var id_tsr="UCq-Fj5jknLsUf-MWSy4_brA"
var id_alm="UC73wv11MF_jm6v7iz3kuO8Q"
var discord
var pvt='lol';
var pvt2='lol';
var cov_nr=-1;
var cov_str="lol"
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
  axios.get(setUrl(id_alm,0)),
  axios.get('https://covid19.geo-spatial.org/api/dashboard/getCasesByCounty')
]).then(axios.spread((response1, response2, response3, response4) => {
  pew_subs=response1.data.items[0].statistics.subscriberCount;
  tsr_subs=response2.data.items[0].statistics.subscriberCount;
  alm_subs=response3.data.items[0].statistics.subscriberCount;
  cov_nr=response4.data.data.total;
})).catch(error => {
  refreshKey();
  console.log(error);
});

setTimeout(lol,5000);
}

function lol(){
	alm_msg="Abonati: "+`${alm_subs}`;
	console.log("Pew: "+`${pew_subs}`);
	console.log("Alm: "+`${alm_subs}`);
	console.log("Tsr: "+`${tsr_subs}`);
	console.log("Czr: "+`${cov_nr}`);
cov_str="Cazuri: "+cov_nr;
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
	
	Embed.setTitle('Youtube Subscriber Count');
	var ch_id='undefined';
	var ch_name='undefined';
	var subs=-1;
	var sub="undefined";
	
	axios.get(setUrl(msg.content.substr(3,50),1))
	.then(function (response){
		ch_id=response.data.items[0].id.channelId;
		ch_name=response.data.items[0].snippet.title;
		console.log("Ch_ID: "+`${ch_id}`);
		console.log("Ch_name: "+`${ch_name}`);
		
		return axios.get(setUrl(response.data.items[0].id.channelId,0))
		})
	.then(function (response){
			subs=response.data.items[0].statistics.subscriberCount;
			if (subs>=100000 && subs <=999999) sub=(sub/100000) +" K"
			else if (subs>1000000) sub=(subs/1000000)+" M";
			else sub=subs;
			console.log("Subs:" +`${sub}`);
			Embed.setColor('#123456');
			Embed.addField("Channel Name",`${ch_name}`);
			Embed.addField("Channel ID",`${ch_id}`);
			Embed.addField("Subscribers",`${sub}`);
	})
	.catch(function (error){
		refreshKey();
		console.error(error);
		Ember.setColor("#ff0000")
		Embed.setDescription("Bot cannot contact servers! Please try again later");
	});

	}
	else  if (msg.content === '.status') {
		ct=true;
	console.log("Start_time_gmt: "+`${start_time_gmt}`)
	console.log("Start_time: "+`${start_time}`)

	var alive=((Date.now()-start_time)/1000).toFixed(0);
	Embed.setColor('#ffff00')
	Embed.setTitle('Status')
	Embed.addField("Start time",`${start_time_gmt}`);
	alive_string=" "
	
	if (alive <=60) 
	(alive_string=`${(alive)} s`)
	else if (alive > 60 && alive < 3600)
	(alive_string=`${parseInt(alive/60)} min, ${parseInt(alive%60)} s`)
	else if (alive > 3600 && alive < 86400)
	(alive_string=`${parseInt(alive/3600)} h, ${parseInt((alive/60)%60)} min, ${parseInt((alive/3600)%60)} s`)
	else (alive_string=`${parseInt(alive/86400)} d, ${parseInt((alive/3600)%24)} h, ${parseInt((alive/60)%60)} min, ${parseInt((alive/3600)%60)} s`)
	Embed.addField("Uptime",`${(alive_string)}`);

	}
	/*else  if (msg.content === '.time') {
		ct=true;
	Embed.setColor('#0099ff')
	.setTitle('Time')
	.setDescription(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} GMT+2`);
	}*/
	else if (msg.content === '.ping'){
      msg.channel.send('Pong!');
	  }
	else if (msg.content.substr(0,6) === '.clear'){
      ct=true;
	 let messagecount = parseInt(msg.content.substr(7,8));
	if (msg.member.hasPermission("MANAGE_MESSAGES"))
		{
		msg.channel.fetchMessages({ limit: messagecount }).then(messages => msg.channel.bulkDelete(messages));
		}
	Embed.setTitle("Delete Messages").setDescription(messagecount+" messages deleted").setColor("#0f3c6c");
	  }
	else  if (msg.content === '.update') {
		ct=true;
	Embed.setColor('#8cef69')
	.setTitle('Update')
	.setDescription("Subs updated successfully");
	update();
	}
	else if (msg.content.substr(0,6) === '.quote') {
	Embed.setColor('#ff00ff')
	.setTitle('Quote')
	.setDescription(msg.content.substr(6,56));
	}
	else if (msg.content.substr(0,13) ==='.bstatus text')
	{
		ct=true;
		stream_status=msg.content.substr(13,30);
		Embed.setColor("#ff1493")
		.setTitle("Bot Status")
		.setDescription("Bot status has been set: "+`${msg.content.substr(13,30)}`);

	}
	else if (msg.content.substr(0,15) ==='.bstatus update')
	{
		ct=true;
		Embed.setColor("#ff1493")
		.setTitle("Bot Status")
		.setDescription("Bot status has been updated")
		.addField("Status",`${stream_status}`)
		.addField("Type",`${status_type}`)
		.addField("Link", `${stream_link}`);
		client.user.setPresence({ game: { name: `${stream_status}`, type: `${status_type}`, url: `${stream_link}`}}); 
	}
	else if (msg.content.substr(0,13) ==='.bstatus link')
	{
		ct=true;
		stream_link=msg.content.substr(14,30);
		Embed.setColor("#ff1493")
		.setTitle("Bot Status")
		.setDescription("Bot stream link has been set: "+`${msg.content.substr(14,30)}`);
	}
	else if (msg.content.substr(0,13) ==='.bstatus type')
	{
		ct=true;
		status_type=msg.content.substr(14,30);
		Embed.setColor("#ff1493")
		.setTitle("Bot Status")
		.setDescription("Bot status type has been set: "+`${msg.content.substr(14,30)}`);
	}


	

	else if (msg.content === '.help') {
		ct=true;
	Embed.setColor('#0adcff')
	.setTitle('Help')
	.addField(".status","Shows bot online time")
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
	setTimeout(function () {
		msg.channel.send(Embed);
		msg.delete(1);
        }, 1000);
	}
  })
function UpdateStatus(){

//Romail.ml
client.channels.find(channel => channel.id === "545918988409110548").setName(pvt2);
client.channels.find(channel => channel.id === "545918846754619392").setName(pew);
client.channels.find(channel => channel.id === "545918234822574111").setName(tsr);
client.channels.find(channel => channel.id === "702248585991028776").setName(cov_str);

///AlmostIce
client.channels.find(channel => channel.id === "700813443111977021").setName(alm_msg);
//client.channels.find(channel => channel.id === "693109405696262164").setName(dro);

  setTimeout(update, 300000);

}
