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

const constantFireGroundAIL = prov(() => {
  var u = extend(GroundAI, {
    updateWeapons(){ //Keeps shooting, even if it has no target.
      if(this.targets.length != this.unit.mounts.length){
        var temp = [];
        for(var i = 0; i < this.unit.mounts.length; i++) temp[i] = null;
        this.targets = temp;
      }

      var rotation = this.unit.rotation - 90;
      var ret = this.retarget();

      if(ret){
        this.target = this.findTarget(this.unit.x, this.unit.y, this.unit.range(), this.unit.type.targetAir, this.unit.type.targetGround);
      }

      if(this.invalid(this.target)){
        this.target = null;
      }

      this.unit.isShooting = false;

      for(var i = 0; i < this.targets.length; i++){
        var mount = this.unit.mounts[i];
        var weapon = mount.weapon;

        var mountX = this.unit.x + Angles.trnsx(rotation, weapon.x, weapon.y);
        var mountY = this.unit.y + Angles.trnsy(rotation, weapon.x, weapon.y);

        if(this.unit.type.singleTarget){
          this.targets[i] = this.target;
        }else{
          if(ret){
            this.targets[i] = this.findTarget(mountX, mountY, weapon.bullet.range(), weapon.bullet.collidesAir, weapon.bullet.collidesGround);
          }

          if(Units.invalidateTarget(this.targets[i], this.unit.team, mountX, mountY, weapon.bullet.range())){
            this.targets[i] = null;
          }
        }
        
        var rotate = false;
        if(this.targets[i] != null){
          var to = Predict.intercept(this.unit, this.targets[i], weapon.bullet.speed);
          mount.aimX = to.x;
          mount.aimY = to.y;
          rotate = true;
        }

        mount.shoot = true;
        mount.rotate = rotate;
        //print(mount.rotation);

        this.unit.isShooting = true;
        if(rotate){
          this.unit.aimX = mount.aimX;
          this.unit.aimY = mount.aimY;
        }
      }
    }
  });
  return u;
});

module.exports = {
	noWeaponFlareAI(d, flags){
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
          
          if(ground){
            for(var i = 0; i < flags.length; i++){
              result = this.targetFlag(x, y, flags[i], true);
              if(result != null) return result;
            }
          }
          
          result = result = Units.closestTarget(this.unit.team, x, y, range, u => u.checkTarget(air, ground), t => ground);
          if(result != null) return result;

          return null;
        }
      });
      return u;
    });
    
    return noWeapflareAIL;
  },
	flareAI(d, flags){
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
          
          if(ground){
            for(var i = 0; i < flags.length; i++){
              result = this.targetFlag(x, y, flags[i], true);
              if(result != null) return result;
            }
          }
          
          result = Units.closestTarget(this.unit.team, x, y, range, u => u.checkTarget(air, ground), t => ground);
          if(result != null) return result;

          return null;
        }
      });
      return u;
    });
    
    return flareAIL;
  },
	groundFireFighterAI(detectRange){ //Range is in tiles, not tilesize
    const groundFireFighterAIL = prov(() => {
      var u = extend(GroundAI, {
        setEffectsC(){
          this._fireFound = false;
          this._fireLoc = null;
          this._fires = new Seq();
        },
        updateMovement(){
          if(this._fireFound && this._fireLoc != null){
            var shoot = false;
            
            if(this.unit.inRange(this._fireLoc)){
              this.unit.aim(this._fireLoc);
              shoot = true;
            }
            
            this.unit.controlWeapons(shoot);
          }else{
            this.super$updateMovement();
          }
        },
        updateTargeting(){
          if(this.timer.get(this.timerTarget2, this.target == null ? 40 : 90)){
            this._fires.clear();
            for(var x = -detectRange; x <= detectRange; x++){
              for(var y = -detectRange; y <= detectRange; y++){
                var xLoc = x + this.unit.tileX();
                var yLoc = y + this.unit.tileY();
                var other = Vars.world.tile(xLoc, yLoc);
                
                if(other != null && Fires.has(xLoc, yLoc) && (other.build == null || other.team() == this.unit.team)){
                  this._fires.add(other);
                }
              }
            }
            
            if(this._fires.size > 0){
              var cdist = Infinity;
              this._fires.each(other => {
                let dist = this.unit.dst2(other.worldx(), other.worldy());
                if(dist < cdist){
                  cdist = dist;
                  this._fireLoc = Fires.get(other.x, other.y);
                }
              });
              
              this._fireFound = true;
            }else{
              this._fireFound = false;
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
    return groundFireFighterAIL;
  },
  groundRepairAI: groundRepairAIL,
  groundConstantFireAI: constantFireGroundAIL
};