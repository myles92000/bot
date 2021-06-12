//不想努力了#0001

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
    let sugChannel = msg.guild.channels.cache.get(""); //頻道 ID
    if (!sugChannel) {
      //找不到頻道
      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("錯誤 找不到建議頻道❌")
        .setDescription(
          `\n找不到 **建議頻道** ,請聯絡 ${client.user} 擁有者來解決這個問題`
        );
      msg.channel.send(msg.author, embed).then((msg) => {
        msg.delete({ timeout: 1000 * 8 }); //8s
      });
      msg.delete({ timeout: 1000 * 4 }); //4s
      return;
    }
    let sug = args.join(" ");
    if (!sug.length) {
      //使用者沒有輸入建議
      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("錯誤 找不到建議信息❌")
        .setDescription("未知的指令用法\n" + "`" + "!sug (建議)" + "`");
      msg.channel.send(msg.author, embed).then((msg) => {
        msg.delete({ timeout: 1000 * 8 }); //8s
      });
      msg.delete({ timeout: 1000 * 4 }); //4s
      return;
    }
    let sugEmbed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`**建議:**\n${sug}`)
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .setFooter(msg.guild.name)
      .setTimestamp();
    sugChannel.send(sugEmbed).then((msg) => {
      msg.react("✅");
      msg.react("❌");
    });
    msg.reply("已傳送建議").then((msg) => {
      msg.delete({ timeout: 1000 * 10 });
    });
    msg.react("✅");
    msg.delete({ timeout: 1000 * 7 });
    // let logChannel = msg.guild.channels.cache.find((ch) => ch.name === "log");
    //if (!logChannel) return;
    // logChannel.send(`New Suggest By ${msg.author}`)
  }
});

client.login(process.env.TOKEN);
