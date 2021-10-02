const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./interactions').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '476441249738653706';
// const guildId = '765941633241841666';
console.log('Started loading application (/) commands.');
for (const file of commandFiles) {
	const command = require(`./interactions/${file}`);
	console.log(`Loaded ${file}.`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_KEY);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
 	
	await rest.put(
		Routes.applicationCommands(clientId),
		{ body: commands },
	);
 
		

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();