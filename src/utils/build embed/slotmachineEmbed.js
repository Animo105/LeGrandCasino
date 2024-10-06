const { EmbedBuilder } = require("discord.js")
const {prefix} = require('../../../config.json')


module.exports = (data) => {

    let embed = new EmbedBuilder().setTitle("Info")
    .setDescription(
        "# :slot_machine: __Slot Machine__ :slot_machine: \n"
        +"command: **/slotmachine roll <amount>**.\n The <amount> option is the amount of tries you take, by default it's one and can go up to 50.\n"
        +"each pull will cost 100$ and you can win the following reward:\n"
        +"\n:ring::ring::ring: => 200\n"
        +":sleeping_accommodation::sleeping_accommodation::sleeping_accommodation: => 400\n"
        +":fishing_pole_and_fish::fishing_pole_and_fish::fishing_pole_and_fish: => 700\n"
        +":ice_cube::ice_cube::ice_cube: => 1 000\n"
        +":game_die::game_die::game_die: => 5 000\n"
        +":person_in_manual_wheelchair::person_in_manual_wheelchair::person_in_manual_wheelchair: => 10 000\n"
        +":lobster::lobster::lobster: => 50 000\n"
        +":bowl_with_spoon::bowl_with_spoon::bowl_with_spoon: => 100 000\n"
        +"if you have only 2 of the 3 you win a **Double** (half the prize), :pineapple: act as blank slates (no value).\n"
    )

    if (data) {
        let infoFlieds =[
            {
                name:"__Account Statistics__",
                value:`**Tries taken:** ${data.SM.time}\n **Cost:** ${data.SM.moneyIn}$ \n **Money cashed out:** ${data.SM.moneyOut}$.`
            }
            ];

        embed.setFields(infoFlieds)
    }

    return embed;
}