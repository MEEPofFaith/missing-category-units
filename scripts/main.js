//mmm yes code stolen from Project Unity
global.mcu = {};
const loadFile = (prev, array) => {
  var results = [];
  var names = [];

  var p = prev;

  for(var i = 0; i < array.length; i++){
    var file = array[i];

    if(typeof(file) === "object"){
      p.push(file.name);
      var temp = loadFile(p, file.childs);

      results = results.concat(temp.res);
      names = names.concat(temp.fileNames);

      p.pop();
    }else{
      var temp = p.join("/") + "/" + file;

      results.push(temp);
      names.push(file);
    };
  };

  return {
    res: results,
    fileNames: names
  };
};

//Basically just folders and the stuff inside those folders.
const script = [
  {
    name: "libs",
    childs: ["ai", "bullets"]
  },
  {
    name: "units",
    childs: [
      {
        name: "blAir",
        childs: ["needle", "dart", "spear", "javelin", "harpoon"]
      },
      {
        name: "blNav",
        childs: ["ricco"]
      },
      {
        name: "greNav",
        childs: ["rana", "renidae", "protidae", "renigata", "urodela"]
      }
    ]
  },
  {
    name: "loader",
    childs: ["unitLoader", "techtree", "loader"] //load after everything, make sure it exists.
  }
];

const loadedScript = loadFile([], script);
for(var i = 0; i < loadedScript.res.length; i++){
  var res = loadedScript.res[i];
  var name = loadedScript.fileNames[i];
  try{
    var content = require("purple-air/" + res);
    if(typeof(content) !== "undefined"){
      global.mcu[name] = content;
    };
  }catch(e){
    print(e);
	};
};

if(!Vars.headless){
  Core.app.post(() => {
    const meta = Vars.mods.locateMod("purple-air").meta;
    meta.displayName = "[#84F491]Missing [#BF92F9]Category [#8AA3F4]Units"
    meta.author = "Scripting: [#FCC21B]MEEP of Faith[]\nSpriting: [#A200FF]A5TR0spud[]";
    meta.description = "Adds units for missing categories of units,\n[#BF92F9]Purple Air,[] [#84F491]Green Naval,[] and [#BF92F9]Purple Naval.[]\nThe fourth slot in the factories (will eventually) have [#8AA3F4]blue units.[]\n\n[#404040]Note: Android 7 and below will not be able to run this mod.";
  });
}