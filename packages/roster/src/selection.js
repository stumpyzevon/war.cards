function createSelection(rosterSelection = undefined, force = undefined) {
  const instance = {
    _id: undefined,
    _name: '',
    _type: '',
    _number: 1,
    _entryId: '',
    _entryGroupId: '',
    _parent: undefined,
    _nodeName: 'selection',
    categories: [],
    profiles: [],
    costs: [],
    rules: [],
    selections: [],
    /**
     * Reads in a selection from a roster selection, which is just the
     * JSON version of this object (doesn't have functions or parent links)
     */
    populateFromRoster(selection, force) {
      this._id = selection._id;
      this._name = selection._name;
      this._type = selection._type;
      this._number = selection._number;
      this._entryId = selection._entryId;
      this._entryGroupId = selection._entryGroupId;
      // N.B. _parent will need to be populated by the caller
      this._parent = undefined;
      this._force = force;

      this.categories = selection.categories ? [...selection.categories] : [];
      this.profiles = selection.profiles ? [...selection.profiles] : [];
      this.costs = selection.costs ? [...selection.costs] : [];
      this.rules = selection.rules ? [...selection.rules] : [];
      this.selections = [];
      if (selection.selections) {
        selection.selections.forEach((child) => {
          const childSel = createSelection(child, undefined);
          this.selections.push(childSel);
          childSel._parent = this;
        });
      }
    },
    /**
     * The force is stored at the top level, walk back up the tree to get it.
     */
    getForce() {
      if (this._force) {
        return this._force;
      }
      if (this._parent) {
        return this._parent.getForce();
      }
      return undefined;
    },
    /**
     * Gets the top level of the tree (the unit, most likely).
     */
    getAncestor() {
      if (this._parent) {
        return this._parent.getAncestor();
      }
      return this;
    },
    /**
     * Accumulates all the profiles into separate lists by profile type.
     *
     * e.g. {
     *  'Weapon': [ ... ],
     *  'Unit': [ ... ],
     * }
     */
    getProfiles() {
      const outProfiles = {};
      this.profiles.forEach((prof) => {
        if (prof._typeName in outProfiles) {
          outProfiles[prof._typeName].push(prof);
        } else {
          outProfiles[prof._typeName] = [prof];
        }
      });

      this.selections.forEach((child) => {
        Object.entries(child.getProfiles()).forEach((entry) => {
          const [profName, profiles] = entry;
          if (profName in outProfiles) {
            outProfiles[profName].push(...profiles);
          } else {
            outProfiles[profName] = profiles;
          }
        });
      });
      return outProfiles;
    },
    /**
     * Recursively retrieves all the categories of this selection and children.
     */
    getCategories() {
      const outCategories = [...this.categories];
      this.selections.forEach((child) => {
        outCategories.push(...child.getCategories());
      });
      return outCategories;
    },
    /**
     * Lists the names of all categories in this selection and children.
     */
    getCategoryNames() {
      return this.getCategories().map((cat) => {
        return cat._name;
      });
    },
  };
  if (rosterSelection) {
    instance.populateFromRoster(rosterSelection, force);
  }
  return instance;
}

export default createSelection;
