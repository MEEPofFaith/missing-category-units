const ais = this.global.mcu.ai;

var minSpd = 1.2;
var maxSpd = 3.9;
var col = Color.valueOf("#a9d8ff");
//mmm yes code I am steal.
const SpAirT3 = extendContent(UnitType, "spear", {
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

SpAirT3.constructor = () => extend(UnitEntity, {});
SpAirT3.defaultController = ais.flareAI(120, [BlockFlag.battery, BlockFlag.generator, BlockFlag.core]);
SpAirT3.abilities.add(new MoveLightningAbility(7 * Vars.state.rules.unitDamageMultiplier, 14, 0.3, minSpd, maxSpd, Color.valueOf("#a9d8ff")));
SpAirT3.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 2, 60 * 3.5, 32));
SpAirT3.ammoType = AmmoTypes.power;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-dart"), Vars.content.getByName(ContentType.unit, "purple-air-spear")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));