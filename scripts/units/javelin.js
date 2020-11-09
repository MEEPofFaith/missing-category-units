const SpAirT4 = extendContent(UnitType, "javelin", {});
SpAirT4.constructor = () => extend(MinerUnit, {});
SpAirT4.defaultController = () => new FlyingAI();
