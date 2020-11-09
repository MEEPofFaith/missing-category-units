const SpAirT3 = extendContent(UnitType, "spear", {});
SpAirT3.constructor = () => extend(BuilderMinerUnit, {});
SpAirT3.defaultController = () => new FlyingAI();
SpAirT3.abilities.add(new MoveLightningAbility(14, 16, 0.15, 2, 5, Color.valueOf("#bf92f9")));
SpAirT3.abilities.add(new StatusFieldAbility(Status.overdrive, 300, 450, 40));