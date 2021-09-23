const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('code')
		.setDescription('Shows link to bot code'),
	async execute(interaction) {
        const Embed=new MessageEmbed().setColor('#ff00ff').setTitle('Code').setDescription('[Click here to see bot source code](https://github.com/bog1200/nodeapp)').setTimestamp().setFooter(`${interaction.user.username}#${interaction.user.discriminator}`);
        interaction.reply({ embeds: [Embed]})
        .catch(error => console.error(error));
    }
}