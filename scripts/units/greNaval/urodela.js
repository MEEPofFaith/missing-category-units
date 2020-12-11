const bullets = this.global.mcu.bullets;

const SuNavT5 = extendContent(UnitType, "urodela", {});
SuNavT5.constructor = () => extend(UnitWaterMove, {});

const tractorBeam = bullets.newTractorBeam(11, 720);
var range = 160;
tractorBeam.length = range;
tractorBeam.maxRange = range;
tractorBeam.lifetime = 180;

const tBDouble = extendContent(Weapon, "purple-air-renigata-parallax", {});
tBDouble.x = 94 / 4;
tBDouble.y = -80 / 4;
tBDouble.shootY = 6;
tBDouble.recoil = 0;
tBDouble.reload = 60;
tBDouble.rotate = true;
tBDouble.continuous = true;
tBDouble.shootSound = Sounds.tractorbeam;
tBDouble.bullet = tractorBeam;
tBDouble.recoil = 0;
tBDouble.alternate = false;

const fTBDouble = extendContent(Weapon, "purple-air-renigata-parallax", {});
fTBDouble.x = 41 / 4;
fTBDouble.y = 16 / 4;
fTBDouble.shootY = 6;
fTBDouble.recoil = 0;
fTBDouble.reload = 60;
fTBDouble.rotate = true;
fTBDouble.continuous = true;
fTBDouble.shootSound = Sounds.tractorbeam;
fTBDouble.bullet = tractorBeam;
fTBDouble.recoil = 0;
fTBDouble.alternate = false;


const ffTBDouble = extendContent(Weapon, "purple-air-renigata-parallax", {});
ffTBDouble.x = 35 / 4;
ffTBDouble.y = 122 / 4;
ffTBDouble.shootY = 6;
ffTBDouble.recoil = 0;
ffTBDouble.reload = 60;
ffTBDouble.rotate = true;
ffTBDouble.continuous = true;
ffTBDouble.shootSound = Sounds.tractorbeam;
ffTBDouble.bullet = tractorBeam;
ffTBDouble.recoil = 0;
ffTBDouble.alternate = false;

//Back center: (0, -116) TODO: Giant heal artillery (Base off Toxopid)
//Front center: (0, 56) TODO: ???

var monoSec = 60;
var flareSec = 40;
var polySec = 75;

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
SuNavT5.abilities.add(new ForceFieldAbility(80, 5, 10000, 60 * 20));

SuNavT5.ammoType = AmmoTypes.powerHigh;

SuNavT5.weapons.add(ffTBDouble);
SuNavT5.weapons.add(ftBDouble);
SuNavT5.weapons.add(tBDouble);

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-renigata"), Vars.content.getByName(ContentType.unit, "purple-air-urodela")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));