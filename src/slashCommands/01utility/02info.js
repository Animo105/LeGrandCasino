const { EmbedBuilder } = require("@discordjs/builders");
const {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require("discord.js");
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Give info on your account.")
    .addUserOption(option => option
        .setName("user")
        .setDescription("Give information about another user.")
    ),

    async execute(interaction, client) {

        await interaction.deferReply();

        let user = interaction.options.getUser('user') ?? interaction.user;
        
        let data = client.checkAccount(user.id, interaction.guildId)

        if (!data) {
            await interaction.editReply("There's no account registered under that name.");
            console.log(user.id);
        }

            let embed = []
            /*======Build the embed=====*/

            //main embed
            embed.push(  new EmbedBuilder()
                .setTitle(data.name)
                .setColor([201, 18, 18])
                .setDescription(`${data.desc}\n\n **In account:** ${data.money}$ \n **Membership:** ${data.membership}`)
            )
            /*==========================*/

            //slot machine embed
            embed.push( new EmbedBuilder()
                .setTitle(data.name).setFooter({text:`Time used: ${data.SM.time}`}).setColor([201, 18, 18])
                .setDescription(`# :slot_machine: __Slot machine__ :slot_machine: \n **Money put in:** ${data.SM.moneyIn} \n **Money cashed out:** ${data.SM.moneyOut} \n **Profit:** ${data.SM.moneyOut - data.SM.moneyIn} \n **Jackpot:** ${data.SM.jackpot}`)
            )
            //roulette
            embed.push( new EmbedBuilder()
            .setTitle(data.name).setFooter({text:`Time used: ${data.FR.time}`}).setColor([201, 18, 18])
            .setDescription(`# <:roulette:1291109770966732891> __French roulette__ <:roulette:1291109770966732891> \n **Money put in:** ${data.FR.moneyIn} \n **Money cashed out:** ${data.FR.moneyOut} \n **Profit:** ${data.FR.moneyOut - data.FR.moneyIn}`)
            )
            //dices
            embed.push( new EmbedBuilder()
            .setTitle(data.name).setFooter({text:`Time used: ${data.dice.time}`}).setColor([201, 18, 18])
            .setDescription(`# :game_die: __Dices__ :game_die: \n **Money put in:** ${data.dice.moneyIn} \n **Money cashed out:** ${data.dice.moneyOut} \n **Profit:** ${data.dice.moneyOut - data.dice.moneyIn}`)
            )  
            //social
            embed.push( new EmbedBuilder()
            .setTitle(data.name).setColor([201, 18, 18]).setFooter({text:`amount people mugged: ${data.mug.time}`})
            .setDescription(`# :people_holding_hands: __Social__ :people_holding_hands: \n **Money donated:**${data.donation.given} \n **Money mugged:** ${data.mug.amount} \n\n **money recieved:** ${data.donation.recived}`)
            ) 
            //achivement
            let achivementDesc = "";
            //fait la description des achivement
            for (let i = 0; i < data.achivement.length; i++) {
                achivementDesc += `__**${data.achivement[i].name}**__ - ${data.achivement[i].desc}\n`
            }
            embed.push( new EmbedBuilder()
            .setTitle(data.name).setColor([201, 18, 18])
            .setDescription("# :crown: __Achivement__ :crown: \n"+achivementDesc)
            )
            //NFTs
            let NFTdesc = "";
            //fait la description des NFTs
            for (let i = 0; i < data.NFTlist.length; i++) {
                NFTdesc += `__**${data.NFTlist[i].name}**__ - ${data.NFTlist[i].desc}\n`
            }
            embed.push( new EmbedBuilder()
            .setTitle(data.name).setColor([201, 18, 18]).setFooter({text:`NFT machine rolls: ${data.NFTslot}`})
            .setDescription(`# :sparkles: __NFTs__ :sparkles:` + NFTdesc)
            ) 
             //inventaire
             let inventoryDesc = "";
             //fait la description de l'inventaire
             for (let i = 0; i < data.inventory.length; i++) {
                inventoryDesc += `__**${data.inventory[i].name}**__ - ${data.inventory[i].desc}\n`
            }
            embed.push( new EmbedBuilder()
            .setTitle(data.name).setColor([201, 18, 18])
            .setDescription(`# :scroll: __Inventory__ :scroll: \n`+inventoryDesc)
            )




            //===============================Build the button and the row================================================//
            let index = 0;
            let next = new ButtonBuilder().setCustomId('next').setLabel("Next ▶️")
            .setStyle(ButtonStyle.Primary)
            
            let previous = new ButtonBuilder().setCustomId('back').setLabel("◀️ Previous")
            .setStyle(ButtonStyle.Primary)

            const row = new ActionRowBuilder()
			.addComponents(previous, next);


            //send message
            const response = await interaction.editReply({
                embeds: [embed[0]],
                components: [row]
            });

            //build collector
            const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 300_000 });

            collector.on('collect', async i => {
                i.deferUpdate();
                if (i.customId == 'next') {
                    index += 1;
                    if (index > (embed.length-1)) index = 0;
                }
                else if (i.customId == 'back') {
                    index -= 1;
                    if (index < 0) index = (embed.length-1);
                    
                }
                else console.log("[ERROR] wrong /info interaction:",i.customId)
                console.log("[info] index:", index);
                await interaction.editReply({
                    embeds: [embed[index]],
                    components: [row]
                });

            });
    }
}