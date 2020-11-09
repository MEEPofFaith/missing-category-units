const SpAirT4 = extendContent(UnitType, "javelin", {});
SpAirT4.constructor = () => extend(BuilderMinerUnit, {});
SpAirT4.defaultController = () => new FlyingAI();
SpAirT4.abilities.add(new MoveLightningAbility(14, 16, 0.15, 2, 5, Color.valueOf("#bf92f9")));
SpAirT4.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 150, 200, 64));