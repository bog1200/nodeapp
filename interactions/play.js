const ytdl = require("ytdl-core");
const axios = require('axios');
const queue = new Map();
const fs = require("fs");
const {spotifyApi} = require("../utils/spotify");

const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { MessageEmbed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play music from YouTube')
    .addStringOption(option => option.setName("song").setDescription("The name or url of the song").setRequired(true)),
	async execute(interaction) {
    const {g_token}= require("../utils/google")
    await interaction.deferReply();
        async function google (title)
        {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${title}&access_token=${g_token}`)
        console.log(`[Bot] Playing music: [${decodeURI(title)}] -> ${response.data.items[0].id.videoId}`);
          return `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}`;
        }

        async function runCommand()
        {
          let player;
         if (AudioPlayerStatus.Idle) {player = createAudioPlayer();}
            let serverQueue = queue.get(interaction.guild.id);
            const song_input=interaction.options.getString('song');
          
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel)
              return interaction.editReply(
                "You need to be in a voice channel to play music!"
              );
            const permissions = voiceChannel.permissionsFor(interaction.client.user);
            if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
              return interaction.editReply(
                "I need the permissions to join and speak in your voice channel!"
              );
            }
           
            let songInfo;
            if (song_input.match(/[\bhttps://open.\b]*spotify[\b.com\b]*[/:]*track[/:]*[A-Za-z0-9?=]+/))
            {
              const {body} = await spotifyApi.getTrack(song_input.slice(31,53));
              const sp_nam= await google(encodeURI(`${body.name} ${body.artists[0].name}`));
              songInfo = await ytdl.getInfo(sp_nam);
              
              }   
             else if (!(song_input.startsWith("https://"))) {
              
             const googleparse= await google(song_input);
            songInfo = await ytdl.getInfo(googleparse);
            }
            else  {songInfo = await ytdl.getInfo(song_input)}
            const song = {
              title: songInfo.videoDetails.title,
              url: songInfo.videoDetails.video_url,
              thumbnail: songInfo.videoDetails.thumbnails[2]
            };

            const connection = joinVoiceChannel({
              channelId: voiceChannel.id,
              guildId: interaction.guild.id,
              adapterCreator: interaction.guild.voiceAdapterCreator,
          });
          
            if (!serverQueue) {
              const queueContruct = {
                textChannel: interaction.channel,
                voiceChannel: voiceChannel,
                player: player,
                connection: connection,
                songs: [],
              };
              connection.subscribe(player);
              queue.set(interaction.guild.id, queueContruct);
          
              queueContruct.songs.push(song);
              player.play(createAudioResource(ytdl(queueContruct.songs[0].url, {filter: 'audioonly',quality: 'lowestaudio',highWaterMark: 1<<25})));
            }
            else {
              serverQueue.songs.push(song);
            }
            interaction.editReply({embeds: [new MessageEmbed({title: song.title ,color: '#00ff00', url: song.url, thumbnail: song.thumbnail ,fields: [
              { name: '\u200b', value: `Song added to queue`,inline: true }],
            timestamp: new Date(),footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`},}) ]
          });

          player.on(AudioPlayerStatus.Idle, () =>{
             serverQueue = queue.get(interaction.guild.id);
            if (serverQueue.songs[1])
            {     serverQueue.songs.shift();
                  player.play(createAudioResource(ytdl(serverQueue.songs[0].url,{filter: 'audioonly',quality: 'lowestaudio',highWaterMark: 1<<25})));
                
            }
            else 
            {
		        player.stop();
 		        connection.destroy();
            queue.delete(interaction.guild.id);
            }
          })

          player.on('error', error => {
            console.error(`${error}`);})
        }

          async function load()
          {   
              if(g_token) await runCommand();
              else interaction.editReply("Music command is not available");
             
          }
          load();
    }
}
module.exports.queue = queue;
