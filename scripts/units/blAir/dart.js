const ais = require("libs/ai");

let minSpd = 1.1;
let maxSpd = 3.3;
let col = Color.valueOf("#a9d8ff");
const SpAirT2 = extend(UnitType, "dart", {
  ammoType: new PowerAmmoType(500)
});

SpAirT2.constructor = () => extend(UnitEntity, {});
SpAirT2.defaultController = ais.flareAI(95, [BlockFlag.factory, BlockFlag.battery, BlockFlag.generator, BlockFlag.core]);
SpAirT2.abilities.add(new MoveLightningAbility(6.4 * Vars.state.rules.unitDamageMultiplier, 11, 0.3, 19/4, minSpd, maxSpd, Color.valueOf("#a9d8ff"), "purple-air-dart-heat"));