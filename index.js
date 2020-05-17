//
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const googleAuth = require('google-auth-library');
const privatekey = require("./privatekey.json");
///
///

const Discord = require('discord.js');
require('dotenv').config();
let prefix = process.env.DISCORD_PREFIX;
const client = new Discord.Client();
console.log(`Prefix: ${prefix}`);

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
let start_time = Date.now();
let start_time_gmt = new Date(start_time);

let stream_link=process.env.DISCORD_STREAM_LINK;
let status_type="PLAYING";
let stream_status=process.env.DISCORD_STATUS;



client.on('ready', () => {
 client.user.setActivity(process.env.DISCORD_STATUS);
console.log("[Discord] API Successfully connected!");
});
 exports.update = ((arg1,arg2='PLAYING',arg3='null',arg4='active') => {console.log(`${arg1},${arg2},${arg3}`);
if (arg3!=='null') {client.user.setPresence({ activity: { name: `${arg1}`,type: `${arg2}`,url:`${arg3}` }, status: `${arg4}` });}
else {client.user.setPresence({ activity: { name: `${arg1}`,type: `${arg2}`}, status: `${arg4}` });}

});

function loginDiscord()
{
const login = new Promise ((resolve,reject) =>
{
	client.login(process.env.DISCORD_KEY).then(res => resolve(res)).catch(error => reject(error));
})
}
///
let google_token;
let diff=-1;
let pew_subs=-1;
let tsr_subs=-1;
let alm_subs=-1;
let winn=-1;
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/google-apis-nodejs-quickstart.json
let jwtClient = new google.auth.JWT(
	privatekey.client_email,
	null,
	privatekey.private_key,
	['https://www.googleapis.com/auth/youtube.readonly']);
function getkey()
{
//authenticate request
const token = new Promise ((resolve,reject) =>
{
	jwtClient.authorize((err, tokens) => {
 	if (err) {
   	console.log(err);
   	reject(err);
 } else {
	resolve(tokens.access_token);
    }
 })})
 return token;
}
 function refreshKey(){

 jwtClient.refreshAccessToken((err, tokens) => {
 if (err) {console.error(err);}
 else{
google_token=tokens.access_token;
console.log("[Google] API Key refreshed!");
}
});
}

function setUrl(channel_id,type)
{
if (type==0)return "https://www.googleapis.com/youtube/v3/channels?id="+`${channel_id}`+"&part=statistics&fields=items/statistics/subscriberCount&access_token="+`${google_token}`;
else return  "https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q="+`${channel_id}`+"&access_token="+`${google_token}`;
}


let axios = require('axios');
let pvt,pvt2,pew,tsr;
let cov_str;
let c_out;
let cov_h_str;
let alm_msg;
function update(){

	axios.all([
	  axios.get(setUrl("UC-lHJZR3Gqxm24_Vd_AJ5Yw",0)),
	  axios.get(setUrl("UCq-Fj5jknLsUf-MWSy4_brA",0)),
	  axios.get(setUrl("UC73wv11MF_jm6v7iz3kuO8Q",0)),
	  axios.get('https://covid19.geo-spatial.org/api/dashboard/getCasesByCounty')
	]).then(axios.spread((response1, response2, response3, response4) => {
	  pew_subs=response1.data.items[0].statistics.subscriberCount;
	  tsr_subs=response2.data.items[0].statistics.subscriberCount;
	  alm_subs=response3.data.items[0].statistics.subscriberCount;
	  c_out=response4.data.data;
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
		console.log("Czr: "+`${c_out.total}`);
	cov_str=`Cazuri: ${c_out.total}`;
	diff=pew_subs-tsr_subs;
	if (diff<0) {diff=tsr_subs-pew_subs;winn=1;}
	else winn=0;
	if (diff>1000000 || diff<-1000000) diff=(diff/1000000)+'M';
	pvt='PewDiePie e in fata T-Series cu '+diff+' abonati';
	if (winn==1) pvt='T-Series e in fata PewDiePie cu '+diff+' abonati'
	if (diff == -2) {console.log('!!!'); pvt="Data not avaliable!"}
	let pew="PewDiePie: "+(pew_subs/1000000)+'M';
	let tsr="T-Series: "+(tsr_subs/1000000)+'M';
	if (winn==0)pvt2='Win: P+'+diff;
	else pvt2="Win: T+"+diff;
	setTimeout(UpdateStatus, 3000);
	//
	}
	async function load()
	{
		google_token= await getkey();
		const D_Log_out = await loginDiscord();
		console.log("[Google] Token: "+`${google_token}`);
		console.log("[Google] API Successfully connected!");
		exports.g_token = google_token;
		update();
	}
	load();

	
	
	
	const queue = new Map();
	client.on('message', async message => {
		const date = new Date;
		const args = message.content.slice(prefix.length).split(/ +/);
		const command = args.shift().toLowerCase();
		if (!client.commands.has(command)) return;

try {
	if (message.content.substr(0,1)!==prefix) {return;};
	if(command==='status'){args[98]=start_time; args[99]=start_time_gmt;};
	if  (message.guild!==null){
		if (command === 'play' || command === 'skip' ||command === 'stop' ) {client.commands.get(command).execute(message, queue, args, google_token);}
		else {client.commands.get(command).execute(message,args,google_token);}
	console.log(`Bot triggered with "${message.content}" by ${message.author.username}#${message.author.discriminator} (${message.channel.name} on ${message.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);}
	else {message.reply('Bot commands are unavailable on DMs'); console.log(`Bot triggered with "${message.content}" by ${message.author.username}#${message.author.discriminator} (DM) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);}
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}
});



function UpdateStatus(){

	//Romail.ml
	client.channels.fetch("545918988409110548").then(channel => channel.setName(pvt2));
	client.channels.fetch("545918846754619392").then(channel => channel.setName(pew));
	client.channels.fetch("545918234822574111").then(channel => channel.setName(tsr));
	client.channels.fetch("702248585991028776").then(channel => channel.setName(cov_str));


	///AlmostIce
	client.channels.fetch("700813443111977021").then(channel => channel.setName(alm_msg));
	//client.channels.find(channel => channel.id === "693109405696262164").setName(dro);
	
	  setTimeout(update, 1200000);
	
	}
	process.on('SIGUSR1',function (){
		console.log('Goodbye!');
		client.destroy();
	});
	process.on('SIGUSR2',function (){
		console.log('Goodbye!');
		client.destroy();
	});
	process.on('exit', function (){
		console.log('Goodbye!');
		client.destroy();
	});
	
		