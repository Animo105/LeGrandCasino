const fs = require('fs')
module.exports = async (interaction, client) => {

    //check the account
    let data = client.checkAccount(interaction.user.id, interaction.guildId);
    if (!data) {
        interaction.editReply("You're not registered yet.")
        return;
    }

    //check if bidding money you dont have
    if (data.money < 100) {
        await interaction.editReply("What do you take me for? The bank?\n You can't bet money you don't have.");
        return;
    }

    data.money -= 100;
    
    let values = [
        {k:":pineapple:", v:0},
        {k:":ring:", v:2},
        {k:":sleeping_accommodation:", v:4},
        {k:":fishing_pole_and_fish:", v:7},
        {k:":ice_cube:", v:10},
        {k:":game_die:", v:50},
        {k:":person_in_manual_wheelchair:", v:100},
        {k:":lobster:", v:500},
        {k:":bowl_with_spoon:", v:1000},
    ];

    let rolls = [];
    let desc = ""
    await interaction.editReply("# >"+desc+"<");

    //========================roll the chances=====================================

    //reward
    let random = Math.random();
    let reward = values[0];
    if (random <= 0.1) {}
    else if (random <= 0.6) reward = values[1];
    else if (random <= 0.74) reward = values[2];
    else if (random <= 0.80) reward = values[3];
    else if (random <= 0.86) reward = values[4];
    else if (random <= 0.91) reward = values[5];
    else if (random <= 0.96) reward = values[6];
    else if (random <= 0.99) reward = values[7];
    else if (random < 1) reward = values[8];


    if (Math.random() > 0.96) {
        //=================================================win 3=================================================
        console.log("win,",reward);
        rolls[0] = reward;
        rolls[1] = reward;
        rolls[2] = reward;

    }
    else {
        //win some or lose
        if (Math.random() > 0.75) {
            //=================================================win half=================================================
            console.log("half,",reward.v);
            let lose = Math.floor(Math.random()*3);
            for (let i = 0; i < 3; i++) {
                if (i == lose) {
                    //thant que le mauvais prix est le meme que le bon rolls again
                    do {
                        rolls[i] = values[Math.floor(Math.random()*7)];
                    }while(rolls[i] == reward);
                }
                else {
                    rolls[i] = reward;
                }

            }

        }
        else {
            //=================================================lose=================================================
            console.log("lose,",reward.v);
            let signleWin = Math.floor(Math.random()*3);
            let winIndex = values.indexOf(reward);
            values.splice(winIndex, 1);
            for (let i = 0; i < 3; i++) {
                if (i == signleWin) {
                    rolls[i] = reward;
                }
                else {
                    let index = Math.floor(Math.random()*values.length-1);
                    if (index < 0) index = 0;
                    rolls[i] = values[index];
                    values.splice(index, 1);
                }

            }
        }

    }
    //affiche le texte un apres l'autre
    for (let i = 0; i < 3; i++) {
        desc+=rolls[i].k
        await interaction.editReply("# >"+desc+"<");
    }

    
    //================================================================================
    rolls.sort(function(a, b){return a.v - b.v});

    //win
    if (rolls[0].v === rolls[1].v && rolls[1].v === rolls[2].v) {
        //si c'est un triple de pineapple
        if (rolls[1].v == 0) {
            interaction.editReply(`# ${desc} **-** <@${interaction.user.id}> hit... the Jackpot?`)
            //data.titles.push({name:"Winner of lossers", desc:"Win the pineapple as a jackpot in the slot machine."});
            return;
        
        //si c'est bowl with spoon
        }
        else if (rolls[1].v == 1000) {
            interaction.editReply(`# ${desc} **-** @everyone!!! <@${interaction.user.id}> __**Big jackpot!!1!**__ (**${win}$**)`)
        }
        //si c'est un triple normal
        else {
            let win = 100 * rolls[0].v
        await interaction.editReply(`# ${desc} **-** <@${interaction.user.id}> __**Jackpot!!!**__ you won **${win}$**`);
        data.money+=win;
        data.SM.moneyOut+=win;
        data.SM.jackpot+=1;
        }
    }
    else if (rolls[0] === rolls[1] || rolls[1] === rolls[2]) {
        if (rolls[1].v == 0) {
            await interaction.editReply(`# ${desc} **-** <@${interaction.user.id}>Double, but it's a pineapple...`);
            return;
        }
        let win = 100 * (rolls[1].v / 2);
        await interaction.editReply(`# ${desc} **-** <@${interaction.user.id}> Double! you won **${win}$**`);
        data.money+=win;
        data.SM.moneyOut+=win;
        data.SM.jackpot+=1;
    }
    //rien
    else {
        await interaction.editReply(`# ${desc} **-** <@${interaction.user.id}> has lost.`);
        
        
    }
    //================================================================================

    data.SM.moneyIn += 100;
    data.SM.time += 1;

    var jsonData = JSON.stringify(data);
    await fs.writeFileSync(`src/01database/${interaction.guildId}-${interaction.user.id}.json`, jsonData);
}