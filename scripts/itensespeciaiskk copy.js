"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rare = (core.type("org.bukkit.ChatColor").translateAlternateColorCodes("&", "&6&ka&r&l&fMeM&8-&r&o&7Legendários♔&6&ka"));
const Vector = core.type('org.bukkit.util.Vector');
const locationClass = core.type('org.bukkit.Location');
const stdlib = require('@grakkit/stdlib-paper');
const playerClass = core.type("org.bukkit.entity.Player");
const itemClass = core.type("org.bukkit.inventory.ItemStack");
const materialClass = core.type("org.bukkit.Material");
const codify = require("@brayjamin/codify");
core.event("org.bukkit.event.entity.ItemDespawnEvent", (evt) => { if (checkIfRare(evt.getEntity()['getItemStack']())) {
    evt.setCancelled(true);
} });
core.event('org.bukkit.event.entity.EntityDamageEvent', (evt) => {
    const position = evt.getEntity().getLocation();
    if (evt.getEntityType().name() == "DROPPED_ITEM") {
        if (checkIfRare(evt.getEntity()['getItemStack']())) {
            const world = evt.getEntity().getWorld();
            var loc = evt.getEntity().getLocation();
            saveCoords(evt.getEntity()['getItemStack'](), loc);
            var lista = world.getNearbyEntities(loc, 2, 2, 2);
            var loop = true;
            evt.setCancelled(true);
            evt.getEntity().setInvulnerable(true);
            const intervalo = setInterval(() => {
                console.log("ativado");
                lista = world.getNearbyEntities(loc, 2, 2, 2);
                loop = false;
                for (let i = 0; i < lista['length']; i++) {
                    const entity = lista[i];
                    if (entity.getType().name == "item") {
                        if (checkIfRare(entity['getItemStack']())) {
                            world.spawnParticle(core.type("org.bukkit.Particle").PORTAL, loc.getX(), loc.getY(), loc.getZ(), 20);
                            world.playSound(loc, "minecraft:block.beacon.ambient", 2, 1);
                            loop = true;
                            loc = entity.getLocation();
                            break;
                        }
                    }
                }
                if (!loop) {
                    clearInterval(intervalo);
                }
            }, 100);
        }
    }
});
core.event('org.bukkit.event.entity.ItemSpawnEvent', (evt) => {
    if (checkIfRare(evt.getEntity()['getItemStack']())) {
        saveCoords(evt.getEntity().getItemStack(), evt.getEntity().getLocation());
    }
});
core.event('org.bukkit.event.entity.EntityDeathEvent', (evt) => {
    //VERAQUI DEPOIS
});
function saveCoords(item, location) {
    var nome = item;
    if (!(typeof (item) == "string")) {
        nome = item.getI18NDisplayName();
    }
    const data = core.data("/legendarios/" + nome + "/");
    data.loc = { x: location.getX(), y: location.getY(), z: location.getZ() };
}
function saveCoordsByPlayer(item, player) {
    const p = player;
    var nome = item;
    if (!(typeof (item) == "string")) {
        nome = item.getI18NDisplayName();
    }
    const data = core.data("/legendarios/" + nome + "/");
    data.loc = { pUserName: p.getName() };
}
const checkIfRare = (item) => {
    if (item.getItemMeta()) {
        if (item.getItemMeta().hasLore()) {
            if (core.type("org.bukkit.ChatColor").stripColor(item.getItemMeta().getLore()[0]) == core.type("org.bukkit.ChatColor").stripColor(rare)) {
                return true;
            }
        }
    }
    return false;
};
const convertToRare = (itemstack, lore) => {
    itemstack;
    const metaitemstack = itemstack.getItemMeta();
    metaitemstack.setLore([rare, lore]);
    itemstack.setItemMeta(metaitemstack);
};
let countdown = true;
core.event('org.bukkit.event.inventory.InventoryClickEvent', (e) => {
    function tentativaBurlar(player) {
        if (countdown) {
            server.broadcastMessage("Boa tentativa, " + player.getName() + " | Localizado em: " + Math.round(player.getLocation().getX()) + ", " + Math.round(player.getLocation().getY()) + ", " + Math.round(player.getLocation().getZ()));
            countdown = false;
            setTimeout(() => { countdown = true; }, 5000);
        }
    }
    if (checkIfRare(e.getCurrentItem())) {
        if (e.getInventory().getType().name() == "ENDER_CHEST" || e.getInventory().getType().name() == "ANVIL" || e.getInventory().getType().name() == "SHULKER_BOX") {
            e.setCancelled(true);
            tentativaBurlar(e.getWhoClicked());
        }
        try {
            if (e.getInventory().getHolder()['getType']().name() == "PLAYER") {
                saveCoordsByPlayer(e.getCurrentItem(), e.getInventory().getHolder());
                return;
            }
            saveCoords(e.getCurrentItem(), e.getInventory().getHolder()['getLocation']());
        }
        catch (error) {
            console.warn("Algo falhou ao tentar pegar as coordenadas de um item especial.|" + __dirname + "/itensespeciaiskk.ts");
        }
    }
    /*
    if (checkIfRare(e.getCursor())) {
        if (e.getCurrentItem().getType().name()== "BUNDLE") {
            e.setCancelled(true); tentativaBurlar(e.getWhoClicked())
        }
    }
    */
});
module.exports = { convertToRare, checkIfRare, saveCoords };
core.event("org.bukkit.event.player.PlayerQuitEvent", (e) => {
    const inv = e.getPlayer().getInventory();
    const itens = inv.getContents();
    for (let i = 0; i < itens.length; i++) {
        const item = itens[i];
        if (item) {
            if (checkIfRare(item)) {
                e.getPlayer().getWorld().dropItemNaturally(e.getPlayer().getLocation(), item);
            }
        }
    }
});
core.event("org.bukkit.event.player.PlayerJoinEvent", (e) => {
    const inv = e.getPlayer().getInventory();
    const itens = inv.getContents();
    for (let i = 0; i < itens.length; i++) {
        const item = itens[i];
        if (item) {
            if (checkIfRare(item)) {
                e.getPlayer().getInventory().removeItem(item);
            }
        }
    }
});
