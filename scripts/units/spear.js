const SpAirT3 = extendContent(UnitType, "spear", {});
SpAirT3.constructor = () => extend(MinerUnit, {});
SpAirT3.defaultController = () => new FlyingAI();
