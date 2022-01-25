const {MessageEmbed} = require('discord.js');
const moment = require('moment')
const axios = require('axios');
const {days} = require('../utils/days');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('vaccine')
		.setDescription('Shows COVID19 Vaccine data (RO)'),
	async execute(interaction) {

          const eligible_population=16941562;
          let response,today,historicalData;
            response = await axios.get(`https://d35p9e4fm9h3wo.cloudfront.net/latestData.json`);
            today=response.data["currentDayStats"];
            historicalData = response.data["historicalData"];
              let i=0;
              let cov_vac1,cov_vac2;
            let johnson_and_johnson=today.vaccines.johnson_and_johnson.total_administered;
						cov_vac1=today.vaccines.pfizer.total_administered+today.vaccines.moderna.total_administered+today.vaccines.astra_zeneca.total_administered;
						cov_vac2=today.vaccines.pfizer.immunized+today.vaccines.moderna.immunized+today.vaccines.astra_zeneca.immunized;
						do
						{
							i=i+1;
							cov_vac1+=historicalData[days(today,i)].vaccines.pfizer.total_administered+historicalData[days(today,i)].vaccines.moderna.total_administered+
							historicalData[days(today,i)].vaccines.astra_zeneca.total_administered;

							cov_vac2+=historicalData[days(today,i)].vaccines.pfizer.immunized+historicalData[days(today,i)].vaccines.moderna.immunized+
							historicalData[days(today,i)].vaccines.astra_zeneca.immunized;

							johnson_and_johnson+=historicalData[days(today,i)].vaccines.johnson_and_johnson.total_administered;
						}
                      while(historicalData[days(today,i)].parsedOnString!="2020-12-27");
                      interaction.reply({embeds: [
                        new MessageEmbed(
                          {title:`Covid19 Vaccines RO`,color: '#ff0000', fields: [,
          {name: 'At least 1 dose', value: '\u200B' ,inline: true},{ name: 'Dose 1 only', value: "(excluding J&J)" ,inline: true},{ name: 'Fully vaccinated', value: '\u200B',inline: true},
          {name: `${Math.trunc(((cov_vac1-cov_vac2+johnson_and_johnson)/1000000)*100)/100} M`, value: `(${Math.round(((cov_vac1-cov_vac2+johnson_and_johnson)*100/eligible_population+Number.EPSILON)*10)/10}%)`,inline: true},{ name: `${Math.trunc(((cov_vac1-2*cov_vac2)/1000000)*100)/100} M`, value: `(${Math.round(((cov_vac1-2*cov_vac2)*100/eligible_population+Number.EPSILON)*10)/10}%)` ,inline: true}, { name: `${Math.trunc(((cov_vac2+johnson_and_johnson)/1000000)*100)/100} M`, value: `(${Math.round(((cov_vac2+johnson_and_johnson)*100/eligible_population+Number.EPSILON)*10)/10}%)` ,inline: true},
          { name: 'Last update', value: `${moment(today.parsedOnString).format('ll')} 1:00 PM`}],timestamp: new Date()})
                      ]});
        }
}