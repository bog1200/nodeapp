const axios = require("axios");
const Discord = require("discord.js");
const main = require("../index.js")
module.exports = {
	name: 'pvc',
	description: 'PewDiePie vs CocoMelon subs count',
	execute(message, args) {
            message.delete();
            let pvt,winn,pew_subs,co_subs;
        axios.all([
            axios.get(`https://www.googleapis.com/youtube/v3/channels?id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&part=statistics&fields=items/statistics/subscriberCount&access_token=${main.g_token}`),
            axios.get(`https://www.googleapis.com/youtube/v3/channels?id=UCbCmjCuTUZos6Inko4u57UQ&part=statistics&fields=items/statistics/subscriberCount&access_token=${main.g_token}`)
          ]).then(axios.spread((response1, response2) => {
             pew_subs=response1.data.items[0].statistics.subscriberCount;
             co_subs=response2.data.items[0].statistics.subscriberCount;
          
            let diff=pew_subs-co_subs;
	        if (diff<0) {diff=co_subs-pew_subs;winn=1;}
            else winn=0;
            if (diff>1000000 || diff<-1000000) diff=(diff/1000000)+'M';
            pvt='PewDiePie e in fata CocoMelon cu '+diff+' abonati';
            if (winn==1) pvt='CocoMelon e in fata PewDiePie cu '+diff+' abonati'
            if (diff == -2) {console.log('!!!'); pvt="Data not avaliable!"}
            const Embed= new Discord.MessageEmbed(
            {title:"PewDiePie vs CocoMelon",color: '#ff0000', fields: [
            { name: 'PewDiePie', value: `${pew_subs/1000000} M` ,inline: true},{ name: '\u200B', value: '\u200B',inline: true},{name: 'CocoMelon', value: `${co_subs/1000000} M` ,inline: true},
            { name: 'Result', value: pvt ,inline: true},],timestamp: new Date(), footer: { text: `${message.author.username}#${message.author.discriminator}`},});
            message.channel.send(Embed).then(message => {
            message.delete({timeout: 15000});
             })
        }));
}};