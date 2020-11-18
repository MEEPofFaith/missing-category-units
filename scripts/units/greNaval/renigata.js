const renigataController = prov(() => {
  var reAI = extend(GroundAI, {
    setEffectsC(){
      this._damagedFound = false;
    },
    updateMovement(){
      if(this._damagedFound && this.target != null){
        var shoot = false;
        
        if(this.unit.inRange(this.target)){
          this.unit.aim(this.target);
          shoot = true;
        }
        
        this.unit.controlWeapons(shoot);
      }else if(!this._damagedFound){
        this.super$updateMovement();
      }
    },
    updateTargeting(){
      if(this.timer.get(this.timerTarget2, 40)){
      var target = Units.findDamagedTile(this.unit.team, this.unit.x, this.unit.y);
        if(target != null){
          if(target instanceof ConstructBlock.ConstructBuild || !this.unit.inRange(target)){
            this._damagedFound = false;
          }else if(this.unit.inRange(target)){
            this.target = target;
            this._damagedFound = true;
          }
        }else{
          this._damagedFound = false;
        }
      }
      
      if(!this._damagedFound){
        this.super$updateTargeting();
      }
    }
  });
  reAI.setEffectsC();
  
  return reAI;
});

const SuNavT4 = extendContent(UnitType, "renigata", {});
SuNavT4.constructor = () => extend(UnitWaterMove, {});
SuNavT4.defaultController = renigataController;

var flareSpawnSeconds = 20;
var polySpawnSeconds = 25;

SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.poly, polySpawnSeconds * 60, 13.5, -8.5));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.poly, polySpawnSeconds * 60, -13.5, -8.5));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSpawnSeconds * 60, 5.75, -2));
SuNavT4.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSpawnSeconds * 60, -5.75, -2));
SuNavT4.abilities.add(new ShieldRegenFieldAbility(40, 120, 60 * 16, 32));
SuNavT4.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-protidae"), Vars.content.getByName(ContentType.unit, "purple-air-renigata")]);
Blocks.exponentialReconstructor.upgrades.add(upgrade.toArray(UnitType));
