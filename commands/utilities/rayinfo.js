const { MessageEmbed} = require("discord.js");

module.exports = {
    config: {
        name: "rayinfo",
        aliases: ["ri", "ray", "team"],
        category: "utilities",
        description: "bot ping!!",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor("#ffa700")
        .setAuthor({ name: "Ray Muisc"})
        .setDescription(`<:GC_icon_members:1001852260076224554> __**Ray Team**__ <:GC_icon_members:1001852260076224554>

        <:developer:1001853011674538054> **Developers** 

        > <@972461778309111878>
        > <@861871469235273768>
        > <@601487810720956416>

        <:icon_owner:1001853116825735300> **Owners**
        
        > <@747265521384292393>
        > <@949942648343502908>

        <:hearts:1001844514434060369> *Thank you all those who are motivating us and supporting us a lot* `)
        .setTimestamp()
        .setFooter({ text: `Made With Rays | Thank You For Useing Me! `});

        
        message.channel.send({ embeds: [embed]});
    }
}

