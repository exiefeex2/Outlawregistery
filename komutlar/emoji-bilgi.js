const Discord = require('discord.js');

exports.run = (client, message, args) => {
  
let emojiname = args[0];
  
const emoji = (message.guild.emojis.cache.find(x => x.name == `${emojiname}`))

if (!emojiname) return message.channel.send("Emoji ismi belirtmediniz")
  
const embed = new Discord.MessageEmbed()

.setColor("BLACK")

.setThumbnail(`${emoji.url}`)

.addField("Emoji İsmi", `${emojiname}`)
.addField("Emoji ID", `${emoji.id}`)
.addField("Emoji İndirme Linki", `${emoji.url}`)

message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['emojibilgi'],
    permLevel: 0
}
exports.help = {
    name: 'emoji-bilgi',
    description: 'Belirttiğiniz Emojinin bilgilerini gösterir.',
    usage: 'emoji-bilgi'
}