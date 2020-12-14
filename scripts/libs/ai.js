const groundFireFighterAIL = prov(() => {
  var u = extend(GroundAI, {
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
        for(var x = -this.unit.type.fireRange; x <= this.unit.type.fireRange; x++){
          for(var y = -this.unit.type.fireRange; y <= this.unit.type.fireRange; y++){
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
  u.setEffectsC();
  
  return u;
});

const groundRepairAIL = prov(() => {
  var u = extend(GroundAI, {
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
  u.setEffectsC();
  
  return u;
});

module.exports = {
	noWeaponFlareAI(d){
    const noWeapflareAIL = prov(() => {
      var u = extend(FlyingAI, {
        updateTargeting(){
          var ret = this.retarget();
          if(ret){
            this.target = this.findTarget(this.unit.x, this.unit.y, this.unit.range(), this.unit.type.targetAir, this.unit.type.targetGround);
          }
          if(this.invalid(this.target)){
            this.target = null;
          }
        },
        updateMovement(){
          if(this.target != null && this.command() == UnitCommand.attack){
            this.attack(d);
          }

          if(this.target == null && this.command() == UnitCommand.attack && Vars.state.rules.waves && this.unit.team == Vars.state.rules.defaultTeam){
            this.moveTo(this.getClosestSpawner(), Vars.state.rules.dropZoneRadius + 120);
          }

          if(this.command() == UnitCommand.rally){
            this.moveTo(this.targetFlag(this.unit.x, this.unit.y, BlockFlag.rally, false), 60);
          }
        },
        findTarget(x, y, range, air, ground){
          var result = null;
          
          if(ground) result = this.targetFlag(x, y, BlockFlag.core, true);
          if(result != null) return result;
          
          if(ground) result = this.targetFlag(x, y, BlockFlag.generator, true);
          if(result != null) return result;
          
          result = this.target(x, y, range, air, ground);
          if(result != null) return result;

          return null;
        }
      });
      return u;
    });
    
    return noWeapflareAIL;
  },
	flareAI(d){
    const flareAIL = prov(() => {
      var u = extend(FlyingAI, {
        updateMovement(){
          if(this.target != null && this.command() == UnitCommand.attack){
            this.attack(d);
          }
          if(this.target == null && this.command() == UnitCommand.attack && Vars.state.rules.waves && this.unit.team == Vars.state.rules.defaultTeam){
            this.moveTo(this.getClosestSpawner(), Vars.state.rules.dropZoneRadius + 120);
          }
          if(this.command() == UnitCommand.rally){
            this.moveTo(this.targetFlag(this.unit.x, this.unit.y, BlockFlag.rally, false), 60);
          }
        },
        findTarget(x, y, range, air, ground){
          var result = null;
          
          if(ground) result = this.targetFlag(x, y, BlockFlag.core, true);
          if(result != null) return result;
          
          if(ground) result = this.targetFlag(x, y, BlockFlag.generator, true);
          if(result != null) return result;
          
          result = this.target(x, y, range, air, ground);
          if(result != null) return result;

          return null;
        }
      });
      return u;
    });
    
    return flareAIL;
  },
	groundFireFighterAI: groundFireFighterAIL,
  groundRepairAI: groundRepairAIL
};