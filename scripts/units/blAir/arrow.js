const SpAirT2 = extendContent(UnitType, "arrow", {});
SpAirT2.constructor = () => extend(BuilderUnit, {});
SpAirT2.abilities.add(new MoveLightningAbility(17, 12, 0.11, 0.9, 3.7, Color.valueOf("#a9d8ff")));
SpAirT2.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-dart"), Vars.content.getByName(ContentType.unit, "purple-air-arrow")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));