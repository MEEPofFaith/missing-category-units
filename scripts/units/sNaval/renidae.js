const SuNavT2 = extendContent(UnitType, "renidae", {});
SuNavT2.constructor = () => extend(UnitWaterMove, {});
SuNavT2.abilities.add(new UnitSpawnAbility(UnitTypes.mono, 60 * 30, 0, -5));
SpAirT4.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 8, 60 * 8.75, 64));
SuNavT2.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-rana"), Vars.content.getByName(ContentType.unit, "purple-air-renidae")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
