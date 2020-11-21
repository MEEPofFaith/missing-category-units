const radius = 3;
const lifetime = 3;

const endPoint = new Effect(lifetime, e => {
  Draw.color(Pal.heal);
  Fill.circle(e.x, e.y, radius * 2);
  Draw.color(Color.white);
  Fill.circle(e.x, e.y, radius * 1.25);
});
endPoint.layer = Layer.bullet;

const colors = [Pal.heal, Color.white];
const widths = [1.75, 1];
const widthsScl = [1, 0.5, 0.2];
const length = 4;
const lengths = [1, 1.3, 1.6];

const tractorLaser = new Effect(lifetime, e => {
  for(var c = 0; c < colors.length; c++){
    Draw.color(colors[c]);
    for(var l = 0; l < lengths.length; l++){
      Lines.stroke(radius * widths[c] * widthsScl[l]);
      Lines.lineAngle(e.x, e.y, e.rotation, length * lengths[l], false);
      Lines.lineAngle(e.x, e.y, e.rotation + 180, length * lengths[l], false);
    }
    Draw.reset();
  }
});
tractorLaser.layer = Layer.bullet;

const tractorBeam = extend(PointBulletType, {});
tractorBeam.speed = 100;
tractorBeam.damage = 1;
tractorBeam.knockback = -4;
tractorBeam.collidesGround = false;
tractorBeam.collidesTiles = false;
tractorBeam.shootEffect = endPoint;
tractorBeam.despawnEffect = endPoint;
tractorBeam.smokeEffect = Fx.none;
tractorBeam.hitEffect = Fx.none;
tractorBeam.trailEffect = tractorLaser;
tractorBeam.trailSpacing = 20;

const tractorBeamWeapon = extendContent(Weapon, "purple-air-renigata-parallax", {});
tractorBeamWeapon.mirror = false;
tractorBeamWeapon.x = 0;
tractorBeamWeapon.y = -9.5;
tractorBeamWeapon.shootY = 6;
tractorBeamWeapon.recoil = 0;
tractorBeamWeapon.reload = 1;
tractorBeamWeapon.rotate = true;
tractorBeamWeapon.shootSound = Sounds.none;
tractorBeamWeapon.bullet = tractorBeam;
tractorBeamWeapon.recoil = 0;

//const ais = this.global.mcu.ai;

const SuNavT4 = extendContent(UnitType, "renigata", {});
SuNavT4.constructor = () => extend(UnitWaterMove, {});
//SuNavT4.defaultController = ais.groundRepairAI;

var flareSpawnSeconds = 25;
var polySpawnSeconds = 45;

SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.poly, polySpawnSeconds * 60, 34/4, -68/4));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.poly, polySpawnSeconds * 60, -34/4, -68/4));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSpawnSeconds * 60, 32/4, -6/4));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSpawnSeconds * 60, -32/4, -6/4));
SuNavT4.abilities.add(new ShieldRegenFieldAbility(40, 120, 60 * 16, 32));
SuNavT4.ammoType = AmmoTypes.power;
SuNavT4.weapons.add(tractorBeamWeapon);

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-protidae"), Vars.content.getByName(ContentType.unit, "purple-air-renigata")]);
Blocks.exponentialReconstructor.upgrades.add(upgrade.toArray(UnitType));
