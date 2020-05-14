const Discord = require('discord.js');
module.exports = {
	name: 'code',
	description: 'Shows link to bot code',
	execute(message, args) { 
        const Embed=new Discord.MessageEmbed().setColor('#ff00ff').setTitle('Quote').setDescription('Click [here](https://github.com/bog12555/nodeapp) to see bot source code').setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`);
        message.delete();
        message.channel.send(Embed);
    }
}