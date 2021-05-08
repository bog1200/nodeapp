const Discord = require('discord.js');
const moment = require('moment')
const axios = require('axios');
const main = require('../index');
module.exports = {
	name: 'vaccine',
  description: 'Shows COVID19 Vaccine data',
	execute(message) {

        async function command()
        {
          const eligible_population=16091562;
          let response,today,historicalData;
            response = await axios.get(`https://d35p9e4fm9h3wo.cloudfront.net/latestData.json`);
            today=response.data["currentDayStats"];
            historicalData = response.data["historicalData"];
              let i=0;
              let cov_vac1,cov_vac2;
                      cov_vac1=today.vaccines.pfizer.total_administered+today.vaccines.moderna.total_administered+today.vaccines.astra_zeneca.total_administered;
                      cov_vac2=today.vaccines.pfizer.immunized+today.vaccines.moderna.immunized+today.vaccines.astra_zeneca.immunized;
                      do
                      {
                          i=i+1;
                          cov_vac1+=historicalData[main.days(today,i)].vaccines.pfizer.total_administered+
                          historicalData[main.days(today,i)].vaccines.moderna.total_administered+historicalData[main.days(today,i)].vaccines.astra_zeneca.total_administered;

                          cov_vac2+=historicalData[main.days(today,i)].vaccines.pfizer.immunized+
                          historicalData[main.days(today,i)].vaccines.moderna.immunized+historicalData[main.days(today,i)].vaccines.astra_zeneca.immunized;
                      }
                      while(historicalData[main.days(today,i)].parsedOnString!="2020-12-27");
                      message.channel.send(new Discord.MessageEmbed(
                          {title:`Covid19 Vaccines RO`,color: '#ff0000', fields: [,
          {name: 'At least 1 dose', value: '\u200B' ,inline: true},{ name: 'Dose 1 only', value: "\u200B" ,inline: true},{ name: 'Dose 2 only', value: '\u200B',inline: true},
          {name: `${Math.trunc(((cov_vac1-cov_vac2)/1000000)*100)/100} M`, value: `(${Math.round(((cov_vac1-cov_vac2)*100/eligible_population+Number.EPSILON)*10)/10}%)`,inline: true},{ name: `${Math.trunc(((cov_vac1-2*cov_vac2)/1000000)*100)/100} M`, value: `(${Math.round(((cov_vac1-2*cov_vac2)*100/eligible_population+Number.EPSILON)*10)/10}%)` ,inline: true}, { name: `${Math.trunc(((cov_vac2)/1000000)*100)/100} M`, value: `(${Math.round((cov_vac2*100/eligible_population+Number.EPSILON)*10)/10}%)` ,inline: true},
          { name: 'Last update', value: `${moment(today.parsedOnString).format('ll')} 1:00 PM`}],timestamp: new Date(),footer: { text: `${message.author.username}#${message.author.discriminator}`},}));
        }
        command();
    }
}