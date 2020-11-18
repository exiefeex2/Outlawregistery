const discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db');
const fs = require('fs');
const http = require('http');
const express = require('express');
const ayarlar = require('./ayarlar.json');
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client();

// ------------------------------ // 7/24 Kod // ------------------------------ //

client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  
 client.user.setActivity(`Outlaw Kayıt Sistemi`, { type:"WATCHING" })
  console.log("Bot Kullanıma Hazır!")
});

// ------------------------------ // 7/24 Kod // ------------------------------ //

const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
           reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

// ------------------------------ // Perm // ------------------------------ //

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

client.login(ayarlar.token)

// ------------------------------ // Perm // ------------------------------ //

client.on("ready", async message => {
  const channel = client.channels.get("707845499557904394");
  if (!channel) return console.error("Kanal 'ID' girilmemiş.");
  channel
    .join()
    .then(connection => {
      console.log("Başarıyla bağlanıldı.");
    })
    .catch(e => {
      console.error(e);
    });
});


// ------------------------------ // Komutlar // ------------------------------ //

client.on('guildMemberAdd', async member => {
  
await member.addRole(`698390820390305824`) 
  
let member2 = member.user 

let zaman = new Date().getTime() - member2.createdAt.getTime()

var user = member2 
var takizaman = [];
  
if(zaman < 604800000) {takizaman = '<a:guardreq:756593251816833125> Tehlikeli'} else {
  
takizaman = `<a:guardtik:756593251905044571> Güvenli`}
  
require("moment-duration-format");
  
let zaman1 = new Date().getTime() - user.createdAt.getTime()

const gecen = moment.duration(zaman1).format(` YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 

let dbayarfalanfilan = await db.fetch(`takidbayar${member.guild.id}`)
let message = member.guild.channels.find(x => x.id === `752678134377086986`)

const taki = new Discord.RichEmbed()
.setTitle("Outlaw'a Hoşgeldin")

.setDescription(`<a:tac:755429044555874445>**・** **Sunucumuza Hoşgeldin** ${member}
   
<a:anka_kusu:753884689043030076>**・Seninle Beraber** ${message.guild.memberCount} **Kişiyiz.**

<a:cisim:755427608409145414>**・** **Kaydının Yapılması İçin İsmini ve Yaşını Yaz.**

<a:ucankalpler:643106004258652160>**・**<@&643106004258652160> **Rolündeki Yetkililer Seninle İlgilenecektir.**

<a:zil:755427249531912313>**・** **Sunucumuzun Sınırsız Davet Bağlantısı** https://discord.gg/KPgKqWj


<a:yukleniyor:755427741062660116>**・** **Hesap Kuruluş Tarihi** ${gecen}
<a:emoji11:756592410515210260>**・** **Bu Kullanıcı** **|** **${takizaman}**`)

message.send(taki)
});