const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
const base45 = require('base45');
const zlib=require("zlib");
const cbor = require("cbor");
const moment = require("moment");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('decode')
		.setDescription('Decode COVID19 EU Certificate')
        .addStringOption(option => option.setName("certificate").setDescription("Green Pass to decode").setRequired(true)),
	async execute(interaction) {
	
        let code = interaction.options.getString("certificate");//substr(10).slice(0, -2);;
        if (code.substr(0,4)=="HC1:") code=code.substr(4);
        const b45encoded = base45.decode(code)
        zlib.inflate(b45encoded, (error, buffer) => {
            if (error) console.error(error);
            else{
            //console.log(buffer.toString("hex"));
            cbor.decodeAll(buffer, (error,obj) => {
                // error != null if there was an error
                // obj is the unpacked object
                if(error)console.error(error);
                const CBORinteraction=obj[0];
                const content = CBORinteraction.value[2];
                const rgbProtected=CBORinteraction.value[0];

                 cbor.decodeAll(content, (error, obj) =>
                 {
                     const certBasic=obj[0];
                     const certFull=Object.fromEntries(obj[0].get(-260))[1];
                     const time = Date.now();
                     const issued=certBasic.get(6)*1000;
                     const expires=certBasic.get(4)*1000;
                     let type,_type,partial;
                     if (certFull.v) {type=`VACCINATION`; _type="v";  if (certFull.v[0].dn == 1 && certFull.v[0].sd==2) partial=1;}
                     else if (certFull.t) {type="TEST"; _type="t";}
                     else if (certFull.r) {type="RECOVERY"; _type="r";}
                     else type="INVALID";
                    //  console.log(`Valid From:  ${moment(issued).format("HH:mm:ss DD.MM.YYYY")}`);
                    //  console.log(`Valid Until: ${moment(expires).format("HH:mm:ss DD.MM.YYYY")}`);
                    //  console.log(`Last Name: ${certFull.nam.fn}`); 
                    //  console.log(`First Name: ${certFull.nam.gn}`);
                     //console.log(`Type: ${type}`);
                    let doses;
                    if (_type=="v") doses=`Doses: ${certFull.v[0].dn}/${certFull.v[0].sd}`
                    else doses="\u200B";
                    let color;
                     if (time < issued || time > expires || type == "INVALID") {color="#ff0000"; valid="Invalid";}
                     else if (partial==1) {color="#ffff00", valid="Incomplete"}
                     else {color="#00ff00"; valid="Valid"}
                     const result = new MessageEmbed({title:`**EU Certificate Decoder**`,description: `${valid} Certificate Detected:`,color: color, thumbnail: {url: `https://www.countryflags.io/${certBasic.get(1)}/flat/64.png`},fields: 
                     [
                     { name: 'First name', value:  certFull.nam.gn ,inline: true},{name: 'Last Name', value: certFull.nam.fn ,inline: true},{ name: 'Date of Birth', value: certFull.dob ,inline: true},
                     { name: 'Type:', value: type ,inline: true},{ name: 'Valid From', value: moment(issued).format("HH:mm:ss DD.MM.YYYY"),inline: true},{ name: 'Valid Until ', value: moment(expires).format("HH:mm:ss DD.MM.YYYY") ,inline: true},
                     { name: 'Issued By', value: certFull[_type][0].is ,inline: true},{ name: 'Country', value: certBasic.get(1) ,inline: true},{ name: 'Serial Number ', value: certFull[_type][0].ci ,inline: true},
                     { name: doses, value: `More info about certificates: [here](https://reopen.europa.eu/en)` ,inline: true}],timestamp: new Date(), footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`}
                 });
                 interaction.reply({embeds: [result]});
                //const rgbUnprotected=CBORinteraction.value[1];
             });
         })}
    })
}}