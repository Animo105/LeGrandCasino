const fs = require('node:fs');
const path = require('node:path');

module.exports = (f) => {
    console.log("[", f ,"] loading...")
    //cré un array pour les fonctions
    let localCommands = [];
    //prend le dossier commande et met les sous dossier dans une variable
    const foldersPath = path.join(__dirname, '..', f);
    const commandFolders = fs.readdirSync(foldersPath);

    //prend chaque folder dans les dossier de commande
    for(const folder of commandFolders){

        //prend le path du dossier commande et ajoute chaque dossier (en gros vas des les sous dossier)
        const commandsPath = path.join(foldersPath, folder);
        //read juste les file qui finissent en .js dans les dossier
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const commands = require(filePath);
            localCommands.push(commands);
            
        }
    }
    return localCommands;
}