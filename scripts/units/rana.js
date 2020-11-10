const SNavT1 = extendContent(UnitType, "rana", {});
SNavT1.constructor = () => extend(NavalUnit, {});
SNavT1.defaultController = () => new GroundAI();
