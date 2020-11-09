const SpAirT2 = extendContent(UnitType, "javelin", {});
SpAirT2.constructor = () => extend(MinerUnit, {});
SpAirT2.defaultController = () => new FlyingAI();
