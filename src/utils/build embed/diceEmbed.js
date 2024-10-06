const { EmbedBuilder } = require("discord.js")
const {prefix} = require('../../../config.json')


module.exports = (data) => {

    let embed = new EmbedBuilder().setTitle("Info")
    .setDescription(
        "# :game_die: __Dice__ :game_die: \n"
        +"command: **/dice <number> <amount>**\n <number> is the amount the 2 diece need to equal for you to win. the <amount> is the amount of money you bet on the roll. (minimum 10$ and maximum 10 000$)"
        +"When you win, the amount of money you betted is doubled.\n"
    )

    if (data) {
        let infoFlieds =[
            {
                name:"__Account Statistics__",
                value:`**Tries taken:** ${data.dice.time}\n **Cost:** ${data.dice.moneyIn}$ \n **Money cashed out:** ${data.dice.moneyOut}$.`
            }
            ];

        embed.setFields(infoFlieds)
    }

    return embed;
}