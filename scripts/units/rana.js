const SNavT1 = extendContent(UnitType, "rana", {});
SNavT1.constructor = () => extend(Unit, {});
SNavT1.defaultController = () => new GroundAI();

Blocks.navalFactory.plans.add(new UnitFactory.UnitPlan(SNavT1, 60 * 25, ItemStack.with(Items.silicon, 45, Items.lead, 25, Items.titanium, 20)));
