const ais = this.global.mcu.ai;

const SuNavT3 = extendContent(UnitType, "protidae", {});
SuNavT3.constructor = () => extend(UnitWaterMove, {});
SuNavT3.defaultController = ais.groundRepairAI;
SuNavT3.abilities.add(new UnitSpawnAbility(UnitTypes.mono, 60 * 30, 0, -7.5));
SuNavT3.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));
SuNavT3.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-renidae"), Vars.content.getByName(ContentType.unit, "purple-air-protidae")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));