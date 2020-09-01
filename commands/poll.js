const Discord = require('discord.js');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
module.exports = {
	name: 'poll',
  description: 'Poll System',
  usage: '<time> <question> <option1> <option2> [option3]',
	execute(message, args) {
    let countdown=30;
    let length=args.length;
    if (args[0].slice(-1).toLowerCase()==='s')  countdown= args[0].substring(0,2);
    else if (args[0].slice(-1).toLowerCase()==='m') countdown=parseInt(args[0].substring(0,2))*60;
    else if (args[0].slice(-1).toLowerCase()==='h') countdown=parseInt(args[0].substring(0,2))*3600;
    else {
      let Embed= new Discord.MessageEmbed().setTitle("Error").setColor("#ff0000").setDescription("Invalid arguments").setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`)
      message.channel.send(Embed);
      return;
    }
       // let test=message.content;
        //console.log(test);
        let poll="";
        for (let i=1; i<length;i=i+1)
        {
          poll+=(args[i])+' ';
        }
        const id=uuidv4();
        let yes=0;
        let no=0;
        let countdown_format;      
        async function lol(args)
        {
          if (countdown<60) countdown_format=`${countdown}s`
          else if (countdown<3600) countdown_format=`${Math.floor(countdown/60)}m`
          else countdown_format=countdown_format=`${Math.floor(countdown/3600)}h ${Math.floor(countdown/60)-Math.floor(countdown/3600)*60}m`
          console.log(`[Poll] Poll started: \nPoll ID: ${id} | time: ${countdown_format}`);
          let EmbedText = {title:`Poll`,color: '#fff000',description: `${poll}`, fields: [
            { name: 'Yes', value: `✅`,inline: true },{name: "\u200B",value: '\u200B',inline: true},{name: "No",value: '❌',inline: true},],
          timestamp: new Date(),footer: { text: `${countdown_format} | ${message.author.username}#${message.author.discriminator}`},};
        message.delete();
        let Embed = new Discord.MessageEmbed(EmbedText);
      message.channel.send(Embed)
        .then(msg => {
          msg.react('✅')
          .then(() => msg.react('❌'))
          const filter = (reaction,user) => {return ['✅','❌'].includes(reaction.emoji.name)&& user.id != msg.author.id};
          const collector = msg.createReactionCollector(filter, { time: countdown*1000-1})
          collector.on('collect', (reaction, reactionCollector) => {
            //do stuff
            const user_id=`${reactionCollector.username}#${reactionCollector.discriminator} (${reactionCollector.id})`;
            //console.log(reactionCollector);
            console.log(`[Poll] Vote received: \nPoll ID: ${id}\nUser ID: ${user_id}\nVote: ${reaction.emoji.name}`);
            //console.log(input.emoji.name)
            if (reaction.emoji.name ==="✅") yes=yes+1;
            if (reaction.emoji.name==="❌") no=no+1
       });
       setTimeout(() => {
        let result="Draw";
        if (yes>no) {result = "✅"; color="#00FF00"}
        else if (yes==no) {result = "Draw"; color="FFF00"}
        else {result="❌"; color="#FF0000"}
        console.log(`[Poll] Poll finished: \nPoll ID: ${id} | Y: ${yes} | N: ${no} | result: ${result}`)
        EmbedText = {title:`Poll`,color: color,description: `${poll}`, fields: [
          { name: 'Winner', value: `${result}`,inline: true },],
            timestamp: new Date(),footer: { text: `${message.author.username}#${message.author.discriminator}`},};
            Embed = new Discord.MessageEmbed(EmbedText);
        msg.edit(Embed)
        msg.reactions.removeAll();
        console.log(msg.reactions);
      },countdown*1000);
    
  

           let timer = setInterval(() =>
            {
              if (countdown<=5) clearInterval(timer);
              countdown=countdown-1;
              if ((countdown%5==0 && countdown<=60) || (countdown%60==0 && countdown>60 && countdown<=300)|| (countdown%300==0 && countdown>300))
               {
                 if (countdown<60) countdown_format=`${countdown}s`
                 else if (countdown<3600) countdown_format=`${Math.floor(countdown/60)}m`
                 else countdown_format=countdown_format=`${Math.floor(countdown/3600)}h ${Math.floor(countdown/60)-Math.floor(countdown/3600)*60}m`
                 EmbedText = {title:`Poll`,color: '#fff000',description: `${poll}`, fields: [
                  { name: 'Yes', value: `✅`,inline: true },{name: "\u200B",value: '\u200B',inline: true},{name: "No",value: '❌',inline: true},],
                    timestamp: new Date(),footer: { text: `${countdown_format} | ${message.author.username}#${message.author.discriminator}`},};
          Embed = new Discord.MessageEmbed(EmbedText);
          msg.edit(Embed);
       // console.log(`Time:${new Date()} | ${countdown}`)
      }
            
            
            
          },1000)
      
    }
        );}
     lol(args);
}}
