//
require('dotenv').config();
const db = require("./utils/db");
const google = require("./utils/google");
const fs = require('fs');
const {days} = require("./utils/days");
let axios = require('axios');
const wait = require('util').promisify(setTimeout);
///
///
const { Client, Collection, Intents } = require('discord.js');
const intents = new Intents([Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]);
const client = new Client({ intents: intents});
client.interactions = new Collection();
const interactionFiles = fs.readdirSync('./interactions').filter(file => file.endsWith('.js'));

for (const file of interactionFiles) {
	const interaction = require(`./interactions/${file}`);

	// set a new item in the Collection
	// with the key as the interaction name and the value as the exported module
	client.interactions.set(interaction.data.name, interaction);
}
let stream_status=`Now with ${Math.floor(Math.random()*100)}% more bananas...`;

client.once('ready', () => {
 client.user.setActivity(stream_status);
console.log("[Discord] API Successfully connected!");
});
//wait(2000);



async function loginDiscord()
{
const login = new Promise ((resolve,reject) =>
{
	client.login(process.env.DISCORD_KEY).then(res => resolve(res)).catch(error => reject(error));
})
}
///
let today, historicalData, jud, cov_str,cov_vac_d2, c_out, cdf=0;

async function update(){
	
	await axios.get('https://d35p9e4fm9h3wo.cloudfront.net/smallData.json').then((response) => {
	  c_out=response.data;
		  today=c_out["currentDayStats"];
		historicalData = c_out["historicalData"];
	})
		  .then( () => {
			try{
				let i=0;
				let cov_vac;
						jud=today.incidence;
						let johnson_and_johnson=today.vaccines.johnson_and_johnson.total_administered;
						cov_vac=today.vaccines.pfizer.immunized+today.vaccines.moderna.immunized+today.vaccines.astra_zeneca.immunized;
						do
						{
							i=i+1;
							cov_vac+=historicalData[days(today,i)].vaccines.pfizer.immunized+historicalData[days(today,i)].vaccines.moderna.immunized+
							historicalData[days(today,i)].vaccines.astra_zeneca.immunized;

							johnson_and_johnson+=historicalData[days(today,i)].vaccines.johnson_and_johnson.total_administered;
						}
						while(historicalData[days(today,i)].parsedOnString!="2020-12-27");
						cov_vac_d2=`${Math.trunc(((cov_vac+johnson_and_johnson)/1000000)*100)/100} M (${Math.round(((cov_vac+johnson_and_johnson)*100/16941562+Number.EPSILON)*10)/10}%)`
						cdf=today.numberInfected-historicalData[days(today,1)].numberInfected;
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
		update();
	}
	load();

	client.on('interactionCreate', interaction => {
		if (interaction.isButton()) console.log(interaction);
		if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	const date = new Date;
	console.log(`[Bot] "${commandName}" interaction triggered by ${interaction.user.username}#${interaction.user.discriminator} (#${interaction.channel.name} on ${interaction.guild.name}) at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `);
	client.interactions.get(commandName).execute(interaction);
	});

	// client.on('interactionCreate', interaction => {
	// 	if (!interaction.isButton()) return;
	// 	console.log(interaction);
	// });
function incd_find(result)
{
	delete require.cache[require.resolve("./incd_api/latest.min.json")];
    const incd = require("./incd_api/latest.min.json");
	let loc= Object.values(incd["incidenta"].find(item => item.name == result[0]["COVLOC"] && item.county == result[0]["COVLOCJUD"]));
	return Math.trunc(loc[loc.length-1]*100)/100;
}
async function UpdateStatus(){
	for (let i=0;i<client.guilds.cache.size;i=i+1)
	{
		let result = await db.query(`SELECT * FROM bot WHERE SERVERID = ${Array.from(client.guilds.cache)[i][0]}`)
		if(result[0]['COVCHID']!=null) {
				client.channels.fetch(result[0]['COVCHID']).then(channel => channel.setName(cov_str)).catch(error => console.error(error));
				client.channels.fetch(result[0]['COVNEWID']).then(channel => channel.setName(`Noi: ${cdf}`)).catch(error => console.error(error));
				if (result[0]['COVJUDID']!=null  && result[0]['COVJUD'] !=null)
				{client.channels.fetch(result[0]['COVJUDID']).then(channel => channel.setName(`${result[0]['COVJUD']}: ${jud[result[0]['COVJUD']]}`)).catch(error => console.error(error));}
				if (result[0]['COVLOCID']!=null  && result[0]['COVLOC'] !=null)
				{client.channels.fetch(result[0]['COVLOCID']).then(channel => channel.setName(`INCD: ${incd_find(result)}`)).catch(error => console.error(error));}
				if (result[0]['COVVAC1ID']!=null)
				{client.channels.fetch(result[0]['COVVAC1ID']).then(channel => channel.setName(`Vaccin_1: N/A`)).catch(error => console.error(error));
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
		db.end();
		client.destroy();
    process.exit();
  }));
