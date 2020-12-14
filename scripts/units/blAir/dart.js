const ais = this.global.mcu.ai;

var minSpd = 1.1;
var maxSpd = 3.3;
var col = Color.valueOf("#a9d8ff");
//mmm yes code I am steal.
const SpAirT2 = extendContent(UnitType, "dart", {
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

SpAirT2.constructor = () => extend(UnitEntity, {});
SpAirT2.defaultController = ais.flareAI(95, [BlockFlag.factory, BlockFlag.battery, BlockFlag.generator, BlockFlag.core]);
SpAirT2.abilities.add(new MoveLightningAbility(6.4 * Vars.state.rules.unitDamageMultiplier, 11, 0.3, minSpd, maxSpd, Color.valueOf("#a9d8ff")));
SpAirT2.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-needle"), Vars.content.getByName(ContentType.unit, "purple-air-dart")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));