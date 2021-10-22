const stdlib = require('@grakkit/stdlib-paper');
import * as core from '@grakkit/stdlib-paper'
core.event('org.bukkit.event.inventory.InventoryClickEvent', (event) => {
    const inventory = event.getWhoClicked().getInventory()
    const selectedItem = event.getCursor()
    const helmet = inventory.getHelmet()
    if (event.getSlot() == 39) {
        const a : any = event
        a.setCursor(helmet)
        event.setCancelled(true)
        inventory.setItem(39, selectedItem)

    }   
 });