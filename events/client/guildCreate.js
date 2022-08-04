const chalk = require('chalk');

module.exports = async (client, guild) => {
  const user = await client.users.fetch(guild.ownerId);
  console.log(chalk.green(`[GUILD CREATED] Name: ${guild.name} | Members: ${guild.memberCount} | Owner: ${user.tag} | now in ${client.guilds.cache.size} servers`));
};
