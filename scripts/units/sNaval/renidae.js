const SuNavT2 = extendContent(UnitType, "renidae", {});
SuNavT2.constructor = () => {
  const unit = extend(BuilderUnit, {});
  return unit;
}
SuNavT2.abilities.add(new MoveLightningAbility(27, 12, 0.15, 0.9, 4, Color.valueOf("#bf92f9")));
SuNavT2.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-rana"), Vars.content.getByName(ContentType.unit, "purple-air-renidae")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
