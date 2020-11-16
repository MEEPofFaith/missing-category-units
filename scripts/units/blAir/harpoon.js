const SpAirT5 = extendContent(UnitType, "harpoon", {});
SpAirT5.constructor = () => extend(BuilderUnit, {});
SpAirT5.ammoType = AmmoTypes.powerHigh;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-javelin"), Vars.content.getByName(ContentType.unit, "purple-air-harpoon")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
