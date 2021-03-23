const groundRepairAIL = prov(() => {
  let u = extend(GroundAI, {
    setEffectsC(){
      this._damagedFound = false;
      this._healTarget = null;
    },
    updateMovement(){
      if(!this._damagedFound){
        this.super$updateMovement();
      }
    },
    updateWeapons(){
      this.super$updateWeapons(); //Have normal weapons aim normally

      let hRet = this.healRetarget; //Override the aim of weapons that can heal
      let mounts = this.unit.mounts;
      for(let i = 0; i < mounts.length; i++){
        let mount = mounts[i];
        let weapon = mount.weapon;
        let rotation = this.unit.rotation - 90;
        if(weapon.bullet.healPercent > 0){
          let mountX = this.unit.x + Angles.trnsx(rotation, weapon.x, weapon.y);
          let mountY = this.unit.y + Angles.trnsy(rotation, weapon.x, weapon.y);

          if(hRet){
            let target = Units.findDamagedTile(this.unit.team, mountX, mountY);
            if(target != null){
              if(target instanceof ConstructBlock.ConstructBuild || !this.unit.inRange(target)){
                this._damagedFound = false;

                this.targets[i] = null;
              }else if(this.unit.inRange(target)){
                this._damagedFound = true;

                this.targets[i] = target;
              }else{
                this._damagedFound = false;

                this.targets[i] = null;
              }
            }else{
              this._damagedFound = false;
            }
          }
          
          if(this.targets[i] != null){
            mount.aimX = this.targets[i].x;
            mount.aimY = this.targets[i].y;
            let hShoot = this.targets[i].within(mountX, mountY, weapon.bullet.range()) && this.shouldShoot();
            mount.shoot = hShoot;
            mount.rotate = hShoot;
          }
        }
      }
    },
    healRetarget(){
      return this.timer.get(this.timerTarget2, !this._damagedFound ? 40 : 90);
    }
  });
  u.setEffectsC();
  
  return u;
});

const constantFireGroundAIL = prov(() => {
  let u = extend(GroundAI, {
    updateWeapons(){ //Keeps shooting, even if it has no target.
      if(this.targets.length != this.unit.mounts.length){
        let temp = [];
        for(let i = 0; i < this.unit.mounts.length; i++) temp[i] = null;
        this.targets = temp;
      }

      let rotation = this.unit.rotation - 90;
      let ret = this.retarget();

      if(ret){
        this.target = this.findTarget(this.unit.x, this.unit.y, this.unit.range(), this.unit.type.targetAir, this.unit.type.targetGround);
      }

      if(this.invalid(this.target)){
        this.target = null;
      }

      this.unit.isShooting = false;

      for(let i = 0; i < this.targets.length; i++){
        let mount = this.unit.mounts[i];
        let weapon = mount.weapon;

        let mountX = this.unit.x + Angles.trnsx(rotation, weapon.x, weapon.y);
        let mountY = this.unit.y + Angles.trnsy(rotation, weapon.x, weapon.y);

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
        
        let rotate = false;
        if(this.targets[i] != null){
          let to = Predict.intercept(this.unit, this.targets[i], weapon.bullet.speed);
          mount.aimX = to.x;
          mount.aimY = to.y;
          rotate = true;
        }

        mount.shoot = true;
        mount.rotate = rotate;

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
      let u = extend(FlyingAI, {
        updateTargeting(){
          let ret = this.retarget();
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
          let result = null;
          
          if(ground){
            for(let i = 0; i < flags.length; i++){
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
      let u = extend(FlyingAI, {
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
          let result = null;
          
          if(ground){
            for(let i = 0; i < flags.length; i++){
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
      let u = extend(GroundAI, {
        setEffectsC(){
          this._fireFound = false;
          this._fires = [];
        },
        updateMovement(){
          if(!this._fireFound){
            this.super$updateMovement();
          }
        },
        updateWeapons(){
          this.super$updateWeapons(); //Have normal weapons aim normally

          if(this._fires.length != this.unit.mounts.length){
            for(let i = 0; i < this.unit.mounts.length; i++){
              this._fires[i] = new Seq();
            }
          }

          let fRet = this.fireRetarget(); //Override aim of weapons that can extinguish
          let mounts = this.unit.mounts;
          for(let i = 0; i < mounts.length; i++){
            let mount = mounts[i];
            let weapon = mount.weapon;
            let rotation = this.unit.rotation - 90;
            if(weapon.bullet instanceof LiquidBulletType && weapon.bullet.liquid.canExtinguish()){
              let mountX = this.unit.x + Angles.trnsx(rotation, weapon.x, weapon.y);
              let mountY = this.unit.y + Angles.trnsy(rotation, weapon.x, weapon.y);

              if(fRet){
                this._fires[i].clear();
                for(let x = -detectRange; x <= detectRange; x++){
                  for(let y = -detectRange; y <= detectRange; y++){
                    let xLoc = x + Vars.world.toTile(mountX);
                    let yLoc = y + Vars.world.toTile(mountY);
                    let other = Vars.world.tile(xLoc, yLoc);
                    
                    if(other != null && Fires.has(xLoc, yLoc) && (other.build == null || other.team() == this.unit.team)){
                      this._fires[i].add(other);
                    }
                  }
                }
              }
              
              if(this._fires[i].size > 0){
                let cdist = Infinity;
                let target = null;
                this._fires[i].each(other => {
                  let dist = this.unit.dst2(other.worldx(), other.worldy());
                  if(dist < cdist){
                    cdist = dist;
                    target = Fires.get(other.x, other.y);
                  }
                });

                let f = target;
                if(f != null){
                  this._fireFound = true;

                  mount.aimX = f.getX();
                  mount.aimY = f.getY();

                  let fShoot = Mathf.within(f.getX(), f.getY(), mountX, mountY, weapon.bullet.range()) && this.shouldShoot();
                  mount.shoot = fShoot;
                  mount.rotate = fShoot;
                }
              }else{
                this._fireFound = false;
              }
            }
          }
        },
        fireRetarget(){
          return this.timer.get(this.timerTarget2, !this._fireFound ? 40 : 90);
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