const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { PREFIX } = require("../../config.json");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const chalk = require("chalk");

module.exports = {
  config: {
    name: "help",
    aliases: ["h", "halp", "commands"],
    usage: "(command)",
    category: "utilities",
    description: "Displays all commands that the bot has.",
    accessableby: "Members"
  },
  run: async (client, message, args) => {
    console.log(chalk.magenta(`[COMMAND] Help used by ${message.author.tag} from ${message.guild.name}`));
    const embed = new MessageEmbed()
      .setColor('#000001')
      .setAuthor({ name: `${message.guild.me.displayName} Help Command!`, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
      .setColor('cyan')
      .setImage('https://cdn.discordapp.com/attachments/994841199187865621/1001374532403216494/1657006956103_f24d630690a1c989554e73865673c66f.gif');

    if (!args[0]) {
      const categories = readdirSync("./commands/");

      embed.setDescription(`The bot prefix is: **${PREFIX}**
**[Invite Me](https://discord.com/api/oauth2/authorize?client_id=994264628240592896&permissions=8&scope=bot%20applications.commands)** | **[Support](https://discord.gg/hfwnNQRxk9)**

**Come And Vibe With Meee...**

> *Best discord music bot with some magical music commands...!!!*`)
      embed.setFooter({ text: `© ${message.guild.me.displayName} | Total Commands: ${client.commands.size}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
      categories.forEach(category => {
        let emoji = '';
        if (category == 'filters') emoji = '<:icons_kk:1002075028411662406>';
        if (category == 'music') emoji = '<:icons_Music:1001399320240730112>';
        if (category == 'utilities') emoji = '<:icon_bulb:1001399777168211978>';
        if (category == 'playlist') emoji = '<:icons_list:1001400069427306596>';
        if (category == 'settings') emoji = '<:icons_list:1001400069427306596>';
        try {
          embed.addField(`${emoji} ${category}:`, ` ${category} commands`)
        } catch (e) {
          console.log(e)
        }
      })
      let categoryList = [];

      for (const category of categories) {
        const dir = client.commands.filter(c => c.config.category === category)
        categoryList.push({
          label: category.slice(0, 1).toUpperCase() + category.slice(1),
          value: category
        });
      }

      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('Select An Category')
          .addOptions(categoryList)
      )

      await message.channel.send({ embeds: [embed], components: [row], fetchReply: true })
    } else {
      let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
      if (!command) return message.channel.send({ embeds: [embed.setTitle("Invalid Command.").setDescription(`Do \`${PREFIX}help\` for the list of the commands.`)] })
      command = command.config

      embed.setDescription(stripIndents`The client's prefix is: \`${PREFIX}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description provided."}
            **Usage:** ${command.usage ? `\`${PREFIX}${command.name} ${command.usage}\`` : "No Usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

      return message.channel.send({ embeds: [embed] })
    }
  }
}
