const ais = this.global.mcu.ai;

var minSpd = 1.2;
var maxSpd = 3.9;
var col = Color.valueOf("#a9d8ff");
//mmm yes code I am steal.
const SpAirT3 = extendContent(UnitType, "spear", {});

SpAirT3.constructor = () => extend(UnitEntity, {});
SpAirT3.defaultController = ais.flareAI(120, [BlockFlag.battery, BlockFlag.generator, BlockFlag.core]);
SpAirT3.abilities.add(new MoveLightningAbility(7 * Vars.state.rules.unitDamageMultiplier, 14, 0.3, 42/4, minSpd, maxSpd, Color.valueOf("#a9d8ff"), "purple-air-spear-heat"));
SpAirT3.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 2, 60 * 3.5, 32));
SpAirT3.ammoType = AmmoTypes.power;