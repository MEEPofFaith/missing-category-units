const dartController = prov(() => {
  var u = extend(FlyingAI, {
    updateMovement(){
      if(this.target != null && this.command() == UnitCommand.attack){
        this.moveTo(this.target, 0);
        this.unit.lookAt(this.target);
      }

      if(this.target == null && this.command() == UnitCommand.attack && Vars.state.rules.waves && this.unit.team == Vars.state.rules.defaultTeam){
        this.moveTo(this.getClosestSpawner(), Vars.state.rules.dropZoneRadius + 120);
      }

      if(this.command() == UnitCommand.rally){
        this.moveTo(this.targetFlag(this.unit.x, this.unit.y, BlockFlag.rally, false), 60);
      }
    }
  });
  return u;
});

const SpAirT1 = extendContent(UnitType, "dart", {});
SpAirT1.constructor = () => extend(MinerUnit, {});
SpAirT1.defaultController = dartController;
SpAirT1.abilities.add(new MoveLightningAbility(10, 8, 0.1, 1.5, 4, Color.valueOf("#bf92f9")));