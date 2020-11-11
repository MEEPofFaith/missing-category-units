const SuNavT1 = extendContent(UnitType, "rana", {});
SuNavT1.constructor = () => extend(UnitWaterMove, {});
SuNavT1.defaultController = () => new GroundAI();

SuNavT1.abilities.add(new RepairFieldAbility(10, 60 * 5, 24));
SuNavT1.abilities.add(new ShieldRegenFieldAbility(40, 50, 60 * 8, 24));

SuNavT1.ammoType = AmmoTypes.powerHigh;

Blocks.navalFactory.plans.add(new UnitFactory.UnitPlan(SuNavT1, 60 * 25, ItemStack.with(Items.silicon, 45, Items.metaglass, 25, Items.titanium, 20)));
