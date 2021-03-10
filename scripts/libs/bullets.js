module.exports = {
  newTractorBeam(force, scaledForce){
    var tractorBeam = extend(BulletType, {
      collision(other, x, y){
        this.hit(this.base(), x, y);
        if(other instanceof Healthc){
          var t = other;
          t.damage(this.damage);
        }
        if(other instanceof Unit){
          var unit = other;
          unit.impulse(Tmp.v3.set(unit).sub(this).limit((force + (1 - unit.dst(this) / this.range()) * scaledForce)));
          unit.apply(this.status, this.statusDuration);
        }
        if(!this.pierce){
          this.remove();
        }else{
          this.collided.add(other.id());
        }
      },
      update(b){
        if(!b) return;
        this.super$update(b);
        
        var target = Damage.linecast(b, b.x, b.y, b.rotation(), this.length);
        b.data = target;
        
        if(target instanceof Hitboxc){
          if(b.timer.get(1, 5)){
            var hit = target;

            hit.collision(b, hit.x, hit.y);
            b.collision(hit, hit.x, hit.y);
          }
        }else if(target instanceof Building){
          if(b.timer.get(1, 5)){
            var tile = target;

            if(tile.collide(b)){
              tile.collision(b);
              this.hit(b, tile.x, tile.y);
            }
          }
        }else{
          b.data = new Vec2().trns(b.rotation(), this.length).add(b.x, b.y);
        }
      },
      range(){
        return this.length;
      },
      draw(b){
        if(b.data instanceof Position){
          var data = b.data;
          Tmp.v1.set(data);
          
          var fin = Mathf.curve(b.fin(), 0, this.growTime / b.lifetime);
          var fout = 1 - Mathf.curve(b.fin(), (b.lifetime - this.fadeTime) / b.lifetime, 1);
          var lWidth = fin * fout * this.width;
          
          var widthScls = [1.8, 1];

          for(var i = 0; i < 2; i++){
            Draw.color(this.colors[i])
            Lines.stroke(lWidth * widthScls[i]);
            Lines.line(b.x, b.y, Tmp.v1.x, Tmp.v1.y, false);
            Fill.circle(b.x, b.y, Lines.getStroke() / 1.25);
            Fill.circle(Tmp.v1.x, Tmp.v1.y, Lines.getStroke() / 1.25);
            Draw.reset();
          }

          Drawf.light(Team.derelict, b.x, b.y, Tmp.v1.x, Tmp.v1.y, 15 * fin * fout + 5, this.colors[1], 0.6);
        }
      },

      speed: 0.0001,
      damage: 3, // * 12 = dps
      knockback: -0.5,
      colors: [Pal.heal, Color.white],
      length: 160,
      width: 2,
      maxRange: 160,
      absorbable: false,
      collidesTiles: false,
      collidesGround: false,
      hittable: false,
      keepVelocity: false,
      pierce: true,
      hitSize: 0,
      lifetime: 45,
      fadeTime: 10,
      growTime: 10,
      smokeEffect: Fx.none,
      shootEffect: Fx.none,
      hitEffect: Fx.none,
      despawnEffect: Fx.none
    });

    return tractorBeam;
  }
}