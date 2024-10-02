const {REST, Routes} = require('discord.js')
const {token, appId, testServ} = require('../../config.json')


module.exports = async (commands) => {
    let data = []
    //take only the data
    await commands.forEach(element => {
        console.log(">",element.data.name)
        try {
            data.push(element.data.toJSON());
        } catch (error) {
            console.log(error)
        }
    });

    const rest = await new REST().setToken(token);

        try {
            await rest.put(
                Routes.applicationGuildCommands(appId, testServ),
                { body: data },
            );

            console.log("Done!")

        } catch (error) {
            console.log("[ERROR]: ",error)
        }
}