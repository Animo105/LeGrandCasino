const { EmbedBuilder } = require("discord.js")
const {prefix} = require('./../../../config.json')


module.exports = () => {

    let embed = new EmbedBuilder().setTitle("Need help?")
    .setDescription(
        "# <:card:1291548391884460042> __WELCOME TO THE GRAND CASINO__ <:card:1291548391884460042> \n"
        +"Welcome to the grand casino. You can do **/info** to see multiple information about your account.\n"
        +"Using the arrow below, you can see information about what machine we have at our casino.\n\n"
        +"The majority of commands is done through / commands. To see the others commands do **"+prefix+"list** to see a full list of the none slash commands."
    )

    return embed;
}