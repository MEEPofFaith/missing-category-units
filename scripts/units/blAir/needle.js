const ais = this.global.mcu.ai;

var minSpd = 1;
var maxSpd = 3.1;
var col = Color.valueOf("#a9d8ff");
//mmm yes code I am steal.
const SpAirT1 = extendContent(UnitType, "needle", {
  load(){
    this.super$load();
    this.heat = Core.atlas.find(this.name + "-heat");
  },
  draw(u){
    this.super$draw(u);
    
    var scl = Mathf.clamp((u.vel.len() - minSpd) / (maxSpd - minSpd));
    if(scl <= 0.00001 || this.heat == Core.atlas.find("error")) return;
    Draw.color(col);
    Draw.alpha(scl / 2);
    Draw.blend(Blending.additive);
    Draw.rect(this.heat, u.x + Mathf.range(scl / 2), u.y + Mathf.range(scl / 2), u.rotation - 90);
    Draw.blend();
    Draw.reset();
  }
});

SpAirT1.constructor = () => extend(UnitEntity, {});
SpAirT1.defaultController = ais.noWeaponFlareAI(70, [BlockFlag.factory, BlockFlag.battery, BlockFlag.generator, BlockFlag.core]);
SpAirT1.abilities.add(new MoveLightningAbility(6 * Vars.state.rules.unitDamageMultiplier, 8, 0.3, minSpd, maxSpd, col));

Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(SpAirT1, 60 * 25, ItemStack.with(Items.silicon, 45, Items.copper, 20, Items.lead, 25)));