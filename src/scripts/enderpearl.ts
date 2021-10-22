
import * as core from '@grakkit/stdlib-paper'
const Location = core.type("org.bukkit.Location")
const data = core.data("/legendarios/" + "End Portal Frame" + "/");

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
