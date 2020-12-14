const ais = this.global.mcu.ai;

const SpAirT4 = extendContent(UnitType, "javelin", {});
SpAirT4.constructor = () => extend(UnitEntity, {});
SpAirT4.defaultController = ais.flareAI(112);
SpAirT4.abilities.add(new MoveLightningAbility(21, 17, 0.1, 1.3, 4.2, Color.valueOf("#a9d8ff")));
SpAirT4.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 3, 60 * 4.25, 48));
SpAirT4.ammoType = AmmoTypes.powerHigh;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-spear"), Vars.content.getByName(ContentType.unit, "purple-air-javelin")]);
Blocks.exponentialReconstructor.upgrades.add(upgrade.toArray(UnitType));