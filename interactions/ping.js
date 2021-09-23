const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!'),
	async execute(interaction) {
    	await interaction.reply("Pong!");
		console.log(`Pong with ${Date.now() - interaction.createdAt}ms delay!`);
    }
}