const moment = require('moment')
const axios = require('axios');
const {days} = require('../utils/days');

  const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('covid')
		.setDescription('Get Covid19 Statistics')
    .addStringOption(option => option.setName("country").setDescription("ISO 3166-1 alpha-2 country name").setRequired(true)),
    
    async execute(interaction) {
    
      const country=interaction.options.getString('country');
      if(country.toUpperCase()=='RO')
      {

        const response = await axios.get(`https://d35p9e4fm9h3wo.cloudfront.net/latestData.json`);
        const today=response.data["currentDayStats"];
        const historicalData = response.data["historicalData"];
  await interaction.reply({embeds: [{title:`Covid19 RO`,color: '#ff0000', fields: [{name: '\u200B',value:'**Cases:**'},
        { name: 'Today', value: `${today.numberInfected-historicalData[days(today,1)].numberInfected}` ,inline: true},{name: 'Yesterday', value: `${historicalData[days(today,1)].numberInfected-historicalData[days(today,2)].numberInfected}` ,inline: true},{ name: 'Last week', value: `${today.numberInfected-historicalData[days(today,7)].numberInfected}`,inline: true},
        { name: '2 Weeks', value: `${today.numberInfected-historicalData[days(today,14)].numberInfected}` ,inline: true},{ name: '\u200B', value: '\u200B',inline: true},{ name: 'All Time', value: `${today.numberInfected}` ,inline: true},
        { name: '\u200B', value: '\u200B'},{name: '\u200B',value:'**Deaths:**'},
        { name: 'Today', value: `${today.numberDeceased-historicalData[days(today,1)].numberDeceased}` ,inline: true},{ name: 'Last week', value: `${today.numberDeceased-historicalData[days(today,7)].numberDeceased}` ,inline: true},{ name: 'All Time', value: `${today.numberDeceased}` ,inline: true},
        { name: '\u200B', value: '\u200B'},
        { name: 'Last update', value: `${moment(today.parsedOnString).format('ll')} 1:00 PM`}],timestamp: new Date(),footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`}}]})
      }

      else 
      {
        let Embed= new MessageEmbed().setTitle("Error").setColor(`#ff0000`).setTimestamp().setFooter(`${interaction.user.username}#${interaction.user.discriminator}`)
        if(country.toUpperCase()!='UK' && country.match(/[a-zA-Z]{2}$/))
      {
        Embed.setDescription("API not avaliable")
        interaction.reply({ embeds: [Embed]});
      //   const response = await axios.get(`https://covid19-api.org/api/timeline/${country}`);
      //   const data=response.data;
      //   let i=0;
      //   let cdf=0;
      //     do{
      //     i=i+1; 
      //     cdf=data[0]['cases']-data[i]['cases']
         
      //   }while (cdf==0);

      //   interaction.reply({embeds: [new MessageEmbed({title:`Covid19 ${data[0]['country']}`,color: '#ff0000', fields: [{name: '\u200B',value:'**Cases:**'},
      //         { name: 'Today', value: `${data[0]['cases']-data[i]['cases']}` ,inline: true},{name: 'Yesterday', value: `${data[i]['cases']-data[i+1]['cases']}` ,inline: true},{ name: 'Last week', value: `${data[0]['cases']-data[i+6]['cases']}` ,inline: true},
      //         { name: '2 Weeks', value: `${data[0]['cases']-data[i+13]['cases']}` ,inline: true},{ name: '\u200B', value: '\u200B',inline: true},{ name: 'All Time', value: `${data[0]['cases']}` ,inline: true},
      //         { name: '\u200B', value: '\u200B'},{name: '\u200B',value:'**Deaths:**'},
      //         { name: 'Today', value: `${data[0]['deaths']-data[i]['deaths']}` ,inline: true},{ name: 'Last week', value: `${data[0]['deaths']-data[i+6]['deaths']}` ,inline: true},{ name: 'All Time', value: `${data[0]['deaths']}` ,inline: true},
      //         { name: '\u200B', value: '\u200B'},
      //         { name: 'Last update', value: `${ data[0]['last_update']}`}],timestamp: new Date(),footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`}})
      // ]});
      }
      else
      {Embed.setDescription("Invalid country"); interaction.reply({ embeds: [Embed]}); }
    }  
  }
}

