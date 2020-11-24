const Plyr = extendContent(UnitType, "playerunit", {});
Plyr.constructor = () => extend(UnitEntity, {});
//Plyr.defaultController = FlyingAI;