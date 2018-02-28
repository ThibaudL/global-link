#!/usr/bin/env node
const url = require('./preferences').url;

module.exports = {
    getAliases() {
        let aliases = {};
        try {
            aliases = require(url);
            let aliasedProjects = Object.keys(aliases);
            if(aliasedProjects.length > 0){
                console.warn("global-link : using aliases : ");
                aliasedProjects.forEach((alias) => {
                    console.warn("global-link : ",alias,"=>",aliases[alias]);
                });
            }else{
                console.warn("global-link : no aliases to use");
            }
        } catch(e){
            console.warn("global-link : no aliases to use");
        }
        return aliases;
    }
};