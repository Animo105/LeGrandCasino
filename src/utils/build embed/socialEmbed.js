const { EmbedBuilder } = require("discord.js")
const {prefix} = require('../../../config.json')


module.exports = (data) => {

    let embed = new EmbedBuilder().setTitle("Info")
    .setDescription(
        "# :people_holding_hands: __Social commands__ :people_holding_hands: \n"
        +"You can do **/info <user>** to see statistic of other users than yourself.\n Here a list of the commands that interact with other users:\n\n"
        +"**/donate <user> <amount>** : give an <amount> of money to another <user>.\n"
        +"**/mug <user> <amount (100,200,300)> : try to mug some money (a fixed <amount> between 100, 200 or 300) from another user.\n"
    )

    if (data) {
        let infoFlieds =[
            {
                name:"__Account Statistics__",
                value:`**Money donated:**${data.donation.given} \n **money recieved:** ${data.donation.recived} \n\n **Money mugged:** ${data.mug.amount} \n **Amount people mugged:** ${data.mug.time}`
            }
            ];

        embed.setFields(infoFlieds)
    }

    return embed;
}