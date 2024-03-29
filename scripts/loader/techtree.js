//Casually steals from [MEEPofFaith/progressed-materials]'s techtree.js, which was stolen from [Gdeft/substructure]'s techtree.js

/**
 * Node for the research tech tree.
 *
 * @property {UnlockableContent}    parent          - The parent of the current node.
 * @property {UnlockableContent}    contentType     - The unlockable content that the current node contains.
 * @property {ItemStack}            requirements    - The research requirements required to unlock this node, will use the default if set to null.
 * @property {Seq}                  objectives      - A sequence of Objectives required to unlock this node. Can be null.
 */
const node = (parent, contentType, requirements, objectives) => {
  if(parent != null && contentType != null){
    const tnode = new TechTree.TechNode(TechTree.get(parent), contentType, requirements != null ? requirements : contentType.researchRequirements());
    let used = new ObjectSet();
    
    if(objectives != null) tnode.objectives.addAll(objectives);
  }else{
    print(parent + " or " + contentType + " is null.");
  }
};
const cunit = name => Vars.content.getByName(ContentType.unit, "purple-air-" + name);

/** Green */

// Green Naval
/*node(UnitTypes.risso, cunit("rana"), null, null);
node(cunit("rana"), cunit("renidae"), null, new Objectives.Research(Blocks.additiveReconstructor));
node(cunit("renidae"), cunit("protidae"), null, new Objectives.Research(Blocks.multiplicativeReconstructor));
node(cunit("protidae"), cunit("renigata"), null, new Objectives.Research(Blocks.exponentialReconstructor));
node(cunit("renigata"), cunit("urodela"), null, new Objectives.Research(Blocks.tetrativeReconstructor));*/


/** Purple */

// Purple Air

// Purple Naval


/** Blue */

// Blue Ground

// Blue Air
node(UnitTypes.flare, cunit("needle"), null, null);
node(cunit("needle"), cunit("dart"), null, new Objectives.Research(Blocks.additiveReconstructor));
node(cunit("dart"), cunit("spear"), null, new Objectives.Research(Blocks.multiplicativeReconstructor));
node(cunit("spear"), cunit("javelin"), null, new Objectives.Research(Blocks.exponentialReconstructor));
node(cunit("javelin"), cunit("harpoon"), null, new Objectives.Research(Blocks.tetrativeReconstructor));

// Blue Naval
node(UnitTypes.risso, cunit("ricco"), null, null);