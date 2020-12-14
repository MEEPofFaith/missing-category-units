const ais = this.global.mcu.ai;

const SpAirT3 = extendContent(UnitType, "spear", {});
SpAirT3.constructor = () => extend(UnitEntity, {});
SpAirT3.defaultController = ais.flareAI(96, [BlockFlag.battery, BlockFlag.generator, BlockFlag.core]);
SpAirT3.abilities.add(new MoveLightningAbility(18, 14, 0.1, 1.2, 3.9, Color.valueOf("#a9d8ff")));
SpAirT3.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 2, 60 * 3.5, 32));
SpAirT3.ammoType = AmmoTypes.power;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-dart"), Vars.content.getByName(ContentType.unit, "purple-air-spear")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));