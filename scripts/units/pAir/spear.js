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
});//Custom AI needed because no weapons

const SpAirT3 = extendContent(UnitType, "spear", {});
SpAirT3.constructor = () => {
  const unit = extend(BuilderUnit, {});
  return unit;
}
SpAirT3.defaultController = spearController;
SpAirT3.abilities.add(new MoveLightningAbility(35, 16, 0.2, 0.8, 4.333, Color.valueOf("#bf92f9")));
SpAirT3.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 5, 60 * 6, 48));
SpAirT3.ammoType = AmmoTypes.power;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-arrow"), Vars.content.getByName(ContentType.unit, "purple-air-spear")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));