const { OWNER_ID } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = async (client, interaction) => {
  if (interaction.isSelectMenu() && ['filters', 'music', 'utilities', 'playlist'].includes(interaction.values[0])) {
    if (interaction.values[0] == 'filters') {
      let embed = new MessageEmbed()
        .setColor('cyan')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .addFields({
          name: 'Filters',
          value: client.commands.filter(c => c.config.category == "filters").map(c => `\`${c.config.name}\``).join(', ')
        })
      interaction.reply({
        embeds: [embed],
        ephemeral: true
      }).catch(e => {
        return;
      })
    }
    if (interaction.values[0] == 'music') {
      let embed = new MessageEmbed()
        .setColor('cyan')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .addFields({
          name: 'Music',
          value: client.commands.filter(c => c.config.category == "music").map(c => `\`${c.config.name}\``).join(', ')
        })
      interaction.reply({
        embeds: [embed],
        ephemeral: true
      }).catch(e => {
        return;
      })
    }
    if (interaction.values[0] == 'utilities') {
      let embed = new MessageEmbed()
        .setColor('cyan')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .addFields({
          name: 'Utilities',
          value: client.commands.filter(c => c.config.category == "utilities").map(c => `\`${c.config.name}\``).join(', ')
        })
      interaction.reply({
        embeds: [embed],
        ephemeral: true
      }).catch(e => {
        return;
      })
    }
    if (interaction.values[0] == 'playlist') {
      let embed = new MessageEmbed()
        .setColor('cyan')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .addFields({
          name: 'Playlist',
          value: client.commands.filter(c => c.config.category == "playlist").map(c => `\`${c.config.name}\``).join(', ')
        })
      interaction.reply({
        embeds: [embed],
        ephemeral: true
      }).catch(e => {
        return;
      })
    }
    if (interaction.values[0] == 'settings') {
      let embed = new MessageEmbed()
        .setColor('cyan')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .addFields({
          name: 'Settings',
          value: client.commands.filter(c => c.config.category == "settings").map(c => `\`${c.config.name}\``).join(', ')
        })
      interaction.reply({
        embeds: [embed],
        ephemeral: true
      }).catch(e => {
        return;
      })
    }
    
  }
  if (interaction.isCommand()) {
    if (!client.slash.has(interaction.commandName)) return;
    if (!interaction.guild) return;
    const command = client.slash.get(interaction.commandName);
    if (!command) return;

    try {
      if (command.userPerms) {
        if (!interaction.member.permissions.has(command.userPerms)) {
          return interaction.editReply({ content: `You don't have perm ${command.userPerms} to use this command!` });
        }
      }
      if (command.botPerms) {
        if (!interaction.guild.me.permissions.has(command.botPerms)) {
          return interaction.editReply({ content: `I don't have perm ${command.botPerms} to use this command!` });
        }
      }

      if (command.ownerOnly) {
        if (interaction.user.id !== OWNER_ID) {
          return interaction.editReply({ content: "You not owner the bot can't use this command!" });
        }
      }
      command.run(interaction, client);

    } catch (e) {
      console.log(e)
      await interaction.editReply({ content: "Something went wrong!", ephemeral: true });
    }
  }
}