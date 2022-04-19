import { parseRoster } from '@war.cards/parse';
import createSelection from '../src/selection';
import fs from 'fs';

test('Chaplain Selection', () => {
  const rosterData = fs.readFileSync('../parse/test/__data__/chap.ros');
  const parsed = parseRoster(rosterData.toString());
  const sel = parsed.forces[0].selections[2];
  expect(sel._name).toBe('Chaplain');
  const chaplain = createSelection(sel);
  expect(chaplain._number).toEqual(1);
  expect(chaplain.getCategoryNames()).toEqual([
    'Faction: Adeptus Astartes', 'Character', 'Faction: Imperium',
    'Infantry', 'Chaplain', 'Priest', 'HQ', 'Wolf Priest', 'Warlord',
    'Fly', 'Jump Pack', 'Master of Sanctity',
  ]);
});

test('Intercessor Selection', () => {
  const rosterData = fs.readFileSync('../parse/test/__data__/chap.ros');
  const parsed = parseRoster(rosterData.toString());
  const sel = parsed.forces[0].selections[4];
  expect(sel._name).toBe('Assault Intercessor Squad');
  const squad = createSelection(sel, parsed.forces[0]);
  const intercessor = squad.selections.find((child) => {
    return child._name === 'Assault Intercessor';
  });
  expect(intercessor._number).toEqual(4);
  expect(intercessor.getAncestor()._name).toEqual('Assault Intercessor Squad');
  const profiles = intercessor.getProfiles();
  expect(profiles.Weapon[0]._name).toEqual('Astartes Chainsword');
  expect(profiles.Unit[0]._name).toEqual('Assault Intercessor');
  expect(profiles.Unit[0].characteristics[8]._name).toEqual('Save');
  expect(profiles.Unit[0].characteristics[8].__text).toEqual('3+');

  const squadProfiles = squad.getProfiles();
  expect(squadProfiles.Unit[0]._name).toEqual('Assault Intercessor Sgt');
  expect(squadProfiles.Unit[0].characteristics[7]._name).toEqual('Ld');
  expect(squadProfiles.Unit[0].characteristics[7].__text).toEqual('8');

  expect(intercessor.getForce()._name).toEqual(parsed.forces[0]._name);
});
