const Discord = require('discord.js');
const mysql = require('mysql')
module.exports = {
	name: 'settings',
	description: 'Change bot settings',
	execute(message, args) {
        var con = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB
          });
        const Embed=new Discord.MessageEmbed().setTitle('Settings').setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`);
        let sql=null;
        let query=true,perm=false;
        if (args[0]===undefined) {Embed.setColor('#FFFF00');query=false;
          if(message.member.hasPermission("MANAGE_GUILD")){Embed.addField('prefix {prefix}','Change bot prefix');perm=true;}
          if(message.member.hasPermission("MANAGE_CHANNELS")){Embed.addField('cov {channel1 channel2} || {clear}','Change COV19 Channels').addField('cov jud {channel county}','Change COV19 County');perm=true;}}                                                                
        else if (args[0].toLowerCase()==='prefix' && message.member.hasPermission("MANAGE_GUILD"))  {sql=`UPDATE bot SET PREFIX = '${args[1].substring(0,1)}' WHERE bot.SERVERID = '${message.guild.id}'`; query=true;perm=true;Embed.setColor('#00ff00').setDescription(`Prefix set to ${args[1].substring(0,1)}`)}
        else if (args[0].toLowerCase()==='reset' && message.member.hasPermission("MANAGE_GUILD"))  {sql=`UPDATE bot SET PREFIX = '.',COVCHID = NULL ,COVNEWID = NULL, COVJUDID = NULL, COVJUD = NULL WHERE bot.SERVERID = '${message.guild.id}'`; query=true;perm=true;Embed.setColor('#00ff00').setDescription('Settings Cleared');}
        else if (args[0].toLowerCase()==='cov' && args[1]=="clear" && message.member.hasPermission("MANAGE_CHANNELS")) {sql=`UPDATE bot SET COVCHID = NULL ,COVNEWID = NULL, COVJUDID = NULL, COVJUD = NULL WHERE bot.SERVERID = '${message.guild.id}'`;query=true;perm=true; Embed.setColor('#00ff00').setDescription('Setting Updated');}
        else if (args[0].toLowerCase()==='cov' && args[1]=="jud" && message.member.hasPermission("MANAGE_CHANNELS")) {sql=`UPDATE bot SET  COVJUDID = '${args[2]}', COVJUD = '${args[3]}' WHERE bot.SERVERID = '${message.guild.id}'`;query=true;perm=true; Embed.setColor('#00ff00').setDescription('Setting Updated');}
        else if (args[0].toLowerCase()==='cov' && message.member.hasPermission("MANAGE_CHANNELS"))  {sql=`UPDATE bot SET COVCHID = '${args[1]}',COVNEWID = '${args[2]}' WHERE bot.SERVERID = '${message.guild.id}'`; query=true;perm=true;Embed.setColor('#00ff00').setDescription('Setting Updated');}
        if (perm==false) Embed.setColor('ff0000').setDescription('Wrong command or missing permissions');
        else if (query==true){
        con.query(sql, function (err, result) {
            if (err) console.error(err);});}
        
        message.delete();
        message.channel.send(Embed)
        .then(msg => {
            msg.delete({ timeout: 15000 });
          })
        .catch(error => console.error(error));
    }
}