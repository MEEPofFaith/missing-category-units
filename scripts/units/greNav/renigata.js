const bullets = require("libs/bullets");
const ais = require("libs/ai");

const SuNavT4 = extendContent(UnitType, "renigata", {
  ammoType: AmmoTypes.powerHigh
});
SuNavT4.constructor = () => extend(UnitWaterMove, {});
SuNavT4.defaultController = ais.groundRepairAI;

const AAbullet = extend(FlakBulletType, {
  sprite: "missile",
  height: 8,
  explodeRange: 18,
  splashDamage: 15,
  splashDamgeRadius: 45,
  homingRange: 9 * 8,
  homingPower: 0.1,
  trailChance: 0.2,
  lifetime: 30,
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
  x: 57 / 4,
  y: -40 / 4
});

const healArtillery = extend(ArtilleryBulletType, {
  shootEffect: Fx.shootHeal,
  damage: 5,
  width: 11,
  height: 11,
  splashDamage: 24,
  splashDamageRadius: 8,
  healPercent: 4,
  scaleVelocity: true,
  frontColor: Color.valueOf("84F491"),
  backColor: Color.valueOf("62AE7F"),
  speed: 3,
  hitEffect: Fx.hitLaser,
  despawnEffect: Fx.hitLaser,
  hitSound: Sounds.none,
  lifetime: 80
});

const healRipple = extendContent(Weapon, "purple-air-protidae-ripple", {
  reload: 50,
  x: 7.5,
  y: 9.5,
  shootY: 2.75,
  recoil: 2,
  rotate: true,
  rotateSpeed: 6,
  shots: 3,
  inaccuracy: 10,
  shootCone: 10,
  velocityRnd: 0.3,
  shootSound: Sounds.bang,
  shake: 2,
  bullet: healArtillery
});

const healArtilleryMid = extend(ArtilleryBulletType, {
  shootEffect: Fx.shootHeal,
  damage: 3,
  width: 11,
  height: 11,
  splashDamage: 17,
  splashDamageRadius: 5,
  healPercent: 2,
  scaleVelocity: true,
  frontColor: Color.valueOf("84F491"),
  backColor: Color.valueOf("62AE7F"),
  speed: 3,
  hitEffect: Fx.hitLaser,
  despawnEffect: Fx.hitLaser,
  hitSound: Sounds.none,
  lifetime: 70
});

const healRippleMid = extendContent(Weapon, "purple-air-protidae-ripple", {
  reload: 35,
  x: 0,
  y: 16,
  mirror: false,
  shootY: 2.75,
  recoil: 2,
  rotate: true,
  rotateSpeed: 6,
  shots: 3,
  inaccuracy: 10,
  shootCone: 10,
  velocityRnd: 0.3,
  shootSound: Sounds.bang,
  shake: 2,
  bullet: healArtilleryMid
});

const tractorBeam = bullets.newTractorBeam(8, 560);
var range = 128;
tractorBeam.length = range;
tractorBeam.maxRange = range;
tractorBeam.lifetime = 120;
//Doesn't work due to how the code works in BulletComp.java
/*tractorBeam.collidesTiles = true;
tractorBeam.collidesTeam = true;
tractorBeam.healPercent = 3;*/

const tractorBeamWeapon = extendContent(Weapon, "purple-air-renigata-parallax", {
  mirror: false,
  x: 0,
  y: -9.5,
  shootY: 6,
  recoil: 0,
  reload: 30,
  rotate: true,
  continuous: true,
  shootSound: Sounds.tractorbeam,
  bullet: tractorBeam
});

var flareSec = 35;
var polySec = 135;

SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.poly, polySec * 60, 34/4, -68/4));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.poly, polySec * 60, -34/4, -68/4));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSec * 60, 32/4, -6/4));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSec * 60, -32/4, -6/4));
SuNavT4.abilities.add(new ShieldRegenFieldAbility(40, 120, 60 * 16, 32));

SuNavT4.weapons.addAll(AA,healRipple, healRippleMid, tractorBeamWeapon);