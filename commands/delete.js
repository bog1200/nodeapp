const Discord = require('discord.js');
module.exports = {
	name: 'delete',
	description: 'Delete Messages',
	execute(message, args) {
        const Embed = new Discord.MessageEmbed().setTitle("Delete Messages").setTimestamp()
        .setFooter(`${message.author.username}#${message.author.discriminator}` );
        const count = parseInt(args[0]);
        if (isNaN(count) || count<=0 || count >99) 
        {Embed.setDescription("Invalid Number").setColor("#ff0000")
        message.delete();}
        else if (message.member.hasPermission("MANAGE_MESSAGES"))
           {
           message.channel.bulkDelete(count+1);	
        Embed.setDescription(`${count} messages deleted`).setColor("#0f3c6c");
            }
        else {Embed.setDescription("You do not have permission to use this command!").setColor("#ff0000");}
        message.channel.send(Embed)
        .then(msg => {
            msg.delete({ timeout: 7000 });
          })
        .catch(error => console.err(error));     
        }   
	}