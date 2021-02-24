const ais = require("libs/ai");

var minSpd = 1.1;
var maxSpd = 3.3;
var col = Color.valueOf("#a9d8ff");
const SpAirT2 = extendContent(UnitType, "dart", {
  ammoType: AmmoTypes.powerLow
});

SpAirT2.constructor = () => extend(UnitEntity, {});
SpAirT2.defaultController = ais.flareAI(95, [BlockFlag.factory, BlockFlag.battery, BlockFlag.generator, BlockFlag.core]);
SpAirT2.abilities.add(new MoveLightningAbility(6.4 * Vars.state.rules.unitDamageMultiplier, 11, 0.3, 19/4, minSpd, maxSpd, Color.valueOf("#a9d8ff"), "purple-air-dart-heat"));