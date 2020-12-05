const Discord = require('discord.js');
const axios = require('axios');
const moment = require('moment')
const main = require('../index');
module.exports = {
	name: 'incidence',
	description: 'Shows COVID-19 incidence rate',
	execute(message, args) { 
        
        async function incidence()
        {
          let today,historicalData;
          let county=args[0].toUpperCase();
         
        await axios.get(`https://datelazi.ro/latestData.json`).then(response => {
           today = response.data["currentDayStats"];
           historicalData = response.data["historicalData"];})
        .then(() =>{
          EmbedText = {title:`Covid19 RO`,color: '#ff0000', fields: [{name: '\u200B',value:`**Cases (${county}) :**`},
          { name: 'Today', value: today.countyInfectionsNumbers[county]-historicalData[main.days(today,1)].countyInfectionsNumbers[county] ,inline: true},{name: 'Yesterday', value: historicalData[main.days(today,1)].countyInfectionsNumbers[county]-historicalData[main.days(today,2)].countyInfectionsNumbers[county] ,inline: true},{ name: 'Last week', value: today.countyInfectionsNumbers[county]-historicalData[main.days(today,7)].countyInfectionsNumbers[county] ,inline: true},
          {name: '\u200B',value:`**Incidence (${county}) :**`},
          { name: 'Today', value: today.incidence[county] ,inline: true},,{name: 'Yesterday', value: historicalData[main.days(today,1)].incidence[county],inline: true},{ name: '7 days ago', value: historicalData[main.days(today,7)].incidence[county] ,inline: true},
          { name: 'Last update', value:  moment(today.parsedOn*1000).format('lll')}],timestamp: new Date(),footer: { text: `${message.author.username}#${message.author.discriminator}`},};
          let Embed = new Discord.MessageEmbed(EmbedText);
          message.channel.send(Embed).then(msg => {
            msg.delete({ timeout: 30000 });
          })
        })
       
        }
        incidence();

    }
}