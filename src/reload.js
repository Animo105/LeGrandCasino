//run node src/reload.js to reload commandes

const registerSlashCommand = require("./utils/registerSlashCommand")
const commandHandler = require('./utils/commandHandler')

console.clear()
//clear all slash command, to do when a probleme, juste switch the false to a true and switch it back afterward
if (false) {
    console.log("Reseting commands...");
    registerSlashCommand([])
}


else {
    console.log("loading slash commandes...");
let commands = commandHandler('slashCommands');

console.log(`refreshing ${commands.length} commands...`);

registerSlashCommand(commands)
}
