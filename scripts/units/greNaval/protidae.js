const protidaeController = prov(() => {
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

const SuNavT3 = extendContent(UnitType, "protidae", {});
SuNavT3.constructor = () => extend(UnitWaterMove, {});
SuNavT3.defaultController = protidaeController;
SuNavT3.abilities.add(new UnitSpawnAbility(UnitTypes.mono, 60 * 30, 0, -7.5));
SuNavT3.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));
SuNavT3.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-renidae"), Vars.content.getByName(ContentType.unit, "purple-air-protidae")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
