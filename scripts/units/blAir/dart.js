const SpAirT2 = extendContent(UnitType, "dart", {});
SpAirT2.constructor = () => extend(BuilderUnit, {});
SpAirT2.abilities.add(new MoveLightningAbility(16, 11, 0.1, 1.1, 3.3, Color.valueOf("#a9d8ff")));
SpAirT2.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-needle"), Vars.content.getByName(ContentType.unit, "purple-air-dart")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));