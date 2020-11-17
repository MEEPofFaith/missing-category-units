const needleController = prov(() => {
  var nAI = extend(FlyingAI, {
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
        this.attack(120);
      }

      if(this.target == null && this.command() == UnitCommand.attack && Vars.state.rules.waves && this.unit.team == Vars.state.rules.defaultTeam){
        this.moveTo(this.getClosestSpawner(), Vars.state.rules.dropZoneRadius + 120);
      }

      if(this.command() == UnitCommand.rally){
        this.moveTo(this.targetFlag(this.unit.x, this.unit.y, BlockFlag.rally, false), 60);
      }
    }
  });
  return nAI;
});//Custom AI needed because no weapons

const SpAirT1 = extendContent(UnitType, "needle", {});
SpAirT1.constructor = () => extend(UnitEntity, {});
SpAirT1.defaultController = needleController;
SpAirT1.abilities.add(new MoveLightningAbility(15, 8, 0.1, 1, 3.1, Color.valueOf("#a9d8ff")));

Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(SpAirT1, 60 * 25, ItemStack.with(Items.silicon, 45, Items.copper, 20, Items.lead, 25)));