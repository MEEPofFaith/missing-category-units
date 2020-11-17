const spearController = prov(() => {
  var sAI = extend(FlyingAI, {
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
  return sAI;
});//Custom AI for flare AI

const SpAirT3 = extendContent(UnitType, "spear", {});
SpAirT3.constructor = () => extend(BuilderUnit, {});
SpAirT3.defaultController = spearController;
SpAirT3.abilities.add(new MoveLightningAbility(18, 14, 0.1, 1.2, 3.9, Color.valueOf("#a9d8ff")));
SpAirT3.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 2, 60 * 3.5, 32));
SpAirT3.ammoType = AmmoTypes.power;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-dart"), Vars.content.getByName(ContentType.unit, "purple-air-spear")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));