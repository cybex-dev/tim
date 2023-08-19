// CSV utils

const fs = require('fs');
const path = require('path');
const UUID = require('uuid');

/**
 * Write data to a CSV file (in export folder), returns file path
 * @param filename {string} filename to write to
 * @param data {object[]} data to write
 * @param headers headers to write
 * @returns {Promise<string>} file path
 */
const writeToCSV = (filename, data, headers) => {
    return new Promise((resolve, reject) => {
        // current path
        const currentPath = path.join(process.cwd(), "exports", UUID.v4());

        // create export folder if it doesn't exist
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath, {recursive: true});
        }

        // create file
        const filePath = path.join(currentPath, filename);
        if(fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        const writeStream = fs.createWriteStream(filePath, {flags: 'w'});
        writeStream.write(headers.join(",") + "\n", 'utf8');
        data.forEach((row) => {
            writeStream.write(Object.values(row).join(",") + "\n", 'utf8');
        });
        writeStream.on('finish', () => {
            resolve(filePath);
        });
        writeStream.on('error', (err) => {
            reject(err);
        });

        writeStream.end();
    });
}

module.exports = {
    writeToCSV,
}