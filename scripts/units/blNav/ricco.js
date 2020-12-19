const ais = this.global.mcu.ai;

const SpNavT1 = extendContent(UnitType, "ricco", {});
SpNavT1.constructor = () => extend(UnitWaterMove, {});
SpNavT1.defaultController = ais.groundConstantFireAI;

Blocks.navalFactory.plans.add(new UnitFactory.UnitPlan(SpNavT1, 60 * 25, ItemStack.with(Items.silicon, 55, Items.metaglass, 35, Items.copper, 20, Items.lead, 20)));