#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

let globalLinksPath = `${process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']}/AppData/Roaming/npm/globa-links.json`;
require("create-if-not-exist")(globalLinksPath, '{}');

const pjson = require(path.resolve('./package.json'));
const links = require(globalLinksPath) || {};

const program = require('commander');

program
    .version('1.0.0')
    .usage('<add|remove|use|list> [projectname]')
    .parse(process.argv);

function writeFile() {
    console.log(links);
    fs.writeFile(globalLinksPath, JSON.stringify(links), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Config file updated !");
    });
}

if (!program.args.length) {
    program.help();
} else {

    switch (program.args[0]) {
        case 'add' :
            if (links[pjson.name] && links[pjson.name] !== process.argv[1]) {
                console.warn(`Warning, this project was already registered here : ${links[pjson.name]}`)
            }
            links[pjson.name] = process.argv[1];
            writeFile();
            break;
        case 'remove' :
            delete links[pjson.name];
            writeFile();
            break;
        case 'list' :
            console.log(JSON.stringify(links));
            break;
        case 'use' :
            if (!program.args[1]) {
                program.help();
            } else {
                console.log(links[program.args[1]]);
            }
            break;
    }

}