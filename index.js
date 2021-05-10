//
require('dotenv').config();
const db = require("./utils/db");
const google = require("./utils/google");
const fs = require('fs');
const readline = require('readline');
const moment = require('moment');
let axios = require('axios');
const wait = require('util').promisify(setTimeout);
///
///
const Discord = require('discord.js');
let prefix;
const client = new Discord.Client();
client.commands = new Discord.Collection();
let cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
let stream_status=`Now with ${Math.floor(Math.random()*100)}% more bananas...`;

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

function days_calculator(today,days)
        {
          return moment(today.parsedOnString, "YYYY-MM-DD").subtract(days, 'days').format("YYYY-MM-DD");
		};
let today, historicalData, jud, cov_str,cov_vac_d2, c_out ,cov_vac_d1, cdf=0;
exports.days = ((today,days) => {return days_calculator(today,days);});;
async function update(){
	await axios.get('https://d35p9e4fm9h3wo.cloudfront.net/latestData.json').then((response) => {
	  c_out=response.data;
		  today=c_out["currentDayStats"];
		historicalData = c_out["historicalData"];
	})
		  .then( () => {
			try{
				let i=0;
				let cov_vac1,cov_vac2;
						jud=today.incidence;
						cov_vac1=today.vaccines.pfizer.total_administered+today.vaccines.moderna.total_administered+today.vaccines.astra_zeneca.total_administered+today.vaccines.johnson_and_johnson.total_administered;
						cov_vac2=today.vaccines.pfizer.immunized+today.vaccines.moderna.immunized+today.vaccines.astra_zeneca.immunized;
						do
						{
							i=i+1;
							cov_vac1+=historicalData[days_calculator(today,i)].vaccines.pfizer.total_administered+historicalData[days_calculator(today,i)].vaccines.johnson_and_johnson.total_administered+
							historicalData[days_calculator(today,i)].vaccines.moderna.total_administered+historicalData[days_calculator(today,i)].vaccines.astra_zeneca.total_administered;

							cov_vac2+=historicalData[days_calculator(today,i)].vaccines.pfizer.immunized+historicalData[days_calculator(today,i)].vaccines.johnson_and_johnson.immunized+
							historicalData[days_calculator(today,i)].vaccines.moderna.immunized+historicalData[days_calculator(today,i)].vaccines.astra_zeneca.immunized;
						}
						while(historicalData[days_calculator(today,i)].parsedOnString!="2020-12-27");
						cov_vac_d1=`${Math.trunc(((cov_vac1-cov_vac2)/1000000)*100)/100} M (${Math.round(((cov_vac1-cov_vac2)*100/16091562+Number.EPSILON)*10)/10}%)`;
						cov_vac_d2=`${Math.trunc(((cov_vac2)/1000000)*100)/100} M (${Math.round((cov_vac2*100/16091562+Number.EPSILON)*10)/10}%)`
						cdf=today.numberInfected-historicalData[days_calculator(today,1)].numberInfected;
						cov_str=`Cazuri: ${today.numberInfected}`;						
		}
			catch(error){
				console.error(error);
				cdf="-1";
				cov_str="Cazuri: -1";	}
		  })

	.catch(error => {
		console.error(error);
	  //refreshKey();
	});
	setTimeout(UpdateStatus, 3000);
	//
	}
	async function load()
	{
		await loginDiscord();
		await google.getkey();
		exports.client= client;
		update();
	}
	load();
	client.on('message', async message => {
		const date = new Date;
		let result;
		if (message.mentions.has(client.user.id)) prefix = " <@!476441249738653706>";
		else{
		if  (message.guild!==null){result = await db.query(`SELECT PREFIX FROM bot WHERE SERVERID = ${message.guild.id}`);}
		else {result = await db.query(`SELECT PREFIX FROM bot WHERE SERVERID = '0'`);}
		prefix = result[0]['PREFIX'];
		const args = message.content.slice(prefix.length).split(/ +/);
		let command = args.shift().toLowerCase();
		if (command==='2fa') command='validate';
		if (command==='update' && message.author.id==="239136395665342474") {update(); message.delete(); return}
		if (!client.commands.has(command)) return;
try {
	if (message.content.substr(0,1)!==prefix && !(message.mentions.has(client.user.id))) {return;};
	
	if (cooldowns.has(message.author.id)){return;}
	else cooldowns.set(message.author.id, Date.now());
	setTimeout(() => cooldowns.delete(message.author.id), 3000);
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
};
}});

async function UpdateStatus(){
	for (let i=0;i<client.guilds.cache.size;i=i+1)
	{
		let result = await db.query(`SELECT * FROM bot WHERE SERVERID = ${Array.from(client.guilds.cache)[i][0]}`)
		if(result[0]['COVCHID']!=null) {
				client.channels.fetch(result[0]['COVCHID']).then(channel => channel.setName(cov_str)).catch(error => console.error(error));
				client.channels.fetch(result[0]['COVNEWID']).then(channel => channel.setName(`Noi: ${cdf}`)).catch(error => console.error(error));
				if (result[0]['COVJUDID']!=null  && result[0]['COVJUD'] !=null)
				{client.channels.fetch(result[0]['COVJUDID']).then(channel => channel.setName(`${result[0]['COVJUD']}: ${jud[result[0]['COVJUD']]}`)).catch(error => console.error(error));}
				if (result[0]['COVVAC1ID']!=null)
				{client.channels.fetch(result[0]['COVVAC1ID']).then(channel => channel.setName(`Vaccin_1: ${cov_vac_d1}`)).catch(error => console.error(error));
				client.channels.fetch(result[0]['COVVAC2ID']).then(channel => channel.setName(`Vaccin_2: ${cov_vac_d2}`)).catch(error => console.error(error));}
		  }};					
	setTimeout(update, 60000*120);
	}
	
	client.on('guildCreate', guild =>
	{
		db.query(`INSERT INTO bot (SERVERID, SERVERNAME, JOINTIME) VALUES (${guild.id}, ${db.escape(guild.name)},${Date.now()})`);
		console.log(`[Bot] Joined ${guild.name} (${guild.id})`); 
	});
	
	
client.on('guildUpdate', (oldGuild, newGuild) =>
{
	db.query(`UPDATE bot SET SERVERNAME = ${db.escape(newGuild.name)} WHERE bot.SERVERID = ${oldGuild.id};`);
	console.log(`[Bot] Server name changed: \nOld: ${oldGuild.name} \nNew: ${newGuild.name} \nID: ${oldGuild.id}`); 
});

	client.on('guildDelete', guild =>
	{
		db.query(`DELETE FROM bot WHERE bot.SERVERID = ${guild.id}`);
		console.log(`[Bot] Left ${guild.name} (${guild.id})`);
});
		
    process.on('unhandledRejection', error => console.error('Caught Promise Rejection', error));

['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal => process.on(signal, () => {
    console.log('Goodbye!');
		sql.end();
		client.destroy();
    process.exit();
  }));