const SpAirT4 = extendContent(UnitType, "javelin", {});
SpAirT4.constructor = () => extend(BuilderMinerUnit, {});
SpAirT4.defaultController = () => new FlyingAI();
SpAirT3.abilities.add(new MoveLightningAbility(58, 20, 0.25, 1.3, 6, Color.valueOf("#bf92f9")));
SpAirT4.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 450, 510, 64));
