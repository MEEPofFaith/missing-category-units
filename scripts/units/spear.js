const SpAirT3 = extendContent(UnitType, "spear", {});
SpAirT3.constructor = () => extend(MinerUnit, {});
SpAirT3.defaultController = () => new FlyingAI();
public static @EntityDef({Unitc.class, Builderc.class, Minerc.class, Trailc.class}) UnitType spear;
