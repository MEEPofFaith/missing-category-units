const ais = require("libs/ai");

const SuNavT1 = extendContent(UnitType, "rana", {
  fireRange: 20,
  ammoType: AmmoTypes.powerLow
});
SuNavT1.constructor = () => extend(UnitWaterMove, {});
SuNavT1.defaultController = ais.groundFireFighterAI;
SuNavT1.abilities.add(new RepairFieldAbility(10, 60 * 5, 24));
SuNavT1.abilities.add(new ShieldRegenFieldAbility(20, 60, 60 * 12, 24));