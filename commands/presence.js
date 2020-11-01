const Discord = require('discord.js');
const status= require('../index.js');
module.exports = {
    name: 'presence',
    description: 'Change bot presence',
    execute(message, args) {
        const arguments=args.join(" ").split(", ");
        status.update(arguments[0],arguments[1],arguments[2],arguments[3]);
        message.delete();
        const Embed = new Discord.MessageEmbed().setTitle("Bot Presence").setTimestamp()
        .setFooter(`${message.author.username}#${message.author.discriminator}`)
        .addField("Presence",`${arguments[0]}`)
        .addField("Type",`${arguments[1]||'PLAYING'}`)
        .addField("Status",`${arguments[2]||'online'}`)
        .addField("Link", `${arguments[3]||'none'}`);
        
        message.channel.send(Embed)
        .then(msg => {
            msg.delete({ timeout: 7000 });
          })
        .catch(error => console.err(error));

        
        //status.update(args[0],args[1],args[2]);
        //client.presence.activities='LOL';
    



    },
};