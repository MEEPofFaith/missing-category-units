const ais = this.global.mcu.ai;

const SpAirT1 = extendContent(UnitType, "needle", {});
SpAirT1.constructor = () => extend(UnitEntity, {});
SpAirT1.defaultController = ais.noWeaponFlareAI(64);
SpAirT1.abilities.add(new MoveLightningAbility(15, 8, 0.1, 1, 3.1, Color.valueOf("#a9d8ff")));

Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(SpAirT1, 60 * 25, ItemStack.with(Items.silicon, 45, Items.copper, 20, Items.lead, 25)));