const ais = this.global.mcu.ai;

var minSpd = 1.3;
var maxSpd = 4.2;
var col = Color.valueOf("#a9d8ff");
//mmm yes code I am steal.
const SpAirT4 = extendContent(UnitType, "javelin", {
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

SpAirT4.constructor = () => extend(UnitEntity, {});
SpAirT4.defaultController = ais.flareAI(160, [BlockFlag.turret, BlockFlag.factory, BlockFlag.battery, BlockFlag.generator, BlockFlag.core]);
SpAirT4.abilities.add(new MoveLightningAbility(8.4 * Vars.state.rules.unitDamageMultiplier, 17, 0.3, minSpd, maxSpd, Color.valueOf("#a9d8ff")));
SpAirT4.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 3, 60 * 4.25, 48));
SpAirT4.ammoType = AmmoTypes.powerHigh;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-spear"), Vars.content.getByName(ContentType.unit, "purple-air-javelin")]);
Blocks.exponentialReconstructor.upgrades.add(upgrade.toArray(UnitType));