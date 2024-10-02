const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {prefix} = require('./../../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("display information about all / commands and other stuff."),

    async execute(interaction) {
        //load help embed
        await interaction.deferReply()

        let desc = `**WELCOME, to the great casino.** use **/register** to create an account. you can add a small description if you want that will be displayed along your information with **/info**.`
        desc += `all command shown below are / commands, for the none slash command, use **${prefix}commands**.`
        desc += `\n\n__**Utility commands**__\n **/info <user>** : display information about your account, or someone else's.`+
        `\n **/donate <user> <amount>** : donate an <amount> of money to a <user>.`+
        `\n**/shop** : to open the casino shop.`+
        `\n**/atm** : hold some special reward and money prizes, may vary by which achivement or title you've obtained.`+
        `\n\n__**Gambling commands**__\n **/slotmachine** : take 100$ to do one pull, be carful with it.`+
        `\n**/roulette <...** : this one has a lot of option, use **/roulette info** for more info.\n`


        let embed = new EmbedBuilder()
        .setTitle("========== [ LE GRAND CASINO ] ==========").setColor([210, 18, 18])
        .setFields(
            {name:"__chat input command__", value:`to see all chat command register in the bot tap ${prefix}commands.`},
            {name:"__deck of cards__", value:`The dealer can hold one deck of cards. with ${prefix}shuffle you can create a new deck, and ${prefix}draw randomly take one card. (card drew won't be picked again unless ${prefix}shuffle is done.)`}
        )
        .setDescription(desc)

        await interaction.editReply({content:"Sent in DMs.", ephemeral:true});
        await interaction.user.send({embeds:[embed]});

    }
}