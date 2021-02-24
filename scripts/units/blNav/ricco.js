const ais = require("libs/ai");

const SpNavT1 = extendContent(UnitType, "ricco", {});
SpNavT1.constructor = () => extend(UnitWaterMove, {});
SpNavT1.defaultController = ais.groundConstantFireAI;