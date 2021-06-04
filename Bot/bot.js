const Discord = require("discord.js");

const client = new Discord.Client();

require("dotenv").config();

const prefix = process.env.PREFIX;

client.on("ready", () => {
  console.log(`${client.user.tag} Online!`);
});

client.on("message", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  if (command === "sug") {
    let sugChannel = msg.guild.channels.cache.get(""); //建議頻道 ID
    if (!sugChannel) {
      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("錯誤 找不到建議頻道❌")
        .setDescription(
          `\n找不到 **建議頻道** ,請聯絡 ${client.user} 擁有者來解決這個問題`
        );
      msg.channel.send(msg.author, embed);
      msg.delete({ timeout: 1000 * 4 }); //4s
      return;
    }
    let sug = args.join(" ");
    if (!sug.length) {
      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("錯誤 找不到建議信息❌")
        .setDescription("未知的指令用法\n" + "`" + "!sug (建議)" + "`");
      msg.channel.send(msg.author, embed).then((msg) => {
        msg.delete({ timeout: 1000 * 10 });
      });
      msg.delete({ timeout: 1000 * 4 }); //4s
      return;
    }
    let sugEmbed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setAuthor(msg.author.tag)
      .setDescription(`**建議:**\n${sug}`)
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .setFooter(msg.guild.name)
      .setTimestamp();
    sugChannel.send(sugEmbed).then((msg) => {
      msg.react("✅");
      msg.react("❌");
    });
    msg.channel.send("已傳送建議").then((msg) => {
      msg.delete({ timeout: 1000 * 30 }); //30s
    });
    msg.react("✅");
    msg.delete({ timeout: 1000 * 30 }); 
  }
});
//End 
client.login(process.env.TOKEN);
