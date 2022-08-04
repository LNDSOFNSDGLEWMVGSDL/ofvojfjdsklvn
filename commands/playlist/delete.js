const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const Playlist = require('../../config/models/Playlist.js');

module.exports = { 
    config: {
        name: "delete",
        aliases: [],
        usage: "delete <playlist name>",
        description: "Delete a playlist",
        accessableby: "Member",
        category: "playlist",
    },
    run: async (client, message, args, user) => {
        console.log(chalk.magenta(`[COMMAND] Delete used by ${message.author.tag} from ${message.guild.name}`));

        try {
            if (user && user.isPremium) {
            if(!args[0]) return message.channel.send(`<a:loading:850828723988856902> **Please specify a playlist!**`);

        const Plist = args.join(" ").replace(/_/g, ' ');
        const playlist = await Playlist.findOne({ name: Plist });
        if(!playlist) return message.channel.send(`**Playlist \`${Plist}\` not found!**`);
        if(playlist.owner !== message.author.id) return message.channel.send(`**This is not your playlist!**`);

        await playlist.delete();

        const embed = new MessageEmbed()
            .setDescription(`**Deleted • \`${Plist}\`**`)
            .setColor('#fcc700');

        message.channel.send({ embeds: [embed] });
    } else {
        const Premiumed = new MessageEmbed()
            .setAuthor({ name: "Only Premium!", iconURL: client.user.displayAvatarURL() })
            .setDescription(`*You need to be a premium to use this command.*`)
            .setColor('#fcc700')
            .setTimestamp()

        return message.channel.send({ embeds: [Premiumed] });
        }
    } catch (err) {
        console.log(err)
        message.channel.send({ content: "Something went wrong, try again later." })
        }
    }
}; 