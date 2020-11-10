const SNavT1 = extendContent(UnitType, "rana", {});
SNavT1.constructor = () => extend(BuilderMinerUnit, {});
SNavT1.defaultController = () => new FlyingAI();

SpNavT1.abilities.add(new RepairFieldAbility(10, 60 * 5, 10));
SpNavT1.abilities.add(new ShieldRegenFieldAbility(10, 50, 60 * 7, 10));
