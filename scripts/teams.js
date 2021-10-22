const TEAM = core.type("org.bukkit.scoreboard.Team");
const TEAMO = core.type("org.bukkit.scoreboard.Team.Option");
const TEAMOS = core.type("org.bukkit.scoreboard.Team.OptionStatus");
const BUKKIT = core.type("org.bukkit.Bukkit");
const scoreBoardmng = BUKKIT.getScoreboardManager();
const scoreBoard = scoreBoardmng.getMainScoreboard();
let DEFAULT;
function updateTEAM(team) {
    team.setColor(core.type("org.bukkit.ChatColor").WHITE);
    team.setAllowFriendlyFire(true);
    team.setOption(TEAMO.NAME_TAG_VISIBILITY, TEAMOS.NEVER);
}
if (scoreBoard.getTeam("default")) {
    DEFAULT = scoreBoard.getTeam("default");
    updateTEAM(DEFAULT);
}
else
    DEFAULT = scoreBoard.registerNewTeam("default");
updateTEAM(DEFAULT);
core.event("org.bukkit.event.player.PlayerJoinEvent", (e) => { DEFAULT.addEntry(e.getPlayer().getName()); });
