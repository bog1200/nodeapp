let {queue} = require("./play");
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resume the music'),
	async execute(interaction) {
		if (!queue) return interaction.reply("Nothing is playing");
		const serverQueue = queue.get(interaction.guild.id);
		serverQueue.player.unpause();
 		return interaction.reply("Music resumed");
	},
};