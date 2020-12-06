const Discord = require('discord.js');
const { v4: uuidv4 } = require('uuid');
module.exports = {
	name: 'poll',
  description: 'Poll System',
  usage: '<time> <question>',
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
          else if (countdown%3600==0) countdown_format=countdown_format=`${Math.floor(countdown/3600)}h`
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
          const filter = (reaction,user) => {return reaction.emoji.name};
          const collector = msg.createReactionCollector(filter, { time: countdown*1000-1,dispose: true })
          const votes=[];
          collector.on('collect', (reaction, reactionCollector) => {
            //do stuff
            const user_id=`${reactionCollector.username}#${reactionCollector.discriminator} (${reactionCollector.id})`;
            if (reactionCollector.id===msg.author.id)  return;
            if (reaction.emoji.name!=='✅' && reaction.emoji.name!=='❌' ) {reaction.users.remove(reactionCollector.id); return;}
            if (votes.includes(reactionCollector.id)) {reaction.users.remove(reactionCollector.id); vote_status='blocked'}
            else {votes.push(reactionCollector.id); vote_status='received'}
            console.log(`[Poll] Vote ${vote_status}: \nPoll ID: ${id}\nUser ID: ${user_id}\nTimestamp: ${Date.now()}`);
       });
      /* collector.on('remove',(reaction,reactionCollector) =>
       {
        console.log(reaction)
        index=votes.indexOf(reactionCollector.id);
        if (index > -1) {
          votes.splice(index, 1);
       }});*/
       collector.on('end', collected =>
       {
        let votes = Array.from(collected.entries());
        yes=votes[0][1]['count']-1;
        no=votes[1][1]['count']-1;
        let result="Draw";
        if (yes>no) {result = "✅"; color="#00FF00"}
        else if (yes==no) {result = "Draw"; color="FFF000"}
        else {result="❌"; color="#FF0000"}
        console.log(`[Poll] Poll finished: \nPoll ID: ${id} | Y: ${yes} | N: ${no} | result: ${result}`)
        const end = async () => {
        EmbedText = {title:`Poll`,color: color, description: `${poll}`, fields: [
          { name: 'Winner', value: `${result} (${yes} - ${no})`,inline: true },],
            timestamp: new Date(),footer: { text: `${message.author.username}#${message.author.discriminator}`},};
             Embed =  new Discord.MessageEmbed(EmbedText);}
             end().then(msg.edit(Embed)).then(msg.reactions.removeAll());
       })
           let timer = setInterval(() =>
            {
              if (countdown<=5) clearInterval(timer);
              countdown=countdown-1;
                    if ((countdown%5==0 && countdown<=60) || (countdown%60==0 && countdown>60 && countdown<=300)|| (countdown%300==0 && countdown>300 && countdown<=3600) ||(countdown%1800==0 && countdown > 3600))
               {
                 if (countdown<60) countdown_format=`${countdown}s`
                 else if (countdown<3600) countdown_format=`${Math.floor(countdown/60)}m`
                 else if (countdown%3600==0) countdown_format=countdown_format=`${Math.floor(countdown/3600)}h`
                 else  countdown_format=`${Math.floor(countdown/3600)}h ${Math.floor(countdown/60)-Math.floor(countdown/3600)*60}m`
                 
                 EmbedText = {title:`Poll`,color: '#fff000',description: `${poll}`, fields: [
                  { name: 'Yes', value: `✅`,inline: true },{name: "\u200B",value: '\u200B',inline: true},{name: "No",value: '❌',inline: true},],
                    timestamp: new Date(),footer: { text: `${countdown_format} | ${message.author.username}#${message.author.discriminator}`},};
                    Embed =  new Discord.MessageEmbed(EmbedText);
          msg.edit(Embed);
      }},1000)
    })}
     lol(args)}}