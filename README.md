# 🤖 NodeBot (Discord Bot)
> NodeBot is a Discord Multipurpose bot built with [discord.js](https://discord.js.org/)
## Requirements

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. Node.js v16.0.0 or newer
3. (Optional) YouTube Data API v3 Key (some commands will not work without this)



## 🚀 Getting Started
```
git clone https://github.com/bog1200/nodeapp.git
cd nodeapp
npm install
```

After installation finishes you can use `node index.js` to start the bot.

## ⚙️ Configuration

Create a file named `.env` and fill out the values:

⚠️ **Note: Never commit or share your token or api keys publicly** ⚠️

```env
DISCORD_KEY=
#VALID VALUES FOR DATABASE_TYPE: mysql, sqlite 
DATABASE_TYPE=
```

> [Aditional requirements for MySQL](https://github.com/Bog12555/nodeapp/wiki/Aditional-MySQL-requirements)

## 📝 Features & Commands

> Note: The default prefix is '.'

* 🎶 Play music from YouTube via url or search query

```
.play https://www.youtube.com/watch?v=fJ9rUzIMcZQ
.play bohemian rhapsody
```
* 🎶 Control played music
```
.skip  (Skip to next song in queue)
.stop  (Stop playing and clear the queue)
```

---
* 🔎 Find youtube channel subscriber count

```
.subs PewDiePie
```
> Note: The commands above require a GCP service account with access to YouTube Data API v3 [**[Guide](https://cloud.google.com/docs/authentication)**,**[Guide](https://developers.google.com/youtube/v3/getting-started)**]

> The credentials file MUST be saved as privatekey.json
---
* 😷 Find data about COVID-19 cases around the world
```
.covid RO
.incidence IF (Only available for Romania counties)
```

---
*  💬 Delete messages in bulk
```
.delete 45
```

---
* 📊 Create a poll
```
.poll 1h Question?
```
<details>
<summary>Poll</summary>
<img src=https://i.imgur.com/Mlyao2p.png>
</details>

---
🎲 Roll a dice with customizable number of sides
```
.roll 6
```

---
**And much more coming soon...**
