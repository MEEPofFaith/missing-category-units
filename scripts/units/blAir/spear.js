const ais = require("libs/ai");

let minSpd = 1.2;
let maxSpd = 3.9;
let col = Color.valueOf("#a9d8ff");
const SpAirT3 = extend(UnitType, "spear", {
  ammoType: new PowerAmmoType(1000)
});

SpAirT3.constructor = () => extend(UnitEntity, {});
SpAirT3.defaultController = ais.flareAI(120, [BlockFlag.battery, BlockFlag.generator, BlockFlag.core]);
SpAirT3.abilities.add(new MoveLightningAbility(7 * Vars.state.rules.unitDamageMultiplier, 14, 0.3, 42/4, minSpd, maxSpd, Color.valueOf("#a9d8ff"), "purple-air-spear-heat"));
SpAirT3.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 2, 60 * 3.5, 32));