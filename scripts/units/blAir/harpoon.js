const ais = require("libs/ai");

let minSpd = 1.4;
let maxSpd = 4.3;
let col = Color.valueOf("#a9d8ff");
//mmm yes code I am steal.
const SpAirT5 = extend(UnitType, "harpoon", {
  ammoType: AmmoTypes.powerHigh
});

SpAirT5.constructor = () => extend(UnitEntity, {});
SpAirT5.defaultController = ais.flareAI(200, [BlockFlag.turret, BlockFlag.factory, BlockFlag.core]);
SpAirT5.abilities.add(new MoveLightningAbility(16 * Vars.state.rules.unitDamageMultiplier, 20, 0.3, 162/4, minSpd, maxSpd, Color.valueOf("#a9d8ff"), "purple-air-harpoon-heat"));
SpAirT5.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 4, 60 * 5, 64));