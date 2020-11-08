const SpAirT1 = extendContent(UnitType, "dart", {});
SpAirT1.constructor = () => extend(MinerUnit, {});
SpAirT1.defaultController = () => new FlyingAI();
SpAirT1.abilities.add(new MoveLightningAbility(10, 8, 0.1, 1.5, 4, Color.valueOf("a9d8ff")));