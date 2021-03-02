// Unit Loader made by EoD
const unitPlans = new Seq(UnitFactory.UnitPlan);

const addPlan = (fac, plan) => {
  fac.plans.add(plan);
};

//Seq in an array
const reconAdd = (recon, planArray) => {
  for(var i = 0; i < planArray.length; i++){
    recon.upgrades.add(Seq(planArray[i]).toArray(UnitType));
  };
};

const cunit = name => Vars.content.getByName(ContentType.unit, "purple-air-" + name);

//Factories
//Ground


//Air
const needle = new UnitFactory.UnitPlan(
  cunit("needle"),
  60 * 25,
  ItemStack.with(
    Items.silicon, 45,
    Items.copper, 20,
    Items.lead, 25
  )
);
addPlan(Blocks.airFactory, needle);

//Naval
const rana = new UnitFactory.UnitPlan(
  cunit("rana"),
  60 * 45,
  ItemStack.with(
    Items.silicon, 45,
    Items.metaglass, 25,
    Items.titanium, 20
  )
);
addPlan(Blocks.navalFactory, rana);

const ricco = new UnitFactory.UnitPlan(
  cunit("ricco"),
  60 * 30,
  ItemStack.with(
    Items.silicon, 55,
    Items.metaglass, 35,
    Items.copper, 20,
    Items.lead, 20
  )
);
addPlan(Blocks.navalFactory, ricco);

//Reconstructors
//1 -> 2
reconAdd(Blocks.additiveReconstructor, [
  [
    cunit("needle"),
    cunit("dart")
  ],
  
  [
    cunit("rana"),
    cunit("renidae")
  ]
]);

//2 -> 3
reconAdd(Blocks.multiplicativeReconstructor, [
  [
    cunit("dart"),
    cunit("spear")
  ],
  
  [
    cunit("renidae"),
    cunit("protidae")
  ]
]);

//3 -> 4
reconAdd(Blocks.exponentialReconstructor, [
  [
    cunit("spear"),
    cunit("javelin")
  ],
  
  [
    cunit("protidae"),
    cunit("renigata")
  ]
]);

//4 -> 5
reconAdd(Blocks.tetrativeReconstructor, [
  [
    cunit("javelin"),
    cunit("harpoon")
  ],
  
  [
    cunit("renigata"),
    cunit("urodela")
  ]
]);