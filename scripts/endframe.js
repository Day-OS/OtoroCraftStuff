const itemstack = core.type("org.bukkit.inventory.ItemStack");
const MATERIAL = core.type("org.bukkit.Material");
const specials = require("./itensespeciaiskk.js");
const ChatColor = core.type("org.bukkit.ChatColor");
const endframeItem = new itemstack(MATERIAL.END_PORTAL_FRAME);
specials.convertToRare(endframeItem, [ChatColor.RESET + "" + ChatColor.GREEN + "Cria um portal instantâneamente em um espaço 3x1x3.", ChatColor.RESET + "" + ChatColor.GREEN + "Interaja com o núcleo para pega-lo."]);
core.event("org.bukkit.event.block.BlockPlaceEvent", (evt) => {
    const bloco = evt.getBlockPlaced();
    if (evt.getBlockPlaced().getBlockData().getMaterial().name() == "END_PORTAL_FRAME") {
        function check(nx, nz) {
            if (bloco.getWorld().getBlockAt(bloco.getX() + nx, bloco.getY(), bloco.getZ() + nz).getBlockData().getMaterial().name() == "AIR")
                return true;
            else
                return false;
        }
        function criarportal() {
            function addframe(nx, nz) {
                const block = bloco.getWorld().getBlockAt(bloco.getX() + nx, bloco.getY(), bloco.getZ() + nz);
                block.setType(MATERIAL.END_PORTAL_FRAME);
            }
            addframe(1, 0);
            addframe(-1, 0);
            addframe(1, 1);
            addframe(-1, 1);
            addframe(0, 1);
            addframe(0, -1);
            addframe(1, -1);
            addframe(-1, -1);
            setTimeout(() => { bloco.getWorld().getBlockAt(bloco.getX(), bloco.getY(), bloco.getZ()).setType(MATERIAL.END_PORTAL); }, 100);
        }
        if (check(1, 0) && check(-1, 0) && check(1, 1) && check(-1, 1) &&
            check(0, 1) && check(0, -1) && check(1, -1) && check(-1, -1)) {
            criarportal();
            specials.saveCoords("End Portal Frame", evt.getBlockPlaced().getLocation());
        }
        else
            evt.setCancelled(true);
    }
});
core.event("org.bukkit.event.player.PlayerInteractEvent", (evt) => {
    if (evt.getClickedBlock()) {
        if (evt.getClickedBlock().getBlockData().getMaterial().name() == "END_PORTAL") {
            evt.setCancelled(true);
            const block = evt.getClickedBlock();
            if (evt.getPlayer().getInventory().getItemInMainHand().getType().name() == "AIR") {
                for (let X = -1; X < 2; X++) {
                    for (let Z = -1; Z < 2; Z++) {
                        const blocki = block.getWorld().getBlockAt(block.getLocation().getX() + X, block.getLocation().getY(), block.getLocation().getZ() + Z);
                        blocki.setType(MATERIAL.AIR);
                        evt.getPlayer().getInventory().setItemInMainHand(endframeItem);
                    }
                }
            }
        }
    }
});
core.command({ name: "endframespawn", permission: "group.coder", execute: (s) => {
        specials.spawnItem(endframeItem, s);
    } });
