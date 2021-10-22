"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stdlib = require('@grakkit/stdlib-paper');
const core = require("@grakkit/stdlib-paper");
core.event('org.bukkit.event.inventory.InventoryClickEvent', (event) => {
    const inventory = event.getWhoClicked().getInventory();
    const selectedItem = event.getCursor();
    const helmet = inventory.getHelmet();
    if (event.getSlot() == 39) {
        const a = event;
        a.setCursor(helmet);
        event.setCancelled(true);
        inventory.setItem(39, selectedItem);
    }
});
