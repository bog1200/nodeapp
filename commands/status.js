const Discord = require('discord.js');
module.exports = {
	name: 'status',
	description: 'Shows bot status',
	execute(message, args) {
      const start = Date.now();
      const client = message.client;
        message.delete(); 
        let alive_string, alive=((client.uptime)/1000).toFixed(0);
        if (alive <=60) 
        (alive_string=`${(alive)} s`)
        else if (alive > 60 && alive < 3600)
        (alive_string=`${parseInt(alive/60)} min, ${parseInt(alive%60)} s`)
        else if (alive > 3600 && alive < 86400)
        (alive_string=`${parseInt(alive/3600)} h, ${parseInt((alive/60)%60)} min, ${parseInt((alive/3600)%60)} s`)
        else (alive_string=`${parseInt(alive/86400)} d, ${parseInt((alive/3600)%24)} h, ${parseInt((alive/60)%60)} min, ${parseInt((alive/3600)%60)} s`)
        
        EmbedText = {title:`Bot Status`,color: '#ffff00', fields: [
          { name: 'Start time', value: client.readyAt ,inline: false},
          { name: 'Uptime', value: alive_string ,inline: true},{ name: '\u200B', value: '\u200B',inline: true},{ name: 'Ping', value: `${client.ws.ping} ms | ${Date.now()-start} ms` ,inline: true},
          ],timestamp: new Date(), footer: { text: `${message.author.username}#${message.author.discriminator}`},};
        const Embed = new Discord.MessageEmbed(EmbedText);  
        message.channel.send(Embed)
        .then(msg => {
            msg.delete({ timeout: 15000 });
          })
        .catch(error => console.err(error)); 
    }
}