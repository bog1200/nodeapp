const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
	name: 'covid',
	description: 'Covid19',
	execute(message, args) {
        let data;
        let Embed=new Discord.MessageEmbed();
        async function lol(args)
        {
          const response = await axios.get(`https://api.covid19api.com/country/${args[0]}`);
          data=response.data;
          //console.log(`CDATA: ${data}`);
          //const result=`${Object.entries(data[data.length-1])[7][1]}`;
          Embed.setColor('#ff0000').setTitle(`Covid19 ${Object.entries(data[data.length-1])[0][1]} Cases`).addField('Today',Object.entries(data[data.length-1])[7][1]-Object.entries(data[data.length-2])[7][1])
          .addField('Last week',Object.entries(data[data.length-1])[7][1]-Object.entries(data[data.length-8])[7][1]).addField('All Time',Object.entries(data[data.length-1])[7][1])
          .addField('Last Update',Object.entries(data[data.length-1])[11][1])
        .setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`);
        message.delete();
        message.channel.send(Embed)
        .then(msg => {
            msg.delete({ timeout: 15000 });
          })
        .catch(error => console.err(error));
        }
        if(args[0]!=='us') lol(args);
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