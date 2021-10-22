import * as core from '@grakkit/stdlib-paper'
const Location = core.type("org.bukkit.Location")
const data = core.data("/legendarios/" + "End Portal Frame" + "/");
const shapelessRecipe = core.type("org.bukkit.inventory.ShapelessRecipe")
const itemStack = core.type("org.bukkit.inventory.ItemStack")
const MATERIAL = core.type("org.bukkit.Material")
const item = new itemStack(MATERIAL.ENDER_EYE)
const NamespacedKey = core.type("org.bukkit.NamespacedKey")
item.setAmount(8)
try {
    const receita = new shapelessRecipe(new NamespacedKey("poo", "ender_eye"), item )
    receita.addIngredient(1, new itemStack(MATERIAL.ENDER_PEARL))
    receita.addIngredient(1, new itemStack(MATERIAL.BLAZE_POWDER))
    server.addRecipe(receita)
} catch (error) {
    
}


core.event("org.bukkit.event.entity.EntitySpawnEvent",(evt)=>{
    if (evt.getEntity()['name'] == "Eye of Ender" && evt.getEntity().getType().name() == "ENDER_SIGNAL") {
        if(data.loc.x && data.loc.z){
            evt.getEntity()['setTargetLocation'](new Location(evt.getEntity().getWorld(),data.loc.x,data.loc.y,data.loc.z))
        }
        else if(data.loc.pUserName){
            const location = core.server.getPlayer(data.loc.pUserName).getLocation()
            evt.getEntity()['setTargetLocation'](new Location(evt.getEntity().getWorld(),location.getX(),location.getY(),location.getZ()))
        }
    }
})


enum STRONGHOLDSTATUS {
    "notchecked",
    "exists",
    "doesntexist"
}
let STRONGHOLD = STRONGHOLDSTATUS.notchecked

core.event("org.bukkit.event.player.PlayerInteractEvent", (e)=>{
    const p = e.getPlayer()
    const w = p.getWorld()
    if(e.getItem()) if(e.getItem().getType().name() == "ENDER_EYE" && (e.getAction().name() == "RIGHT_CLICK_AIR"|| e.getAction().name() == "RIGHT_CLICK_BLOCK")) {
        if(STRONGHOLD == STRONGHOLDSTATUS.notchecked){
           
            if (w.locateNearestStructure(p.getLocation(), core.type("org.bukkit.StructureType")['STRONGHOLD'], 4000, true)) {
                STRONGHOLD = STRONGHOLDSTATUS.exists
            }
            else{
                STRONGHOLD = STRONGHOLDSTATUS.doesntexist
            }
        }
        if (STRONGHOLD == STRONGHOLDSTATUS.doesntexist) {
            w.spawnEntity(p.getLocation(), core.type("org.bukkit.entity.EntityType").ENDER_SIGNAL)
        }
        
    }
    
})
