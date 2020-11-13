const SuNavT2 = extendContent(UnitType, "renidae", {});
SuNavT2.constructor = () => {
  const unit = extend(UnitWaterMove, {});
  return unit;
}

SuNavT2.abilities.add(new UnitSpawnAbility(UnitTypes.mono, 60 * 30, 0, -5));
SuNavT2.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-rana"), Vars.content.getByName(ContentType.unit, "purple-air-renidae")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
