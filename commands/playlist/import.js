const chalk = require('chalk');
const { MessageEmbed, Permissions } = require('discord.js');
const Playlist = require('../../config/models/Playlist.js');

module.exports = { 
    config: {
        name: "import",
        aliases: ["load"],
		usage: "import <playlist name>",
        description: "Import a playlist to the queue",
        accessableby: "Member",
        category: "playlist",
    },
    run: async (client, message, args, user) => {
		console.log(chalk.magenta(`[COMMAND] Import used by ${message.author.tag} from ${message.guild.name}`));

		const { channel } = message.member.voice;
		if (!channel) return message.channel.send("You need to be in a voice channel to use command.");
		if (!channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.CONNECT)) return message.channel.send("I don't have permission to join your voice channel.");
		if (!channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SPEAK)) return message.channel.send("I don't have permission to speak in your voice channel.");

		try {
			if (user && user.isPremium) {
			if(!args[0]) return message.channel.send(`**Please specify a playlist name!**`);

		let player = client.manager.get(message.guild.id);
		if(!player) { player = await client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
        });

		const state = player.state;
        if (state != "CONNECTED") await player.connect();

		}

		const Plist = args.join(" ").replace(/_/g, ' ');
		const SongAdd = [];
		let SongLoad = 0;

		const playlist = await Playlist.findOne({ name: Plist });
		if(!playlist) return message.channel.send(`**Playlist \`${Plist}\` not found!**`);
		if(playlist.owner !== message.author.id) return message.channel.send(`**You are not the owner of \`${Plist}\`**`);

		const msg = await message.channel.send(`Importing a playlist to the queue...`);

		const embed = new MessageEmbed()
			.setDescription(`**Imported • \`${Plist}\`** (${playlist.tracks.length} tracks) • ${message.author}`)
			.setColor('#fcc700');

		msg.edit({ content: " ", embeds: [embed] });

		for (let i = 0; i < playlist.tracks.length; i++) {
			const res = await client.manager.search(playlist.tracks[i].uri, message.author);
			if(res.loadType != "NO_MATCHES") {
				if(res.loadType == "TRACK_LOADED") {
					SongAdd.push(res.tracks[0]);
					SongLoad++;
				}
				else if(res.loadType == "PLAYLIST_LOADED") {
					for (let t = 0; t < res.playlist.tracks.length; t++) {
						SongAdd.push(res.playlist.tracks[t]);
						SongLoad++;
					}
				}
				else if(res.loadType == "SEARCH_RESULT") {
					SongAdd.push(res.tracks[0]);
					SongLoad++;
				}
				else if(res.loadType == "LOAD_FAILED") {
					return message.channel.send("Error loading playlist.");
				}
			}
			else {
				return message.channel.send("Error loading playlist.");
			}

			if(SongLoad == playlist.tracks.length) {
				player.queue.add(SongAdd);
				if (!player.playing) { player.play(); }
			}
		}
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