const ais = this.global.mcu.ai;

var minSpd = 1.4;
var maxSpd = 4.3;
var col = Color.valueOf("#a9d8ff");
//mmm yes code I am steal.
const SpAirT5 = extendContent(UnitType, "harpoon", {
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

SpAirT5.constructor = () => extend(UnitEntity, {});
SpAirT5.defaultController = ais.flareAI(200, [BlockFlag.turret, BlockFlag.factory, BlockFlag.core]);
SpAirT5.abilities.add(new MoveLightningAbility(16 * Vars.state.rules.unitDamageMultiplier, 20, 0.3, minSpd, maxSpd, Color.valueOf("#a9d8ff")));
SpAirT5.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 4, 60 * 5, 64));
SpAirT5.ammoType = AmmoTypes.powerHigh;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-javelin"), Vars.content.getByName(ContentType.unit, "purple-air-harpoon")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));