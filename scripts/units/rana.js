  
const SNavT1 = extendContent(UnitType, "rana", {});
SNavT1.constructor = () => extend(BuilderMinerUnit, {});
SNavT1.defaultController = () => new FlyingAI();
