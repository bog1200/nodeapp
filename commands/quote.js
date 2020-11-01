const Discord = require('discord.js');
module.exports = {
	name: 'quote',
	description: 'Shows quote-formatted message',
	execute(message, args) { 
        const Embed=new Discord.MessageEmbed().setColor('#ff00ff').setTitle('Quote').setDescription(`${args.join(" ")}`).setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`);
        message.delete();
        message.channel.send(Embed);
    }
}