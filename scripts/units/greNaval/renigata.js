const bullets = this.global.mcu.bullets;

const tractorBeam = bullets.newTractorBeam(8, 7);
var range = 128;
tractorBeam.length = range;
tractorBeam.maxRange = range;
tractorBeam.lifetime = 120;

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
