const { MessageEmbed} = require("discord.js");

module.exports = {
    config: {
        name: "ping",
        aliases: ["pig"],
        category: "settings",
        description: "bot ping!!",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor("#36393e")
        .setAuthor({ name: "BOT PING"})
        .setDescription(`**Bot current ping is:** 
        <:icons_goodping:1001399620167016508> ${Math.round(client.ws.ping)}ms`)
        .setTimestamp()
        .setFooter({ text: `made with rays `});

        
        message.channel.send({ embeds: [embed]});
    }
}
