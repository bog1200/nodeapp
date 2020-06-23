const totp = require('totp-generator');
const crypto = require('crypto');
const Discord = require('discord.js');
module.exports = {
	name: 'validate',
	description: 'Validate totp code',
	execute(message, args) {
		var result;
		const secret = crypto.createHash('md5').update(`${message.author.username}#${message.author.discriminator}`).digest("hex").toUpperCase().replace(/([0189])+/g, '').substr(0,8);
		const token = totp(secret);
		const testtoken = totp('JRHUYT2M');
		if (args[0]=== token || args[0]===testtoken) result = `OK`;
		else result = `NOK`;

		const Embed=new Discord.MessageEmbed().setTitle('TOTP Authentification').setTimestamp().setFooter(`${message.author.username}#${message.author.discriminator}`);
		if (args[0]==='generator')
		{
			Embed.setDescription('[Token Generator](https://totp.danhersam.com/)');
		}

		else if (args[0]==='token')
		{
		Embed.setColor('#ff00ff')
		.setImage(`https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=200x200&chld=M|0&cht=qr&chl=otpauth://totp/Romail.ml?secret=${secret}`)
		.addField(`Scan the QR code or use the following code:`,`${secret}`)
		.addField('Do not share this code!','This message will dissappear in 30s!');
		}
		else if (args[0]==='test' && args[1]===undefined)
		{
		Embed.setColor('#ff00ff')
		.setImage(`https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=200x200&chld=M|0&cht=qr&chl=otpauth://totp/Romail.ml?secret=JRHUYT2M`)
		.addField(`Scan the QR code or use the following code:`,`JRHUYT2M`)
		.addField('This is a test message!','This message will dissappear in 30s!');
		}
		
		else if (result ==='OK')
		{
			if (args[0]===testtoken) {Embed.setColor('#2EF429').setDescription('Test Code Accepted!')}
			else {Embed.setColor('#2EF429').setDescription('Code Accepted!')}
			console.log(`${message.author.username}#${message.author.discriminator}: ${args[0]} => ${result}`);
		}
		else {
			Embed.setColor('#FF0000').setDescription('Invalid Code!')
			console.log(`${message.author.username}#${message.author.discriminator}: ${args[0]} => ${result}`);
		}
        message.delete();
		if (!(args[0]==='token'||args[0]==='test'))
		{message.channel.send(Embed)
        .then(msg => {
            msg.delete({ timeout: 7000 });
          })
		.catch(error => console.err(error));}
		else
		{
			message.author.send(Embed)
			.then(msg => {
				msg.delete({ timeout: 30000 });
			  })
			.catch(error => console.err(error));}
		}
    }

