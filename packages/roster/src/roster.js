import createSelection from "./selection";

/**
 * Clones an object while removing undefined values, functions, and any provided keys.
 */
function omitDeep(input, excludes) {
  return Object.entries(input).reduce((nextInput, [key, value]) => {
    const shouldExclude = excludes.includes(key);
    if (shouldExclude || value === undefined || typeof value === 'function') return nextInput;

    if (Array.isArray(value)) {
      const arrValue = value;
      const nextValue = arrValue.map((arrItem) => {
        if (typeof arrItem === 'object') {
          return omitDeep(arrItem, excludes);
        }
        return arrItem;
      });
      nextInput[key] = nextValue;
      return nextInput;
    }

    if (typeof value === 'object') {
      nextInput[key] = omitDeep(value, excludes);
      return nextInput;
    }

    nextInput[key] = value;

    return nextInput;
  }, {});
}

function createForce(force = undefined, roster = undefined) {
  const instance = {
    _id: undefined,
    _roster: undefined,
    _name: force._name,
    _entryId: '',
    _catalogueId: '',
    _catalogueName: '',
    _catalogueRevision: 0,
    _nodeName: 'force',
    selections: [],
    rules: [],
    categories: [],
    populateFromRoster(force, roster) {
      this._id = force._id;
      this._roster = roster,
      this._name = force._name;
      this._entryId = force._entryId;
      this._catalogueId = force._catalogueId;
      this._catalogueName = force._catalogueName;
      this._catalogueRevision = force._catalogueRevision;
      this.rules = force.rules ? [...force.rules] : [];
      this.categories = force.categories ? [...force.categories] : [];
      this.selections = [];
      if (force.selections) {
        this.selections = force.selections.map((sel) => {
          return createSelection(sel, force);
        });
      }
    },
  };
  if (force && roster) {
    instance.populateFromRoster(force, roster);
  }
  return instance;
}

function createRoster(roster = undefined) {
  const instance = {
    _id: undefined,
    _name: '',
    _battleScribeVersion: '',
    _gameSystemId: '',
    _gameSystemName: '',
    _gameSystemRevision: 0,
    _nodeName: 'roster',
    _xmlns: 'http://www.battlescribe.net/schema/rosterSchema',
    costs: [],
    forces: [],
    /**
     * Strips out all catalog/parent/etc references, null and undefined values.
     *
     * The result is suitable for use with a document db (or serialization).
     */
    clone() {
      const clone = omitDeep(this, [
        '_parent',
        '_selection',
        '_force',
      ]);
      return clone;
    },
    populateFromRoster(roster) {
      this._id = roster._id;
      this._name = roster._name;
      this._battleScribeVersion = roster._battleScribeVersion;
      this._gameSystemId = roster._gameSystemId;
      this._gameSystemName = roster._gameSystemName;
      this._gameSystemRevision = roster._gameSystemRevision;
      this._xmlns = roster._xmlns;
      this.costs = roster.costs ? [...roster.costs] : [];
      this.forces = [];
      if (roster.forces) {
        this.forces = roster.forces.map((force) => {
          return createForce(force, roster);
        });
      }
    },
  };
  if (roster) {
    instance.populateFromRoster(roster);
  }
  return instance;
}

export default createRoster;
