const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed, Permissions} = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete Messages')
    .addIntegerOption(option => option.setName("number").setDescription("The number of messages").setRequired(true)),
	async execute(interaction) {
    const Embed = new MessageEmbed().setTitle("Delete Messages").setTimestamp()
    .setFooter(`${interaction.user.username}#${interaction.user.discriminator}` );
    const count = interaction.options.getInteger('number');
    if (count<=0 || count >99) Embed.setDescription("Invalid Number").setColor("#ff0000")
    else if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
       {
       interaction.channel.bulkDelete(count);	
        Embed.setDescription(`${count} messages deleted`).setColor("#0f3c6c");
      }
    else {Embed.setDescription("You do not have permission to use this command!").setColor("#ff0000");}
    interaction.reply({ embeds: [Embed], ephemeral: true})
  }
}
