const { MessageEmbed} = require("discord.js");

module.exports = {
    config: {
        name: "membercount",
        aliases: ["mc", "mcount"],
        category: "utilities",
        description: "Use this command to get the guild members",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor("#8ef86a")
        .setAuthor({ name: "MEMBERS COUNT"})
        .setDescription(`**Now You Have**
        <:icons:1002121442470666250> ${message.guild.memberCount} members`)
        .setTimestamp()
        .setFooter({ text: `Made With Rays!! `});

      message.channel.send({ embeds: [embed]});

    }
}
