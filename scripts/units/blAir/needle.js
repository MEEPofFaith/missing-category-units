const ais = require("libs/ai");

var minSpd = 1;
var maxSpd = 3.1;
var col = Color.valueOf("#a9d8ff");
const SpAirT1 = extendContent(UnitType, "needle", {});

SpAirT1.constructor = () => extend(UnitEntity, {});
SpAirT1.defaultController = ais.noWeaponFlareAI(70, [BlockFlag.factory, BlockFlag.battery, BlockFlag.generator, BlockFlag.core]);
SpAirT1.abilities.add(new MoveLightningAbility(6 * Vars.state.rules.unitDamageMultiplier, 8, 0.3, 17/4, minSpd, maxSpd, col, "purple-air-needle-heat"));