//Doesn't work, but I'll leave it here anyways.
module.exports = {
  LightningAbility(damage, length, chance, minSpeed, maxSpeed, color, offset, heatRegion){
    const l = extend(MoveLightningAbility, {
      update(unit){
        var scl = Mathf.clamp((unit.vel().len() - minSpeed) / (maxSpeed - minSpeed));
        if(Mathf.chance(Time.delta * chance * scl)){
          var x = unit.x + Angles.trnsx(unit.rotation, offset, 0);
          var y = unit.y + Angles.trnsy(unit.rotation, offset, 0);
          Fx.sparkShoot.at(x, y, unit.rotation, color);
          Sounds.spark.at(unit);
          Lightning.create(unit.team, color, damage, x + unit.vel.x, y + unit.vel.y, unit.rotation, length);
        }
      },
      draw(unit){
        var scl = Mathf.clamp((unit.vel().len() - minSpeed) / (maxSpeed - minSpeed));
        if(heatRegion != Core.atlas.find("error") && scl > 0.00001){
          Draw.color(color);
          Draw.alpha(scl / 2);
          Draw.blend(Blending.additive);
          Draw.rect(heatRegion, unit.x + Mathf.range(scl / 2), unit.y + Mathf.range(scl / 2), unit.rotation - 90);
          Draw.blend();
        }
      }
    });
    
    return l;
  }
};