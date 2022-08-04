const figlet = require('figlet');
const { PREFIX } = require('../../config.json');
const chalk = require('chalk');

module.exports = async (client) => {
  client.manager.init(client.user.id);
  figlet(client.user.tag, function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(chalk.red.bold(data));
  });

  let guilds = client.guilds.cache.size;
  let users = client.users.cache.size;
  let channels = client.channels.cache.size;
  const commands = client.slash.map(command => ({
    name: command.name || " ",
    description: command.description || " ",
    options: command.options || []
  }));
  await client.application.commands.set(commands);
  const activities = [
    `DIEING SOON..`,
    `IM GOING TO MISS YOU ALL`,
    `THANK YOU FOR USEING ME`,
    `ITS TIME TO SAY GOOD BYE `,
  ]

  setInterval(() => {
    client.user.setActivity(`${activities[Math.floor(Math.random() * activities.length)]}`, { type: 'WATCHING' });
  }, 15000)

};
