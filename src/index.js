#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const pjson = require('./package.json');
require("create-if-not-exist")('links.json', '{}');
const links = require('links.json') || {};

const program = require('commander');

program
    .version('1.0.0')
    .usage('<add|remove|use|list> [projectname]')
    .parse(process.argv);

function writeFile() {
    fs.writeFile("./links.json", JSON.stringify(links), function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
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
                process.exit(links[program.args[1]]);
            }
            break;
    }

}


