"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@grakkit/stdlib");
require("@grakkit/server");
require("@grakkit/js");
require("@grakkit/stdlib");
const core = require("@grakkit/stdlib-paper");
//https://discord.com/channels/718920471554424872/765969712890511400/785594693202214962
const scripts = core.file('plugins/grakkit/scripts').directory();
// require all files within
for (const { name } of scripts.children || [])
    name.endsWith('.js') && require(`./scripts/${name}`);
