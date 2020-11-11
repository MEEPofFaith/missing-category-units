var range = 32; //in tiles

const ranaController = prov(() => {
  var rAI = extend(RepairAI, {
    setEffectsC(){
      this._fireLoc = null;
      this._targetPos = null;
    },
    updateMovement(){
      if(this._fireLoc != null){
        this._targetPos = this._fireLoc;
      }else if(this.target != null){
        this._targetPos =  Point2.pack(this.target.x, this.target.y);
      }else if(this.target == null){
        this.unit.controlWeapons(false);
        this._targetPos = null;
      }
      
      if(this._targetPos != null){
        var shoot = false;
        
        if(this.target.within(this.unit, this.unit.range())){
          this.unit.aim(this._targetPos);
          shoot = true;
        }else if(!this.target.within(this.unit, this.unit.range() * 0.86)){
          //this.pathfind(Vars.pathfinder.positionTarget(this._targetPos));
          //this.pathfind(Pathfinder.PositionTarget.(this._targetPos));
          this.pathfind(this._targetPos);
        }

        this.unit.controlWeapons(shoot);
      }
    },
    updateTargeting(){
      for(var x = -range; x <= range; x++){
        for(var y = -range; y <= range; y++){
          var other = Vars.world.tileWorld(x + Mathf.round(this.unit.x), y + Mathf.round(this.unit.y));
          
          if(other != null && Fires.has(x + Mathf.round(this.unit.x), y + Mathf.round(this.unit.y)) && (other.build == null || other.team() == this.unit.team)){
            this._fireLoc = Fires.get(x + Mathf.round(this.unit.x), y + Mathf.round(this.unit.y));
            return;
          }else{
            this._fireLoc = null;
          }
        }
      }
      
      if(this._fireLoc == null){
        this.super$updateTargeting();
      }
    }
  });
  rAI.setEffectsC();
  
  return rAI;
});

const SuNavT1 = extendContent(UnitType, "rana", {});
SuNavT1.constructor = () => extend(UnitWaterMove, {});
//SuNavT1.defaultController = ranaController;
SuNavT1.defaultController = () => new GroundAI();

SuNavT1.abilities.add(new RepairFieldAbility(10, 60 * 5, 24));
SuNavT1.abilities.add(new ShieldRegenFieldAbility(40, 50, 60 * 8, 24));

SuNavT1.ammoType = AmmoTypes.power;

Blocks.navalFactory.plans.add(new UnitFactory.UnitPlan(SuNavT1, 60 * 25, ItemStack.with(Items.silicon, 45, Items.metaglass, 25, Items.titanium, 20)));
