const harpoonController = prov(() => {
  var hAI = extend(FlyingAI, {
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
  return hAI;
});//Custom AI for flare AI

const SpAirT5 = extendContent(UnitType, "harpoon", {});
SpAirT5.constructor = () => extend(BuilderUnit, {});
SpAirT5.defaultController = harpoonController;
SpAirT5.abilities.add(new MoveLightningAbility(25, 20, 0.1, 1.4, 4.3, Color.valueOf("#a9d8ff")));
SpAirT5.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 4, 60 * 5, 64));
SpAirT5.ammoType = AmmoTypes.powerHigh;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-javelin"), Vars.content.getByName(ContentType.unit, "purple-air-harpoon")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
