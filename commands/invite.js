const Discord = require('discord.js');
module.exports = {
	name: 'invite',
	description: 'Shows link to invite bot ',
	execute(message, args) { 
        const Embed=new Discord.MessageEmbed().setColor('#e87a13').setTitle('Invite').setDescription('[Click here to invite bot](https://discord.com/oauth2/authorize?client_id=476441249738653706&permissions=103902288&scope=bot)').setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`);
        message.delete();
        message.channel.send(Embed)
        .then(msg => {
            msg.delete({ timeout: 7000 });
          })
        .catch(error => console.err(error));
    }
}