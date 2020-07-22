const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
	name: 'covid',
	description: 'Covid19',
	execute(message, args) {
        let Embed=new Discord.MessageEmbed();
        let timeout=15000;
        async function lol(args)
        {
          if (args[1]!==undefined &&parseInt(args[1])!=='NaN'){timeout=parseInt(args[1])*1000;}
          const response = await axios.get(`https://api.covid19api.com/country/${args[0]}`);
          console.log(`Timeout: ${timeout}`);
          const data=response.data;
          //console.log(`CDATA: ${data}`);
          //const result=`${Object.entries(data[data.length-1])[7][1]}`;
          Embed.setColor('#ff0000').setTitle(`Covid19 ${Object.entries(data[data.length-1])[0][1]}`).addFields(
            {name: '\u200B',value:'**Cases:**'},
            { name: 'Today', value: Object.entries(data[data.length-1])[7][1]-Object.entries(data[data.length-2])[7][1] ,inline: true},{ name: 'Last week', value: Object.entries(data[data.length-1])[7][1]-Object.entries(data[data.length-8])[7][1] ,inline: true},{ name: 'All Time', value: Object.entries(data[data.length-1])[7][1] ,inline: true},
            { name: '\u200B', value: '\u200B'},{name: '\u200B',value:'**Deaths:**'},
            { name: 'Today', value: Object.entries(data[data.length-1])[8][1]-Object.entries(data[data.length-2])[8][1] ,inline: true},{ name: 'Last week', value: Object.entries(data[data.length-1])[8][1]-Object.entries(data[data.length-8])[8][1] ,inline: true},{ name: 'All Time', value: Object.entries(data[data.length-1])[8][1] ,inline: true},
            { name: '\u200B', value: '\u200B'},
            { name: 'Last update', value: Object.entries(data[data.length-1])[11][1] },) .setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`);
        message.delete();
        message.channel.send(Embed)
        .then(msg => {
            msg.delete({ timeout: timeout });
          })
        .catch(error => console.err(error));
        }
        if(args[0]!=='us' || args[0].length>2 ) lol(args);
        else 
        {
            message.delete();
            Embed.setTitle("Error").setDescription("Country not supported").setColor(`#ff0000`)
            .setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`);
            message.channel.send(Embed)
            .then(msg => {
                msg.delete({ timeout: 7000 });
              })
            .catch(error => console.err(error));
        }   
    }
}