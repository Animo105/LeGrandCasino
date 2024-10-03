const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("atm")
        .setDescription("hold some reward for you. don't forget to check it once in a while."),

    async execute(interaction, client) {
        await interaction.deferReply();

        let data = client.checkAccount(interaction.user.id, interaction.guildId);
        if (!data) {
            interaction.editReply("There's no account registered under that name.")
            return;
        }

        let desc = "Not built yet.";

        let atm = data.ATM;
        data.ATM.clear();

        let date = new Date()
        let last = data.lastATM

        if (date - last < 86_400_000) {
            desc = "**Money:** Allready claimed\n"
        }
        else {
            "**Money:** more be claimable in the future (500$ pour le moment)\n"
            data.money += 500
        }

        //claiming stuff
        atm.forEach(e => {
            if (e.type == "achivement") {
                //==================claim an achivement===========================
                let obj = {id:e.id, name:e.name, desc:e.desc};
                data.achivement.push(obj);

            }
            else if (e.type == "item") {
                //==================claim an item===========================
                let obj = {id:e.id, name:e.name, count:e.count, desc:e.desc};
                data.inventory.push(obj);

            }
            else if (e.type == "nft") {
                //==================claim an nft===========================
                let obj = {name:e.name, value:e.value};
                data.NFTlist.push(obj);

            }
            else {
                console.log("Wrong ATM element:", e.type)
            }
                

        });




        let embed = new EmbedBuilder()
            .setTitle(" ===== [ATM] ===== ")
            .setColor([201, 18, 18])
            .setDescription(desc);
        
        interaction.editReply({embeds: [embed]});
        
        


        
    }
}