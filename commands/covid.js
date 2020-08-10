const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
	name: 'covid',
  description: 'Covid19',
  usage: '<country> [cooldown]',
	execute(message, args) {
        let countdown= 20;      
        async function lol(args)
        {
          try{
          if (args[1]!==undefined &&parseInt(args[1])!=='NaN'){countdown=parseInt(args[1]);}
          const response = await axios.get(`https://covid19-api.org/api/timeline/${args[0]}`);
          if (countdown>120)
          {
            countdown=120;
          }
          else if (countdown%5!=0)
          {
            countdown=Math.floor(args[1]/10)*10;
            if (args[1]%10>5) countdown=countdown+10;
          }
          const timeout=countdown*1000; 
          const data=response.data;
          let i=0;
          //console.log(`Timeout: ${timeout} | ${countdown} | ${args[1]}`);
          let cdf=0;
          do
          {
            i=i+1; 
            cdf=data[0]['cases']-data[i]['cases']
           
          }while (cdf==0);
          //cdf=(Object.entries(c_out[c_out.length-1])[7][1])-(Object.entries(c_out[c_out.length-2])[7][1]);
          //console.log(`CDATA: ${data}`);
          //const result=`${Object.entries(data[data.length-1])[7][1]}`;
          
          let EmbedText = {title:`Covid19 ${data[0]['country']}`,color: '#ff0000', fields: [{name: '\u200B',value:'**Cases:**'},
          { name: 'Today', value: data[0]['cases']-data[i]['cases'] ,inline: true},{name: 'Yesterday', value: data[i]['cases']-data[i+1]['cases'] ,inline: true},{ name: 'Last week', value: data[0]['cases']-data[i+6]['cases'] ,inline: true},
          { name: '2 Weeks', value: data[0]['cases']-data[i+13]['cases'] ,inline: true},{ name: '\u200B', value: '\u200B',inline: true},{ name: 'All Time', value: data[0]['cases'] ,inline: true},
          { name: '\u200B', value: '\u200B'},{name: '\u200B',value:'**Deaths:**'},
          { name: 'Today', value: data[0]['deaths']-data[i]['deaths'] ,inline: true},{ name: 'Last week', value: data[0]['deaths']-data[i+6]['deaths'] ,inline: true},{ name: 'All Time', value: data[0]['deaths'] ,inline: true},
          { name: '\u200B', value: '\u200B'},
          { name: 'Last update', value:  data[0]['last_update']}],timestamp: new Date(),footer: { text: `${countdown} | ${message.author.username}#${message.author.discriminator}`},};
        message.delete();
        let Embed = new Discord.MessageEmbed(EmbedText);
        setTimeout(() =>
        {
        message.channel.send(Embed)
        .then(msg => {
            let timer = setInterval(() =>
            {
              if (countdown<=5) clearInterval(timer);
              else {countdown=countdown-5;
            EmbedText= {title:`Covid19 ${data[0]['country']}`,color: '#ff0000', fields: [{name: '\u200B',value:'**Cases:**'},
          { name: 'Today', value: data[0]['cases']-data[i]['cases'] ,inline: true},{name: 'Yesterday', value: data[i]['cases']-data[i+1]['cases'] ,inline: true},{ name: 'Last week', value: data[0]['cases']-data[i+6]['cases'] ,inline: true},
          { name: '2 Weeks', value: data[0]['cases']-data[i+13]['cases'] ,inline: true},{ name: '\u200B', value: '\u200B',inline: true},{ name: 'All Time', value: data[0]['cases'] ,inline: true},
          { name: '\u200B', value: '\u200B'},{name: '\u200B',value:'**Deaths:**'},
          { name: 'Today', value: data[0]['deaths']-data[i]['deaths'] ,inline: true},{ name: 'Last week', value: data[0]['deaths']-data[i+6]['deaths'] ,inline: true},{ name: 'All Time', value: data[0]['deaths'] ,inline: true},
          { name: '\u200B', value: '\u200B'},
          { name: 'Last update', value:  data[0]['last_update']}],timestamp: new Date(), footer: { text: `${countdown} | ${message.author.username}#${message.author.discriminator}`},};
          Embed = new Discord.MessageEmbed(EmbedText);
          msg.edit(Embed);
       // console.log(`Time:${new Date()} | ${countdown}`)
      }
            },5000)
            msg.delete({ timeout: timeout });
          })
        .catch(error => console.error(error));
        },500)}
        catch(error)
        {
        console.error(error);
        }};
        console.log(`${args[0]}, ${args[0].length}, ${args[99]}`,);
        if(args[0].toUpperCase()!='UK'&& args[0].length==2 && args[99]==true && (typeof args[1]=='undefined'|| args[1]>5)) lol(args);
        else 
        {
            message.delete();
            const Embed= new Discord.MessageEmbed().setTitle("Error").setDescription("Invalid country or API not avaliable").setColor(`#ff0000`)
            .setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`);
            message.channel.send(Embed)
            .then(msg => {
                msg.delete({ timeout: 7000 });
              })
            .catch(error => console.err(error));
        }   
    }
}