const Thrust = extendContent(UnitType, "thrust", {});
Thrust.constructor = () => extend(UnitEntity, {});
Thrust.defaultController = FlyingAI;