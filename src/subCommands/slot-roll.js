const fs = require('fs')
module.exports = async (interaction, once) => {
    
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
    let data = {moneyOut:0,jackpot:0, desc:""};

    //========================roll the chances=====================================

    //reward
    let random = Math.random();
    let reward = values[0];
    if (random <= 0.15) {}
    else if (random <= 0.65) reward = values[1];
    else if (random <= 0.77) reward = values[2];
    else if (random <= 0.85) reward = values[3];
    else if (random <= 0.60) reward = values[4];
    else if (random <= 0.94) reward = values[5];
    else if (random <= 0.97) reward = values[6];
    else if (random <= 0.99) reward = values[7];
    else if (random < 1) reward = values[8];

    //gamble, deal avec les chances
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
            if (once) console.log("half,",reward.v);
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
            if (once) console.log("lose,",reward.v);
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

    //=========================================DISPLAY=====================================================================================================
    //check if doing once, if yes, reply directly what it need
    if (once) {
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
                    let win = 100 * rolls[0].v;
                    interaction.editReply(`# ${desc} **-** @everyone!!! <@${interaction.user.id}> __**Big jackpot!!1!**__ (**${win}$**)`)
                    data.moneyOut+=win;
                    data.jackpot+=1;
                }
                //si c'est un triple normal
                else {
                    let win = 100 * rolls[0].v
                await interaction.editReply(`# ${desc} **-** <@${interaction.user.id}> __**Jackpot!!!**__ you won **${win}$**`);
                data.moneyOut+=win;
                data.jackpot+=1;
                }
            }
            else if (rolls[0] === rolls[1] || rolls[1] === rolls[2]) {
                if (rolls[1].v == 0) {
                    await interaction.editReply(`# ${desc} **-** <@${interaction.user.id}>Double, but it's a pineapple...`);
                    return;
                }
                let win = 100 * (rolls[1].v / 2);
                await interaction.editReply(`# ${desc} **-** <@${interaction.user.id}> Double! you won **${win}$**`);
                data.moneyOut+=win;

            }
            //rien
            else {
                await interaction.editReply(`# ${desc} **-** <@${interaction.user.id}> has lost.`);
                
                
            }
            //================================================================================
    }

    //check if doing more than once, if yes, place in an object
    else {

        data.desc = rolls[0].k + rolls[1].k + rolls[2].k;

        rolls.sort(function(a, b){return a.v - b.v});

        //jackpot
        if (rolls[0].v === rolls[1].v && rolls[1].v === rolls[2].v) {

            if (rolls[0] == 1000) {
                data.bowl = true;
            }
            else {
                data.desc += " - __**jackpot!**__";
            }
            data.emote = rolls[0].k;
            let win = 100 * rolls[0].v;
            data.moneyOut+=win;
            data.jackpot+=1;
        }
        //double
        else if (rolls[0] === rolls[1] || rolls[1] === rolls[2])  {
            data.desc += " - **Double**";
            let win = 100 * (rolls[0].v / 2);
            data.moneyOut+=win;
        }
        //lose
        else {
            //rien
        }

    }

    //return data
    return data;

}