//
const mysql = require('mysql');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const googleAuth = require('google-auth-library');
const moment = require('moment');
let axios = require('axios');
const privatekey = require("./privatekey.json");
const wait = require('util').promisify(setTimeout);

///
///

const Discord = require('discord.js');
require('dotenv').config();
let prefix;
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var con = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: process.env.MYSQL_DB
  });
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
let stream_status=`Now with ${Math.floor(Math.random()*100)}% more bananas...`;
let invites = {};


client.on('ready', () => {
 client.user.setActivity(stream_status);
console.log("[Discord] API Successfully connected!");
});
wait(2000);

 exports.update = ((arg0,arg1='PLAYING',arg2='online', arg3) => {console.log(`1:${arg0}, 2:${arg1}, 3:${arg2}, 4:${arg3}`);

if (arg3!==undefined) {client.user.setPresence({ activity: { name: `${arg0}`,type: `${arg1}`,url:`${arg3}` }, status: `${arg2}` });}
else {client.user.setPresence({ activity: { name: `${arg0}`,type: `${arg1}`}, status: `${arg2}` });}

});

async function loginDiscord()
{
const login = new Promise ((resolve,reject) =>
{
	client.login(process.env.DISCORD_KEY).then(res => resolve(res)).catch(error => reject(error));
})
}
///
let google_token;

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
function days(today,days)
        {
          return moment(today.parsedOnString, "YYYY-MM-DD").subtract(days, 'days').format("YYYY-MM-DD");
        }

let today, historicalData, jud, cov_str, c_out, cdf=0, alm_msg, alm_subs=-1;
async function update(){
	await axios.all([
		axios.get(`https://www.googleapis.com/youtube/v3/channels?id=UC73wv11MF_jm6v7iz3kuO8Q&part=statistics&fields=items/statistics/subscriberCount&access_token=${google_token}`),
		axios.get('https://datelazi.ro/latestData.json')
	]).then(axios.spread((response1, response2) => {
	  alm_subs=response1.data.items[0].statistics.subscriberCount;
	  c_out=response2.data;
	})).catch(error => {
		console.error(error);
	  refreshKey();
	});
	try{
		alm_msg="Abonati: "+`${alm_subs}`;
		//console.log("Alm: "+`${alm_subs}`);
		//console.log(c_out[0]['cases']);
			
			today=c_out["currentDayStats"];
			jud=today.incidence;
            historicalData = c_out["historicalData"];
		cdf=today.numberInfected-historicalData[days(today,1)].numberInfected
		cov_str=`Cazuri: ${today.numberInfected}`;
}
	catch(error){
		console.error(error);
		cdf="-1";
		cov_str="Cazuri: -1";	}
		
	setTimeout(UpdateStatus, 3000);
	//
	}
	async function loginSql(log){
		
		  con.connect( err => {
			if (err) console.error(err);})
			if(log) console.log("[SQL] Database Successfully Connected!");
	}
	async function load()
	{
		google_token= await getkey();
		const D_Log_out = await loginDiscord();
		const sqlstart = await loginSql(true);
		//console.log("[Google] Token: "+`${google_token}`);
		console.log("[Google] API Successfully connected!");
		exports.g_token = google_token;
		exports.client= client;
		update();
	}
	load();
	con.on('error', err =>
	{
		if(err.code === 'PROTOCOL_CONNECTION_LOST') { loginSql(false);} 
	});
	const queue = new Map();
	exports.queue = queue;
	client.on('message', async message => {
		const date = new Date;
		let sql;
		if  (message.guild!==null){
		sql = `SELECT * FROM bot WHERE SERVERID = ${message.guild.id}`;}
		else {sql = `SELECT * FROM bot WHERE SERVERID = 'DM'`;}
		con.query(sql, function (err, result) {
			if (err)
				throw err;
			else 
			{
			if (message.mentions.has(client.user.id)) prefix = " <@!476441249738653706>";
			else prefix = result[0]['PREFIX'];
		const args = message.content.slice(prefix.length).split(/ +/);
		let command = args.shift().toLowerCase();
		if (command==='2fa') command='validate';
		if (command==='update' && message.author.id==="239136395665342474") {update(); message.delete(); return}
		//client.channels.resolve(message.channel.id.toString()).messages.fetch(message.content.toString()).then((message => {message.delete()}));
		if (!client.commands.has(command)) return;
try {
	if (message.content.substr(0,1)!==prefix && !(message.mentions.has(client.user.id))) {return;};
	if  (message.guild!==null){
		 client.commands.get(command).execute(message, args);
	console.log(`[Bot] triggered with "${message.content}" by ${message.author.username}#${message.author.discriminator} (#${message.channel.name} on ${message.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `);
}
	else {message.reply('Bot commands are unavailable on DMs').then(msg => {
		msg.delete({ timeout: 7000 });
	  })
	.catch(error => console.err(error));
	 console.log(`[Bot] triggered with "${message.content}" by ${message.author.username}#${message.author.discriminator} (DM) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);}
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}
}});
});

function UpdateStatus(){
	//console.log(client.guilds.cache)
	for (let i=0;i<client.guilds.cache.size;i=i+1)
	{
		let sql = `SELECT * FROM bot WHERE SERVERID = ${Array.from(client.guilds.cache)[i][0]}`;
		
			  con.query(sql, function (err, result) {
				if (err) throw err;
				else if(result[0]['COVCHID']!=null) {
					client.channels.fetch(result[0]['COVCHID']).then(channel => channel.setName(cov_str)).catch(error => console.error(error));
					client.channels.fetch(result[0]['COVNEWID']).then(channel => channel.setName(`Noi: ${cdf}`)).catch(error => console.error(error));
					if (result[0]['COVJUDID']!=null  && result[0]['COVJUD'] !=null)
					{client.channels.fetch(result[0]['COVJUDID']).then(channel => channel.setName(`${result[0]['COVJUD']}: ${jud[result[0]['COVJUD']]}`)).catch(error => console.error(error));}

			  }});
	}
	
	///AlmostIce
	client.channels.fetch("700813443111977021").then(channel => channel.setName(alm_msg)).catch(error => console.error(error));
	  setTimeout(update, 1200000);
	
	}
	
	client.on('guildCreate', guild =>
	{
		let sql = `INSERT INTO bot (SERVERID, SERVERNAME, JOINTIME) VALUES (${guild.id}, ${con.escape(guild.name)},${Date.now()})`;
			  con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(`[Bot] Joined ${guild.name} (${guild.id})`); })
});
client.on('guildUpdate', (oldGuild, newGuild) =>
	{
		let sql = `UPDATE bot SET SERVERNAME = ${con.escape(newGuild.name)} WHERE bot.SERVERID = ${oldGuild.id};`;
			  con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(`[Bot] Server name changed: \nOld: ${oldGuild.name} \nNew: ${newGuild.name} \nID: ${oldGuild.id}`);
})});

	client.on('guildDelete', guild =>
	{
		let sql = `DELETE FROM bot WHERE bot.SERVERID = ${guild.id}`;
			  con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(`[Bot] Left ${guild.name} (${guild.id})`);
})});


	
        //Romail.ml
		client.on('guildMemberAdd', member => {
			// To compare, we need to load the current invite list.
			member.guild.fetchInvites().then(guildInvites => {
				// This is the *existing* invites for the guild.
				const ei = invites[member.guild.id];
		
				// Update the cached invites
				invites[member.guild.id] = guildInvites;
		
				// Look through the invites, find the one for which the uses went up.
				const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
		
				console.log(invite.code)
		
				if (invite.code === "xg44stZ") {
					return member.addRole(member.guild.roles.find(role => role.name === "bog1200"));
				}
			})});
		
	process.on('unhandledRejection', error => console.error('Caught Promise Rejection', error));
	process.on('SIGINT',function(){
	client.destroy();
	connection.end(function(err) {
		console.error(err);
	  });
});
	process.on('SIGUSR1',function (){
		console.log('Goodbye!');
		client.destroy();
		connection.end(function(err) {
			console.error(err);
		  });
	});
	process.on('SIGUSR2',function (){
		console.log('Goodbye!');
		connection.end(function(err) {
			console.error(err);
		  });
		client.destroy();
	});
	process.on('exit', function (){
		console.log('Goodbye!');
		connection.end(function(err) {
			console.error(err);
		  });
		client.destroy();
	});