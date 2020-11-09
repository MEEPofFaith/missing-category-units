const SpAirT2 = extendContent(UnitType, "arrow", {});
SpAirT2.constructor = () => extend(MinerUnit, {});
SpAirT2.defaultController = () => new FlyingAI();
SpAirT2.abilities.add(new MoveLightningAbility(10, 8, 0.1, 1.5, 4, Color.valueOf("#665c9f")));
