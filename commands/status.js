const Discord = require('discord.js');
module.exports = {
	name: 'status',
	description: 'Shows bot status',
	execute(message, args) { 
        message.delete(); 
        const Embed = new Discord.MessageEmbed().setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`).setColor('#ffff00').setTitle('Bot Status')
        let alive=((Date.now()-args[98])/1000).toFixed(0);
        Embed.addField("Start time",`${args[99]}`);
        let alive_string;
        
        if (alive <=60) 
        (alive_string=`${(alive)} s`)
        else if (alive > 60 && alive < 3600)
        (alive_string=`${parseInt(alive/60)} min, ${parseInt(alive%60)} s`)
        else if (alive > 3600 && alive < 86400)
        (alive_string=`${parseInt(alive/3600)} h, ${parseInt((alive/60)%60)} min, ${parseInt((alive/3600)%60)} s`)
        else (alive_string=`${parseInt(alive/86400)} d, ${parseInt((alive/3600)%24)} h, ${parseInt((alive/60)%60)} min, ${parseInt((alive/3600)%60)} s`)
        Embed.addField("Uptime",`${(alive_string)}`);
        message.channel.send(Embed); 
    }
}