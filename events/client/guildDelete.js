const chalk = require('chalk');

module.exports = async (client, guild) => {
    console.log(chalk.red(`[GUILD DELETED] Name: ${guild.name} | Members: ${guild.memberCount} |  now in ${client.guilds.cache.size} servers`));
};
