const commandHandler = require('./utils/commandHandler')
const {REST, Routes} = require('discord.js')
const {token, appId} = require('../config.json')


const rest = new REST().setToken(token);


//reset all slash command
console.log("reseting slash commands...")
rest.put(
    Routes.applicationCommands(appId),
    { body: [] },
);

//=============switch to false to only clear command===============
if (true) {
//=================================================================

//load slash command
console.log("loading slash commands...");
let commands = commandHandler('slashCommands');

console.log(`launching ${commands.length} commands...`);

//launch application
//================================================================
let data = [];
//take only the data
    commands.forEach(element => {
    
    if (!element.test) {
        console.log(">",element.data.name)
        try {
            
            data.push(element.data.toJSON());
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("[TEST] not loading:",element.data.name)
    }
});

    try {
        rest.put(
            Routes.applicationCommands(appId),
            { body: data },
        );

        console.log("Done!");

    } catch (error) {
        console.log("[ERROR]: ",error)
    }
}