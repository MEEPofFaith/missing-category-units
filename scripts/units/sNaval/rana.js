var range = 20; //in tiles

const ranaController = prov(() => {
  var rAI = extend(GroundAI, {
    setEffectsC(){
      this._fireFound = false;
      this._fireLoc = null;
    },
    updateMovement(){
      if(this._fireFound){
        var shoot = false;
        
        if(this.unit.inRange(this._fireLoc)){
          this.unit.aim(this._fireLoc);
          shoot = true;
        }
        
        this.unit.controlWeapons(shoot);
      }else if(!this._fireFound){
        this.super$updateMovement();
      }
    },
    updateTargeting(){
      if(this.timer.get(this.timerTarget2, 40)){
        for(var x = -range; x <= range; x++){
          for(var y = -range; y <= range; y++){
            var xLoc = x + Mathf.round(this.unit.x / Vars.tilesize);
            var yLoc = y + Mathf.round(this.unit.y / Vars.tilesize);
            var other = Vars.world.tileWorld(xLoc, yLoc);
            
            if(other != null && Fires.has(xLoc, yLoc) && (other.build == null || other.team() == this.unit.team)){
              this._fireLoc = Fires.get(xLoc, yLoc);
              this._fireFound = true;
              return;
            }else{
              this._fireFound = false;
            }
          }
        }
      }
      
      if(!this._fireFound){
        this.super$updateTargeting();
      }
    }
  });
  rAI.setEffectsC();
  
  return rAI;
});

const SuNavT1 = extendContent(UnitType, "rana", {});
SuNavT1.constructor = () => extend(UnitWaterMove, {});
SuNavT1.defaultController = ranaController;
//SuNavT1.defaultController = () => new GroundAI();

SuNavT1.abilities.add(new RepairFieldAbility(10, 60 * 5, 24));
SuNavT1.abilities.add(new ShieldRegenFieldAbility(40, 50, 60 * 8, 24));

SuNavT1.ammoType = AmmoTypes.power;

Blocks.navalFactory.plans.add(new UnitFactory.UnitPlan(SuNavT1, 60 * 25, ItemStack.with(Items.silicon, 45, Items.metaglass, 25, Items.titanium, 20)));
