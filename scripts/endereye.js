"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@grakkit/stdlib-paper");
const Location = core.type("org.bukkit.Location");
const data = core.data("/legendarios/" + "End Portal Frame" + "/");
core.event("org.bukkit.event.entity.EntitySpawnEvent", (evt) => {
    console.log("a");
    if (evt.getEntity()['name'] == "Eye of Ender" && evt.getEntity().getType().name() == "ENDER_SIGNAL") {
        if (data.loc.x && data.loc.z) {
            evt.getEntity()['setTargetLocation'](new Location(evt.getEntity().getWorld(), data.loc.x, data.loc.y, data.loc.z));
        }
        else if (data.loc.pUserName) {
            const location = core.server.getPlayer(data.loc.pUserName).getLocation();
            evt.getEntity()['setTargetLocation'](new Location(evt.getEntity().getWorld(), location.getX(), location.getY(), location.getZ()));
        }
    }
});
var STRONGHOLDSTATUS;
(function (STRONGHOLDSTATUS) {
    STRONGHOLDSTATUS[STRONGHOLDSTATUS["notchecked"] = 0] = "notchecked";
    STRONGHOLDSTATUS[STRONGHOLDSTATUS["exists"] = 1] = "exists";
    STRONGHOLDSTATUS[STRONGHOLDSTATUS["doesntexist"] = 2] = "doesntexist";
})(STRONGHOLDSTATUS || (STRONGHOLDSTATUS = {}));
let STRONGHOLD = STRONGHOLDSTATUS.notchecked;
core.event("org.bukkit.event.player.PlayerInteractEvent", (e) => {
    const p = e.getPlayer();
    const w = p.getWorld();
    if (e.getItem())
        if (e.getItem().getType().name() == "ENDER_EYE") {
            if (STRONGHOLD == STRONGHOLDSTATUS.notchecked) {
                if (w.locateNearestStructure(p.getLocation(), core.type("org.bukkit.StructureType")['STRONGHOLD'], 4000, true)) {
                    STRONGHOLD = STRONGHOLDSTATUS.exists;
                }
                else {
                    STRONGHOLD = STRONGHOLDSTATUS.doesntexist;
                }
            }
            if (STRONGHOLD == STRONGHOLDSTATUS.doesntexist) {
                w.spawnEntity(p.getLocation(), core.type("org.bukkit.entity.EntityType").ENDER_SIGNAL);
            }
            console.log("a");
        }
});
