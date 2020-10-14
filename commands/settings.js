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
        let sql;                                                                  
        if (args[0]==='prefix' && message.member.hasPermission("MANAGE_MESSAGES"))  {sql=`UPDATE bot SET PREFIX = '${args[1].substring(0,1)}' WHERE bot.SERVERID = '${message.guild.id}'`; Embed.setColor('#00ff00').setDescription(`Prefix set to ${args[1].substring(0,1)}`)}
        if (args[0]==='cov' && message.member.hasPermission("MANAGE_CHANNELS"))  {sql=`UPDATE bot SET COVCHID = '${args[1]}',COVNEWID = '${args[2]}' WHERE bot.SERVERID = '${message.guild.id}'`; Embed.setColor('#00ff00').setDescription('Setting Updated');}
        if (args[0]==='cov' && args[1]=="clear" && message.member.hasPermission("MANAGE_CHANNELS")) {sql=`UPDATE bot SET COVCHID = NULL ,COVNEWID = NULL WHERE bot.SERVERID = '${message.guild.id}'`; Embed.setColor('#00ff00').setDescription('Setting Updated');}
        if (sql=='') Embed.setColor('ffff00').setDescription('Wrong command or missing permissions');
        else{
        con.query(sql, function (err, result) {
            if (err) console.error(err);});}
        
        message.delete();
        message.channel.send(Embed)
        .then(msg => {
            msg.delete({ timeout: 7000 });
          })
        .catch(error => console.error(error));
    }
}