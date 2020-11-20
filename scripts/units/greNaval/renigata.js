const ais = this.global.mcu.ai;

const SuNavT4 = extendContent(UnitType, "renigata", {});
SuNavT4.constructor = () => extend(UnitWaterMove, {});
SuNavT4.defaultController = ais.groundRepairAI;

var flareSpawnSeconds = 20;
var polySpawnSeconds = 25;

SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.poly, polySpawnSeconds * 60, 13.5, -8.5));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.poly, polySpawnSeconds * 60, -13.5, -8.5));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSpawnSeconds * 60, 5.75, -2));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSpawnSeconds * 60, -5.75, -2));
SuNavT4.abilities.add(new ShieldRegenFieldAbility(40, 120, 60 * 16, 32));
SuNavT4.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-protidae"), Vars.content.getByName(ContentType.unit, "purple-air-renigata")]);
Blocks.exponentialReconstructor.upgrades.add(upgrade.toArray(UnitType));
