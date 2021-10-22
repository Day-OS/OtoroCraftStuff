require("@grakkit/stdlib")
require("@grakkit/server")
require("@grakkit/js");
import '@grakkit/stdlib';
import type { obiItemStack, obePlayer, obMaterial } from '@grakkit/types-paper'
import * as core from '@grakkit/stdlib-paper'

//https://discord.com/channels/718920471554424872/765969712890511400/785594693202214962

const scripts = core.file('plugins/grakkit/scripts').directory();
// require all files within
for (const { name } of scripts.children || []) name.endsWith('.js') && require(`./scripts/${name}`)