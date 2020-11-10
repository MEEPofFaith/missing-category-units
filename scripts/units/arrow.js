const SpAirT2 = extendContent(UnitType, "arrow", {});
SpAirT2.constructor = () => extend(BuilderMinerUnit, {});
SpAirT2.defaultController = () => new FlyingAI();
SpAirT2.abilities.add(new MoveLightningAbility(27, 12, 0.15, 1.1, 4.5, Color.valueOf("#bf92f9")));
