const bullets = require("libs/bullets");
const ais = require("libs/ai");

const SuNavT5 = extendContent(UnitType, "urodela", {
  ammoType: AmmoTypes.powerHigh
});
SuNavT5.constructor = () => extend(UnitWaterMove, {});
SuNavT5.defaultController = ais.groundRepairAI;

const AAbullet = extend(FlakBulletType, {
  sprite: "missile",
  height: 8,
  explodeRange: 25,
  splashDamage: 20,
  splashDamgeRadius: 45,
  homingRange: 12 * 8,
  homingPower: 0.15,
  trailChance: 0.2,
  lifetime: 35,
  speed: 5,
  backColor: Pal.missileYellowBack,
  frontColor: Pal.missileYellow,
  hitSound: Sounds.explosion,
  weaveMag: 6,
  weaveScale: 3,
  collidesTiles: false
});

const AA = extendContent(Weapon, "purple-air-renigata-aa", {
  bullet: AAbullet,
  rotate: true,
  rotateSpeed: 8,
  reload: 5,
  inaccurcay: 5,
  shootSound: Sounds.missile,
  alternate: false,
  x: 98 / 4,
  y: 41 / 4
});

const AA2 = extendContent(Weapon, "purple-air-renigata-aa", {
  bullet: AAbullet,
  rotate: true,
  rotateSpeed: 8,
  reload: 5,
  shootSound: Sounds.missile,
  alternate: false,
  x: 0,
  y: 55 / 4,
  mirror: false
});

const AA3 = extendContent(Weapon, "purple-air-renigata-aa", {
  bullet: AAbullet,
  rotate: true,
  rotateSpeed: 8,
  reload: 5,
  shootSound: Sounds.missile,
  alternate: false,
  x: 0,
  y: 96 / 4,
  mirror: false
});

const tractorBeam = bullets.newTractorBeam(11, 720);
var range = 142;
tractorBeam.length = range;
tractorBeam.maxRange = range;
tractorBeam.lifetime = 120;
//Doesn't work due to how the code works in BulletComp.java
/*tractorBeam.collidesTiles = true;
tractorBeam.collidesTeam = true;
tractorBeam.healPercent = 4;*/

const tBDouble = extendContent(Weapon, "purple-air-renigata-parallax", {
  x: 94 / 4,
  y: -80 / 4,
  shootY: 6,
  recoil: 0,
  reload: 29,
  rotate: true,
  continuous: true,
  shootSound: Sounds.tractorbeam,
  bullet: tractorBeam
});

const fTBDouble = extendContent(Weapon, "purple-air-renigata-parallax", {
  x: 41 / 4,
  y: 10 / 4,
  shootY: 6,
  recoil: 0,
  reload: 30,
  rotate: true,
  continuous: true,
  shootSound: Sounds.tractorbeam,
  bullet: tractorBeam
});

const ffTBDouble = extendContent(Weapon, "purple-air-renigata-parallax", {
  x: 35 / 4,
  y: 122 / 4,
  shootY: 6,
  recoil: 0,
  reload: 31,
  rotate: true,
  continuous: true,
  shootSound: Sounds.tractorbeam,
  bullet: tractorBeam
});

//Fx.sapExplosion, but green
const plasmaExplosion = new Effect(25, e => {
  Draw.color(Pal.heal);

  e.scaled(6, s => {
    Lines.stroke(3 * s.fout());
    Lines.circle(e.x, e.y, 3 + s.fin() * 80);
  });

  Draw.color(Color.white);

  Angles.randLenVectors(e.id, 9, 2 + 70 * e.finpow(), (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 4 + 0.5);
  });

  Draw.color(Color.valueOf("73D188"));
  Lines.stroke(1 * e.fout());

  Angles.randLenVectors(e.id + 1, 8, 1 + 60 * e.finpow(), (x, y) => {
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), 1 + e.fout() * 3);
  });
})

const cluster = extend(BasicBulletType, {
  speed: 3,
  sprite: "large-bomb",
  hitEffect: plasmaExplosion,
  knockback: 0.6,
  lifetime: 70,
  width: 20,
  height: 20,
  shrinkX: 0.5,
  shrinkY: 0.5,
  spin: 2,
  damage: 10,
  splashDamageRadius: 50,
  splashDamage: 15,
  backColor: Pal.heal,
  frontColor: Color.white,
  mixColorTo: Color.white,
  hitSound: Sounds.plasmaboom,
  lightningColor: Pal.heal,
  lightning: 2,
  lightningLength: 5,
  smokeEffect: Fx.shootBigSmoke2,
  hitShake: 3,
  scaleVelocity: true,
  collidesTiles: false,
  collides: false,
  collidesAir: false,
  shootEffect: Fx.shootBig,
  trailEffect: Fx.artilleryTrail,
  healPercent: 10
});

const shell = extend(BasicBulletType, {
  speed: 4,
  damage: 16,
  splashDamage: 40,
  splashDamageRadius: 60,
  knockback: 0.5,
  sprite: "large-bomb",
  width: 25,
  height: 25,
  shrinkX: 0.2,
  shrinkY: 0.2,
  spin: 2,
  lifetime: 90,
  despawnEffect: Fx.greenBomb,
  hitEffect: Fx.massiveExplosion,
  backColor: Pal.heal,
  frontColor: Color.white,
  mixColorTo: Color.white,
  hitSound: Sounds.plasmaboom,
  scaleVelocity: true,
  collidesTiles: false,
  collides: false,
  collidesAir: false,
  hitShake: 1,
  shootEffect: Fx.shootBig,
  trailEffect: Fx.artilleryTrail,
  healPercent: 10,
  fragLifeMin: 0.3,
  //fragLifeMax: 2,
  fragBullets: 20,
  fragBullet: cluster
});

//Back center: (0, -116) Done: Giant heal artillery (Base off Toxopid)
const healxopid = extendContent(Weapon, "purple-air-urodela-cannon", {
  x: 0,
  y: -116 / 4,
  shootY: 22,
  mirror: false,
  shake: 7,
  recoil: 10,
  shootSound: Sounds.artillery,
  reload: 190,
  rotateSpeed: 2,
  ejectEffect: Fx.casing3,
  rotate: true,
  occlusion: 30,
  bullet: shell,
  inaccurcay: 10,
  velocityRnd: 0.2
});
//Front center: (0, 56) TODO: ???

var monoSec = 90;
var flareSec = 25;
var polySec = 120;

/*Spawn positions:
(58, 54)
(68, -34)
(52, -109)
*/
SuNavT5.abilities.add(new UnitSpawnAbility(UnitTypes.mono, monoSec * 60, 58 / 4, 54 / 4));
SuNavT5.abilities.add(new UnitSpawnAbility(UnitTypes.mono, monoSec * 60, -58 / 4, 54 / 4));
SuNavT5.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSec * 60,68 / 4, -34 / 4));
SuNavT5.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSec * 60, -68 / 4, -34 / 4));
SuNavT5.abilities.add(new UnitSpawnAbility(UnitTypes.poly, polySec * 60, 52 / 4, -109 / 4));
SuNavT5.abilities.add(new UnitSpawnAbility(UnitTypes.poly, polySec * 60, -52 / 4, -109 / 4));
SuNavT5.abilities.add(new ForceFieldAbility(80, 5, 12000, 60 * 20));

SuNavT5.weapons.addAll(AA, AA2, AA3, ffTBDouble, fTBDouble, tBDouble, healxopid);