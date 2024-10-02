//node src pour launch le bot


//les différentes fonctions
const commandHandler = require('./utils/commandHandler') //s'occupe de loader toutes les commandes
const { token, botId, prefix} = require('../config.json') //variable de la config, caché de github

//prend les chose de discord.js qu'il faut pour mon code
const { Client, Events, IntentsBitField } = require('discord.js')
const emojiLoader = require('./utils/emojiLoader')



//crée le client et call les intents
const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
    ]
})
//load des trucs
console.clear()
//===========================================================================================================
console.log("Starting loading...")
client.chatCommands = commandHandler('commands'); // load tout les commands dans le client
client.slashCommands = commandHandler('slashCommands'); // load tout les slash commands dans le client

client.checkperm = require('./utils/checkperm'); //check si l'auteur est admins (liste dans config)
client.checkAccount = require('./utils/loaddata');
client.saveData = require('./utils/savedata');
client.game = false; //store la variable game. quand un jeux est en cours de route, met la variable a true.

//===========================================================================================================
client.on('ready', async (c) => {
    client.customEmojis = await emojiLoader(client); //fetch all important emojis
    console.log(`${c.user.tag} is online.`);
});

//sur event
client.on(Events.InteractionCreate, interaction => {
    
    for (const element of client.slashCommands) {
        if (interaction.commandName === element.data.name) {
            //regarde si c'est delete
            if (!element.disabled){
                //execute la commande
                console.log(`\n[SLASH] executing : ${element.data.name} (by : ${interaction.user.displayName})`);
                element.execute(interaction, client);
            }
        }
    }
});


//quand il vois un message
client.on('messageCreate', (msg) => {

    //check si le message commence avec le préfix
    if (msg.content.startsWith(prefix)) {

        //si le bot a pas les perm return
        if (!msg.guild.members.me.permissionsIn(msg.channelId).has('SendMessages')){
            console.log(`no permission to write in : ${msg.channel.name}`);
            return;
        }
        
        else {
            //retir le suffix
            const command = msg.content.slice(prefix.length).trim().split (" ");
            for (const element of client.chatCommands) {
                if (command[0] === element.name) {
                    //regarde si c'est delete
                    if (!element.disabled){
                        //execute la commande
                        console.log(`\n executing : ${command[0]} (by : ${msg.author.globalName})`); 
                        element.execute(msg,client);
                    }
                    else {
                        msg.reply(":warning: command disabled :warning:")
                    }
                }
            }
        }
    }
});

client.login(token);