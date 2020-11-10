const SpAirT3 = extendContent(UnitType, "spear", {});
SpAirT3.constructor = () => extend(BuilderMinerUnit, {});
SpAirT3.defaultController = () => new FlyingAI();
SpAirT3.abilities.add(new MoveLightningAbility(35, 16, 0.2, 1.2, 5, Color.valueOf("#bf92f9")));
SpAirT3.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 300, 390, 48));