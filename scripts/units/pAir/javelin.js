const javelinController = prov(() => {
  var jAI = extend(FlyingAI, {
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
  return jAI;
});//Custom AI needed because no weapons

const SpAirT4 = extendContent(UnitType, "javelin", {});
SpAirT4.constructor = () => extend(BuilderUnit, {});
SpAirT4.defaultController = javelinController;
SpAirT4.abilities.add(new MoveLightningAbility(58, 20, 0.25, 0.7, 4.5, Color.valueOf("#bf92f9")));
SpAirT4.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 8, 60 * 8.75, 64));
SpAirT4.ammoType = AmmoTypes.powerHigh;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-spear"), Vars.content.getByName(ContentType.unit, "purple-air-javelin")]);
Blocks.exponentialReconstructor.upgrades.add(upgrade.toArray(UnitType));
