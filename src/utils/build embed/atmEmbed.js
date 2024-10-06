const { EmbedBuilder } = require("discord.js")
const {prefix} = require('../../../config.json')


module.exports = (data) => {

    let embed = new EmbedBuilder().setTitle("Info")
    .setDescription(
        "# :: __ATM__ :: \n"
        +"The ATM hold reward and money for you to collect with **/atm**. The amount of money will gradualy augment over time"
    )


    return embed;
}