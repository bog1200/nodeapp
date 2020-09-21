const axios = require("axios");
const Discord = require("discord.js")
module.exports = {
	name: 'pvt',
	description: 'PewDiePie vs T-Series subs count',
	execute(message, args, google_token) {
            let pvt,winn,pew_subs,tsr_subs;
        axios.all([
            axios.get(`https://www.googleapis.com/youtube/v3/channels?id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&part=statistics&fields=items/statistics/subscriberCount&access_token=${google_token}`),
            axios.get(`https://www.googleapis.com/youtube/v3/channels?id=UCq-Fj5jknLsUf-MWSy4_brA&part=statistics&fields=items/statistics/subscriberCount&access_token=${google_token}`)
          ]).then(axios.spread((response1, response2, ) => {
             pew_subs=response1.data.items[0].statistics.subscriberCount;
             tsr_subs=response2.data.items[0].statistics.subscriberCount;
          
            let diff=pew_subs-tsr_subs;
	        if (diff<0) {diff=tsr_subs-pew_subs;winn=1;}
            else winn=0;
            console.log(`${pew_subs} | ${tsr_subs}`);
            if (diff>1000000 || diff<-1000000) diff=(diff/1000000)+'M';
            pvt='PewDiePie e in fata T-Series cu '+diff+' abonati';
            if (winn==1) pvt='T-Series e in fata PewDiePie cu '+diff+' abonati'
            if (diff == -2) {console.log('!!!'); pvt="Data not avaliable!"}
            const Embed= new Discord.MessageEmbed(
            {title:"PewDiePie vs T-Series",color: '#ff0000', fields: [
            { name: 'PewDiePie', value: `${pew_subs/1000000} M` ,inline: true},{ name: '\u200B', value: '\u200B',inline: true},{name: 'T-Series', value: `${tsr_subs/1000000} M` ,inline: true},
            { name: 'Result', value: pvt ,inline: true},],timestamp: new Date(), footer: { text: `${message.author.username}#${message.author.discriminator}`},});
            message.channel.send(Embed).then(message => {
              console.log(pvt);
            message.delete({timeout: 15000});
             })
        }));
}};