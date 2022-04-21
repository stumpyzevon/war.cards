import { parseRoster } from '@war.cards/parse';
import createRoster from '../src/roster';
import fs from 'fs';

test('Create Roster', () => {
  const rosterData = fs.readFileSync('../parse/test/__data__/chap.ros');
  const parsed = parseRoster(rosterData.toString());
  const roster = createRoster(parsed);
  expect(roster.forces[0]._name).toEqual('Patrol Detachment 0CP');
  expect(roster.forces[0].selections[0]._name).toEqual('**Chapter Selector**');
});

test('Clone Roster', () => {
  const rosterData = fs.readFileSync('../parse/test/__data__/chap.ros');
  const parsed = parseRoster(rosterData.toString());
  const roster = createRoster(parsed);
  const clone = roster.clone();
  expect(clone.forces[0].selections[0]._name).toEqual('**Chapter Selector**');
  expect(clone.forces[0].selections[0]._force).toBeUndefined();
  expect(clone.forces[0].selections[0].selections[0]._parent).toBeUndefined();
});
