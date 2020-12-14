const ais = this.global.mcu.ai;

const SpAirT5 = extendContent(UnitType, "harpoon", {});
SpAirT5.constructor = () => extend(UnitEntity, {});
SpAirT5.defaultController = ais.flareAI(136, [Blockflag.turret, Blockflag.factory, Blockflag.core]);
SpAirT5.abilities.add(new MoveLightningAbility(25, 20, 0.1, 1.4, 4.3, Color.valueOf("#a9d8ff")));
SpAirT5.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 4, 60 * 5, 64));
SpAirT5.ammoType = AmmoTypes.powerHigh;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-javelin"), Vars.content.getByName(ContentType.unit, "purple-air-harpoon")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));