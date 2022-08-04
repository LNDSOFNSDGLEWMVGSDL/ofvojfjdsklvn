const { MessageEmbed} = require("discord.js");

module.exports = {
    config: {
        name: "invite",
        aliases: ["i", "inv"],
        category: "utilities",
        description: "invte ray music in your server now!!",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor("#ffa700")
        .setAuthor({ name: "INVITE"})
        .setDescription(` **invite me in your dream server**
        
        > • [Click here to invite Ray](https://discord.com/api/oauth2/authorize?client_id=994264628240592896&permissions=8&scope=bot%20applications.commands)
        > • [Click here to join my fam](https://discord.gg/sgH6AuzbdQ)
        > • [Click here to know about me](https://youtube.com/channel/UCsRlzN91oIwU-MDjqMD6H3g) `)
        .setTimestamp()
        .setFooter({ text: `Made With Rays | Thank You For Useing Me! `});

      message.channel.send({ embeds: [embed]});

    }
}
