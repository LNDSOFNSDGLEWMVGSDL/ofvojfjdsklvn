const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    config: {
        name: "botinfo",
        aliases: ["info", "bi"],
        category: "utilities",
        description: "About RAY MUSIC Bot",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor("#ffa700")
        .setAuthor({ name: "About"})
        .setDescription(`<a:ch_music:1000628297983602688> **A Magical Music Bot** <a:ch_music:1000628297983602688>
        
        __**Ray Music**__
        
        > • **Online Since:** 1 day 30 min 
        > • **Servers:** ${client.guilds.cache.size}
        > • **Commands:** ${client.commands.size}
        > • **Requested by:** ${message.author.tag}
        
        __**Developers**__
        
         • <@992403878425411745>
         • <@861871469235273768>
         • <@601487810720956416>
        
        **Thank You For Useing Me** <:hearts:1001844514434060369>`)
        .setTimestamp()
        .setFooter({ text: `Made With Rays | Thank you All For Supporting Me `});

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Invite")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot%20applications.commands`)
                    .setEmoji("<:iconAdd:1001825953477050368>")
                    .setStyle("LINK")
            )
      .addComponents(
                new MessageButton()
                    .setLabel("Support")
                    .setURL(`https://discord.gg/sgH6AuzbdQ`)
                    .setEmoji("<:icons_Discord:1001841035724456017>")
                    .setStyle("LINK")
            )
      

        message.channel.send({ embeds: [embed], components: [row] });
      
    }
}
