const bullets = this.global.mcu.bullets;
const ais = this.global.mcu.ai;

const SuNavT4 = extendContent(UnitType, "renigata", {});
SuNavT4.constructor = () => extend(UnitWaterMove, {});
SuNavT4.defaultController = ais.groundRepairAI;

const AAbullet = extend(FlakBulletType, {});
AAbullet.sprite = "missile";
AAbullet.height = 8;
AAbullet.explodeRange = 18;
AAbullet.splashDamage = 15;
AAbullet.splashDamgeRadius = 45;
AAbullet.homingRange = 9 * 8;
AAbullet.homingPower = 0.1;
AAbullet.trailChance = 0.2;
AAbullet.lifetime = 30;
AAbullet.speed = 5;
AAbullet.backColor = Pal.missileYellowBack;
AAbullet.frontColor = Pal.missileYellow;
AAbullet.hitSound = Sounds.explosion;
AAbullet.weaveMag = 6;
AAbullet.weaveScale = 6;

const AA = extendContent(Weapon, "purple-air-renigata-aa", {});
AA.bullet = AAbullet;
AA.rotate = true;
AA.rotateSpeed = 8;
AA.reload = 5;
AA.inaccurcay = 5;
AA.shootSound = Sounds.missile;
AA.alternate = false;
AA.x = 57 / 4;
AA.y = -40 / 4;

const healArtillery = extend(ArtilleryBulletType, {});
healArtillery.shootEffect = Fx.shootHeal;
healArtillery.damage = 5;
healArtillery.width = 11;
healArtillery.height = 11;
healArtillery.splashDamage = 24;
healArtillery.splashDamageRadius = 8;
healArtillery.healPercent = 4;
healArtillery.scaleVelocity = true;
healArtillery.frontColor = Color.valueOf("84F491");
healArtillery.backColor = Color.valueOf("62AE7F");
healArtillery.speed = 3;
healArtillery.hitEffect = Fx.hitLaser;
healArtillery.despawnEffect = Fx.hitLaser;
healArtillery.hitSound = Sounds.none;
healArtillery.lifetime = 80;

const healRipple = extendContent(Weapon, "purple-air-protidae-ripple", {});
healRipple.reload = 50;
healRipple.x = 7.5;
healRipple.y = 9.5;
healRipple.shootY = 2.75;
healRipple.recoil = 2;
healRipple.rotate = true;
healRipple.rotateSpeed = 6;
healRipple.shots = 3;
healRipple.inaccuracy = 10;
healRipple.shootCone = 10;
healRipple.velocityRnd = 0.3;
healRipple.shootSound = Sounds.bang;
healRipple.shake = 2;
healRipple.bullet = healArtillery;

const healArtilleryMid = extend(ArtilleryBulletType, {});
healArtilleryMid.shootEffect = Fx.shootHeal;
healArtilleryMid.damage = 3;
healArtilleryMid.width = 11;
healArtilleryMid.height = 11;
healArtilleryMid.splashDamage = 17;
healArtilleryMid.splashDamageRadius = 5;
healArtilleryMid.healPercent = 2;
healArtilleryMid.scaleVelocity = true;
healArtilleryMid.frontColor = Color.valueOf("84F491");
healArtilleryMid.backColor = Color.valueOf("62AE7F");
healArtilleryMid.speed = 3;
healArtilleryMid.hitEffect = Fx.hitLaser;
healArtilleryMid.despawnEffect = Fx.hitLaser;
healArtilleryMid.hitSound = Sounds.none;
healArtilleryMid.lifetime = 70;

const healRippleMid = extendContent(Weapon, "purple-air-protidae-ripple", {});
healRippleMid.reload = 35;
healRippleMid.x = 0;
healRippleMid.y = 16;
healRippleMid.mirror = false;
healRippleMid.shootY = 2.75;
healRippleMid.recoil = 2;
healRippleMid.rotate = true;
healRippleMid.rotateSpeed = 6;
healRippleMid.shots = 3;
healRippleMid.inaccuracy = 10;
healRippleMid.shootCone = 10;
healRippleMid.velocityRnd = 0.3;
healRippleMid.shootSound = Sounds.bang;
healRippleMid.shake = 2;
healRippleMid.bullet = healArtilleryMid;

const tractorBeam = bullets.newTractorBeam(8, 560);
var range = 128;
tractorBeam.length = range;
tractorBeam.maxRange = range;
tractorBeam.lifetime = 120;
//Doesn't work due to how the code works in BulletComp.java
/*tractorBeam.collidesTiles = true;
tractorBeam.collidesTeam = true;
tractorBeam.healPercent = 3;*/

const tractorBeamWeapon = extendContent(Weapon, "purple-air-renigata-parallax", {});
tractorBeamWeapon.mirror = false;
tractorBeamWeapon.x = 0;
tractorBeamWeapon.y = -9.5;
tractorBeamWeapon.shootY = 6;
tractorBeamWeapon.recoil = 0;
tractorBeamWeapon.reload = 30;
tractorBeamWeapon.rotate = true;
tractorBeamWeapon.continuous = true;
tractorBeamWeapon.shootSound = Sounds.tractorbeam;
tractorBeamWeapon.bullet = tractorBeam;
tractorBeamWeapon.recoil = 0;

var flareSec = 40;
var polySec = 80;

SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.poly, polySec * 60, 34/4, -68/4));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.poly, polySec * 60, -34/4, -68/4));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSec * 60, 32/4, -6/4));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSec * 60, -32/4, -6/4));
SuNavT4.abilities.add(new ShieldRegenFieldAbility(40, 120, 60 * 16, 32));

SuNavT4.ammoType = AmmoTypes.powerHigh;

SuNavT4.weapons.add(AA);
SuNavT4.weapons.add(healRipple);
SuNavT4.weapons.add(healRippleMid);
SuNavT4.weapons.add(tractorBeamWeapon);