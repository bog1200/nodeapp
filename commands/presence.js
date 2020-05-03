const Discord = require('discord.js');
const status= require('../index.js');
module.exports = {
    name: 'presence',
    description: 'Change bot presence',
    execute(message, args) {
        status.update(args[0],args[1],args[2],args[3]);
        message.delete();
        const Embed = new Discord.MessageEmbed().setTitle("Bot Presence").setTimestamp()
        .setFooter(`${message.author.username}#${message.author.discriminator}`)
        .addField("Status",`${args[0]}`)
		.addField("Type",`${args[1]||'PLAYING'}`)
        .addField("Link", `${args[2]||'none'}`);
        
        message.channel.send(Embed);

        
        //status.update(args[0],args[1],args[2]);
        //client.presence.activities='LOL';
    



    },
};