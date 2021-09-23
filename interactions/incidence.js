const {MessageEmbed} = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const moment = require('moment');
const {days} = require('../utils/days');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('incidence')
		.setDescription('Shows COVID-19 incidence rate')
    .addStringOption(option => option.setName("county").setDescription("The county to get data from").setRequired(true)),
	async execute(interaction) {
          let today,historicalData;
          let county=interaction.options.getString('county').toUpperCase();
         
        await axios.get(`https://d35p9e4fm9h3wo.cloudfront.net/latestData.json`).then(response => {
           today = response.data["currentDayStats"];
           historicalData = response.data["historicalData"];
          })

          interaction.reply({ embeds: [new MessageEmbed({title:`Covid19 RO`,color: '#ff0000', fields: 
          [{name: '\u200B',value:`**Cases (${county}) :**`},
          { name: 'Today', value: `${today.countyInfectionsNumbers[county]-historicalData[days(today,1)].countyInfectionsNumbers[county]}` ,inline: true},
          {name: 'Yesterday', value: `${historicalData[days(today,1)].countyInfectionsNumbers[county]-historicalData[days(today,2)].countyInfectionsNumbers[county]}` ,inline: true},
          { name: 'Last week', value: `${today.countyInfectionsNumbers[county]-historicalData[days(today,7)].countyInfectionsNumbers[county]}` ,inline: true},
          {name: '\u200B',value:`**Incidence (${county}) :**`},
          { name: 'Today', value: `${today.incidence[county]}` ,inline: true},
          {name: 'Yesterday', value: `${historicalData[days(today,1)].incidence[county]}`,inline: true},
          { name: '2 days ago', value: `${historicalData[days(today,2)].incidence[county]}` ,inline: true},
          { name: '3 days ago', value: `${historicalData[days(today,3)].incidence[county]}` ,inline: true},
          {name: '7 days ago', value: `${historicalData[days(today,7)].incidence[county]}`,inline: true},
          { name: '14 days ago', value: `${historicalData[days(today,14)].incidence[county]}` ,inline: true},
          { name: 'Last update', value: `${moment(today.parsedOn).format('ll')} 1:00 PM`}],timestamp: new Date(),footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`}})
        ]})
    }
}