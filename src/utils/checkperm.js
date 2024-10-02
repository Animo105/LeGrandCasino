const { mainDev, admins} = require('../../config.json');
module.exports = async (msg) => {

    //si le message est null return false
    if (msg == null) {
        console.log("[checkperm] message null.")
        msg.react("❌");
        return false;
    }

    //seul les gens marqué admin peuvent run la commande
    for (const admin of admins)
      if (msg.author.id == admin) return true;
    
    msg.react("❌");
        return false;
}