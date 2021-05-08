const Discord = require('discord.js');
const db = require("../utils/db");
module.exports = {
	name: 'settings',
	description: 'Change bot settings',
	execute(message, args) {
        const Embed=new Discord.MessageEmbed().setTitle('Settings').setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`);
        let sql=null;
        let query=true,perm=false;
        if (args[0]===undefined) {Embed.setColor('#FFFF00');query=false;
          if(message.member.hasPermission("MANAGE_GUILD")){Embed.addField('prefix {prefix}','Change bot prefix');perm=true;}
          if(message.member.hasPermission("MANAGE_CHANNELS"))
          {Embed.addField('cov id {channel1 channel2}','Set COV19 Cases Channels').addField('cov jud {channel county}','Set COV19 Cases County').addField('cov vac {channel}','Set COV19 Vaccines Channel').addField("cov {clear}","Clear COV19 Channels");perm=true;}}                                                                
        else if (args[0].toLowerCase()==='prefix' && message.member.hasPermission("MANAGE_GUILD"))  {sql=`UPDATE bot SET PREFIX = '${args[1].substring(0,1)}' WHERE bot.SERVERID = '${message.guild.id}'`; query=true;perm=true;Embed.setColor('#00ff00').setDescription(`Prefix set to ${args[1].substring(0,1)}`)}
        else if (args[0].toLowerCase()==='reset' && message.member.hasPermission("MANAGE_GUILD"))  {sql=`UPDATE bot SET PREFIX = '.',COVCHID = NULL ,COVNEWID = NULL, COVJUDID = NULL, COVJUD = NULL WHERE bot.SERVERID = '${message.guild.id}'`; query=true;perm=true;Embed.setColor('#00ff00').setDescription('Settings Cleared');}
        else if (args[0].toLowerCase()==='cov' && message.member.hasPermission("MANAGE_CHANNELS"))
          {if (args[1]=="clear") {sql=`UPDATE bot SET COVCHID = NULL ,COVNEWID = NULL, COVJUDID = NULL, COVJUD = NULL WHERE bot.SERVERID = '${message.guild.id}'`;query=true;perm=true; Embed.setColor('#00ff00').setDescription('Channels cleared');}
          else if (args[1]=="jud") {sql=`UPDATE bot SET  COVJUDID = '${args[2]}', COVJUD = '${args[3]}' WHERE bot.SERVERID = '${message.guild.id}'`;query=true;perm=true; Embed.setColor('#00ff00').setDescription(`COVID incidence for ${args[3]} set to ${args[2]}`);}
          else if (args[1]==='id')  {sql=`UPDATE bot SET COVCHID = '${args[2]}',COVNEWID = '${args[3]}' WHERE bot.SERVERID = '${message.guild.id}'`; query=true;perm=true;Embed.setColor('#00ff00').setDescription('COVID:').addField(`Total count set to:`, args[2], true).addField("\u200b","\u200b",true).addField(`Total new set to:`, args[3], true);}
          else if (args[1]==='vac')  {sql=`UPDATE bot SET COVVAC1ID = '${args[2]}',COVVAC2ID = '${args[3]}' WHERE bot.SERVERID = '${message.guild.id}'`; query=true;perm=true;Embed.setColor('#00ff00').setDescription(`COVID vaccines`).addField(`Dose 1 set to:`, args[2], true).addField("\u200b","\u200b",true).addField(`Dose 2 set to:`, args[3], true);}
        }
        if (perm==false) Embed.setColor('ff0000').setDescription('Wrong command or missing permissions');
        else if (query==true){
        db.query(sql, function (err, result) {
            if (err) console.error(err);});}
        message.channel.send(Embed)
        .catch(error => console.error(error));
    }
}