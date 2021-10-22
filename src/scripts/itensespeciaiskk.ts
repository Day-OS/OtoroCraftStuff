const rare = (core.type("org.bukkit.ChatColor").translateAlternateColorCodes("&","&6&ka&r&l&fMeM&8-&r&o&7Legendários♔&6&ka"))
const locationClass = core.type('org.bukkit.Location')
const MATERIAL = core.type("org.bukkit.Material")
//const spawnarea={p1x:-8,p1z:-8,p2x:24,p2z:24}
const spawnarea={p1x:-4096,p1z:-2048,p2x:4095,p2z:2047}
import { obePlayer, obbChest, obiItemStack} from '@grakkit/server-classes';
core.event("org.bukkit.event.server.PluginDisableEvent", ()=>{
    const p = server.getOnlinePlayers()
    for (let i = 0; i < p['length']; i++) {
        const player: obePlayer = p[i];
        const lista = player.getInventory().getContents()
        for (let z = 0; z < lista.length; z++) {
            const item = lista[z];
            if(item) if(checkIfRare(item)) player.getWorld().dropItemNaturally(player.getLocation(),item);
        }
        
    }
})
core.event("org.bukkit.event.server.PluginEnableEvent", ()=>{
    const p = server.getOnlinePlayers()
    for (let i = 0; i < p['length']; i++) {
        const player: obePlayer = p[i];
        const lista = player.getInventory().getContents()
        for (let z = 0; z < lista.length; z++) {
            const item = lista[z];
            if(item) if(checkIfRare(item)) player.getInventory().removeItem(item)
        }
    }
})
core.event("org.bukkit.event.entity.ItemDespawnEvent",(evt)=>{if(checkIfRare(evt.getEntity()['getItemStack']())){evt.setCancelled(true);}})
core.event('org.bukkit.event.entity.EntityDamageEvent',(evt)=>{ 
    if(evt.getEntityType().name() == "DROPPED_ITEM"){if(checkIfRare(evt.getEntity()['getItemStack']())){const world = evt.getEntity().getWorld()
        var loc = evt.getEntity().getLocation()
        saveCoords(evt.getEntity()['getItemStack'](),loc)
        var lista = world.getNearbyEntities(loc, 2,2,2)
        var loop = true
        evt.setCancelled(true)
        evt.getEntity().setInvulnerable(true)
        const intervalo = setInterval(()=>{
            lista = world.getNearbyEntities(loc, 2,2,2)
            loop = false
            for (let i = 0; i < lista['length']; i++) {
                const entity = lista[i];
                
                if(entity.getType().name == "item")
                {
                    if(checkIfRare(entity['getItemStack']())){
                        world.spawnParticle(core.type("org.bukkit.Particle").PORTAL, loc.getX(),loc.getY(), loc.getZ(), 20)
                        world.playSound(loc, "minecraft:block.beacon.ambient", 2, 1)
                        loop = true
                        loc = entity.getLocation()
                        break;
                    }
                }
            }
            if(!loop){clearInterval(intervalo)}
        
        },100)}
}})

core.event('org.bukkit.event.entity.ItemSpawnEvent',(evt)=>{
    if(checkIfRare(evt.getEntity()['getItemStack']())){
        saveCoords(evt.getEntity().getItemStack(), evt.getEntity().getLocation())
    }
})

core.event('org.bukkit.event.inventory.InventoryClickEvent',(e)=>{
    function tentativaBurlar(player) {
        if (countdown){
            server.broadcastMessage("Boa tentativa, " + player.getName() + " | Localizado em: " + Math.round(player.getLocation().getX()) + ", " + Math.round(player.getLocation().getY()) + ", " + Math.round(player.getLocation().getZ()));
            countdown = false;
            setTimeout(()=>{countdown = true}, 5000)
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
        
        } catch (error) {
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
})
core.event("org.bukkit.event.player.PlayerQuitEvent", (e)=>{
    const inv = e.getPlayer().getInventory()
    const itens = inv.getContents()
    for (let i = 0; i < itens.length; i++) {
        const item = itens[i];
        if (item) {
            if (checkIfRare(item)){
                e.getPlayer().getWorld().dropItemNaturally(e.getPlayer().getLocation(), item)
                
            } 
            
        }
        
        
    }
})

core.event("org.bukkit.event.player.PlayerJoinEvent", (e)=>{
    const inv = e.getPlayer().getInventory()
    const itens = inv.getContents()
    for (let i = 0; i < itens.length; i++) {
        const item = itens[i];
        if (item) {
            if (checkIfRare(item)){
                e.getPlayer().getInventory().removeItem(item)
                
            } 
            
        }
        
        
    }
})


function saveCoords(item, location: InstanceType<typeof locationClass>){
    var nome = item
    if (!(typeof(item) == "string")) {
        nome = item.getI18NDisplayName()
    }
    const data = core.data("/legendarios/" + nome + "/");
    data.loc = {x:location.getX(), y: location.getY(), z: location.getZ()} 
}

function saveCoordsByPlayer(item, player:obePlayer | any){
    const p: obePlayer  = player
    var nome = item
    if (!(typeof(item) == "string")) {
        nome = item.getI18NDisplayName()
    }
    const data = core.data("/legendarios/" + nome + "/");
    data.loc = {pUserName: p.getName()} 
}

const checkIfRare = (item)=>{
    if (item.getItemMeta()) {if(item.getItemMeta().hasLore()){if(core.type("org.bukkit.ChatColor").stripColor(item.getItemMeta().getLore()[0]) == core.type("org.bukkit.ChatColor").stripColor(rare)){return true}}        }
    return false
}

const convertToRare = (itemstack, lore)=>{
    lore.unshift(rare)
    itemstack
    const metaitemstack = itemstack.getItemMeta()
    metaitemstack.setLore(lore)
    itemstack.setItemMeta(metaitemstack)
}

const spawnItem = (item: obiItemStack, player: obePlayer) =>{
    player.sendMessage((item.getType() + " foi spawnado.") as any)
    //stolen lmao https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomInt(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    let bloco = player.getWorld().getBlockAt(getRandomInt(spawnarea.p1x, spawnarea.p2x), 3, getRandomInt(spawnarea.p1z, spawnarea.p2z))
    while (bloco.getType() != MATERIAL.AIR as any) {
        const loc = bloco.getLocation()
        bloco = bloco.getWorld().getBlockAt(loc.getX(),loc.getY()+1,loc.getZ())
    }
    bloco.setType(MATERIAL.CHEST as any)
    const chest: obbChest = bloco.getState() as any
    const i = chest.getBlockInventory()
    i.setItem(13, item)
    saveCoords(item, bloco.getLocation() as any)    
}

let countdown = true

module.exports = {convertToRare, checkIfRare, saveCoords, spawnItem}
