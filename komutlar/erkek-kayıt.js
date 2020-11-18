const Discord = require("discord.js");
const db = require('quick.db');

exports.run = (client, message, args) => {
  
var toplam = db.fetch(`toplamKayit_${message.author.id}`)
 
const erkek = message.guild.roles.cache.find(r => r.id === "698417266684854292",);
const erkek2 = message.guild.roles.cache.find(r => r.id === "725898930369331532",);
const misafir = message.guild.roles.cache.find(r => r.id === "698390820390305824"); 
const log = message.guild.channels.cache.find(c => c.id === "773298205101522985"); 
  
const tag = "";
  
if(!message.member.roles.cache.array().filter(r => r.id === "643106004258652160")[0]) { 
  
return message.channel.send("**Bu İşlemi Gerçekleştirmek İçin <@&643106004258652160> Yetkisinine Sahip Olmalısın!**");
} 

else {
  
let member = message.mentions.members.first();
if(!member) return message.channel.send("Bir Erkek Kullanıcıyı Etiketleyin.")
    
const nick = args[1];
const yas = args[2];
  
if(!nick) return message.channel.send("Bir İsim Girin.")
if(!yas) return message.channel.send("Bir Yaş Girin.")
  
member.roles.add(erkek)
  
member.roles.add(erkek2)  
  
member.roles.remove(misafir)
  
member.setNickname(`${nick} | ${yas}`)
  
db.add(`erkekKayit_${message.author.id}`, 1)
db.add(`toplamKayit_${message.author.id}`, 1)
  
const embed = new Discord.MessageEmbed()
    
.setAuthor("Bir Erkek Kullanıcının Kaydı Yapıldı.")
.setColor("Black")

.addField(`Kaydı Yapılan\n`, `${member.user.tag}`)
.addField(`Kaydı Yapan\n`, `${message.author.tag}`)
.addField(`Yeni İsimi\n`, `${nick} | ${yas}`)
.addField(`Toplam Kayıt\n`, toplam || 0)


.setFooter("Outlaw Kayıt Sistemi")
    
log.send(embed)
}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["adam","man","boy"],
  permLevel: 0
};
exports.help = {
  name: "erkek",
  description: "Erkek Kayıt İçin",
  usage: "erkek"
};
