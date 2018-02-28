#!/usr/bin/env node
const url = require('./preferences').url;

module.exports = {
    getAliases() {
        let aliases = {};
        try {
            alias = require(url);
            let aliasedProjects = Object.keys(alias);
            if(aliasedProjects.length > 0){
                console.warn("global-link : using aliases : ");
                aliasedProjects.forEach((a) => {
                    console.warn("global-link : ",a,"=>",alias[a]);
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