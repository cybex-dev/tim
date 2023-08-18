const fs = require('node:fs');
const path = require('node:path');

/**
 * Require() and add command to commands array (i.e. to client)
 * @param filepath {string} path to command (.js) file
 * @returns {object} command object
 */
const readCommand = (filepath) => {
    const command = require(filepath);
    if ('data' in command && 'execute' in command) {
        return command
    } else {
        console.log(`[WARNING] The command at ${filepath} is missing a required "data" or "execute" property.`);
    }
}



/**
 * Load commands from given directory, returns array of command objects
 * @param folder {string} path to folder containing commands i.e. "/path/to/commands"
 * @param onReadTransform {function} optional function to transform command object after reading
 */
const loadCommands = (folder, onReadTransform = null) => {
    let commands = [];
    // Grab all the command files from the commands directory you created earlier
    if(!fs.existsSync(folder)) {
        throw new Error(`'${folder}' folder does not exist, or was not found.`)
    }

    fs.readdirSync(folder).forEach(file => {
        const filePath = path.join(folder, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            commands.concat(loadCommands(filePath, onReadTransform))
        } else {
            const command = readCommand(filePath)
            if(typeof onReadTransform === "function") {
                commands.push(onReadTransform());
            } else {
                commands.push(command)
            }
        }
    });

    return commands;
}

exports.loadCommands = loadCommands;