const Discord = require('discord.js');
module.exports = {
	name: 'roll',
	description: 'Roll a die',
	execute(message, args) { 
        const Embed=new Discord.MessageEmbed().setColor('#ff00ff').setTitle(`Roll (${args[0]} sides die)`).setDescription(`${Math.floor(Math.random()*args[0])+1}`).setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`);
        message.delete();
        message.channel.send(Embed)
        .then(msg => {
            msg.delete({ timeout: 7000 });
          })
        .catch(error => console.err(error));
    }
}