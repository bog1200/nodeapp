const Discord = require('discord.js');
const moment = require('moment')
const axios = require('axios');
const main = require('../index');
module.exports = {
	name: 'covid',
  description: 'Covid19',
  usage: '<country> [timer]',
	execute(message, args) {
        
        async function lol(ro, args)
        {
          let response,today,historicalData;
          if (ro)
          {
            response = await axios.get(`https://d35p9e4fm9h3wo.cloudfront.net/latestData.json`);
            today=response.data["currentDayStats"];
            historicalData = response.data["historicalData"];
          }
          else 
          {
           response = await axios.get(`https://covid19-api.org/api/timeline/${args[0]}`);
          } 
          const data=response.data;
          let i=0;
          let cdf=0;
          let EmbedText;
          if (ro)
          {
           EmbedText = {title:`Covid19 RO`,color: '#ff0000', fields: [{name: '\u200B',value:'**Cases:**'},
          { name: 'Today', value: today.numberInfected-historicalData[main.days(today,1)].numberInfected ,inline: true},{name: 'Yesterday', value: historicalData[main.days(today,1)].numberInfected-historicalData[main.days(today,2)].numberInfected ,inline: true},{ name: 'Last week', value: today.numberInfected-historicalData[main.days(today,7)].numberInfected ,inline: true},
          { name: '2 Weeks', value: today.numberInfected-historicalData[main.days(today,14)].numberInfected ,inline: true},{ name: '\u200B', value: '\u200B',inline: true},{ name: 'All Time', value: today.numberInfected ,inline: true},
          { name: '\u200B', value: '\u200B'},{name: '\u200B',value:'**Deaths:**'},
          { name: 'Today', value: today.numberDeceased-historicalData[main.days(today,1)].numberDeceased ,inline: true},{ name: 'Last week', value: today.numberDeceased-historicalData[main.days(today,7)].numberDeceased ,inline: true},{ name: 'All Time', value: today.numberDeceased ,inline: true},
          { name: '\u200B', value: '\u200B'},
          { name: 'Last update', value: `${moment(today.parsedOnString).format('ll')} 1:00 PM`}],timestamp: new Date(),footer: { text: `${message.author.username}#${message.author.discriminator}`},};
          }
          else  {
            do
          {
            i=i+1; 
            cdf=data[0]['cases']-data[i]['cases']
           
          }while (cdf==0);
            EmbedText = {title:`Covid19 ${data[0]['country']}`,color: '#ff0000', fields: [{name: '\u200B',value:'**Cases:**'},
          { name: 'Today', value: data[0]['cases']-data[i]['cases'] ,inline: true},{name: 'Yesterday', value: data[i]['cases']-data[i+1]['cases'] ,inline: true},{ name: 'Last week', value: data[0]['cases']-data[i+6]['cases'] ,inline: true},
          { name: '2 Weeks', value: data[0]['cases']-data[i+13]['cases'] ,inline: true},{ name: '\u200B', value: '\u200B',inline: true},{ name: 'All Time', value: data[0]['cases'] ,inline: true},
          { name: '\u200B', value: '\u200B'},{name: '\u200B',value:'**Deaths:**'},
          { name: 'Today', value: data[0]['deaths']-data[i]['deaths'] ,inline: true},{ name: 'Last week', value: data[0]['deaths']-data[i+6]['deaths'] ,inline: true},{ name: 'All Time', value: data[0]['deaths'] ,inline: true},
          { name: '\u200B', value: '\u200B'},
          { name: 'Last update', value:  data[0]['last_update']}],timestamp: new Date(),footer: { text: `${countdown} | ${message.author.username}#${message.author.discriminator}`},};}
        let Embed = new Discord.MessageEmbed(EmbedText);
        setTimeout(() =>
        {
        message.channel.send(Embed)
        },500);

        if(args[0].toUpperCase()=='RO')lol(true ,args);
        else if (args[0].toUpperCase().match(/[A-Z]{2}/)) lol(false, args);
        else
        {
            const Embed= new Discord.MessageEmbed().setTitle("Error").setDescription("Invalid country or API not avaliable").setColor(`#ff0000`).setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`);
            message.channel.send(Embed)
            .catch(error => console.err(error));
        }
      }
    }
}   