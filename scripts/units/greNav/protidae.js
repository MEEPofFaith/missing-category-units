const ais = require("libs/ai");

const SuNavT3 = extendContent(UnitType, "protidae", {
  ammoType: AmmoTypes.power
});
SuNavT3.constructor = () => extend(UnitWaterMove, {});
SuNavT3.defaultController = ais.groundRepairAI;
SuNavT3.abilities.add(new UnitSpawnAbility(UnitTypes.mono, 60 * 30, 0, -7.5));
SuNavT3.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));