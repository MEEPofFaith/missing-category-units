const ais = this.global.mcu.ai;

var minSpd = 1.3;
var maxSpd = 4.2;
var col = Color.valueOf("#a9d8ff");
//mmm yes code I am steal.
const SpAirT4 = extendContent(UnitType, "javelin", {});

SpAirT4.constructor = () => extend(UnitEntity, {});
SpAirT4.defaultController = ais.flareAI(160, [BlockFlag.turret, BlockFlag.factory, BlockFlag.battery, BlockFlag.generator, BlockFlag.core]);
SpAirT4.abilities.add(new MoveLightningAbility(8.4 * Vars.state.rules.unitDamageMultiplier, 17, 0.3, 104/4, minSpd, maxSpd, Color.valueOf("#a9d8ff"), "purple-air-javelin-heat"));
SpAirT4.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 3, 60 * 4.25, 48));
SpAirT4.ammoType = AmmoTypes.powerHigh;