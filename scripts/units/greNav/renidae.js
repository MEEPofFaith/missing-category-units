const ais = require("libs/ai");

const SuNavT2 = extend(UnitType, "renidae", {
  ammoTyps: AmmoTypes.power
});
SuNavT2.constructor = () => extend(UnitWaterMove, {});
SuNavT2.defaultController = ais.groundRepairAI;
SuNavT2.abilities.add(new UnitSpawnAbility(UnitTypes.mono, 60 * 60, 0, -5));
SuNavT2.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));