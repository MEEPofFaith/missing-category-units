const SpAirT2 = extendContent(UnitType, "arrow", {});
SpAirT2.constructor = () => extend(MinerUnit, {});
SpAirT2.defaultController = () => new FlyingAI();
SpAirT2.abilities.add(new MoveLightningAbility(11, 12, 0.15, 1.75, 4.5, Color.valueOf("#bf92f9")));
