import { parseRoster } from '../src/index';
import fs from 'fs';

test('Chaplain Roster Parse', () => {
  const rosterData = fs.readFileSync('./test/__data__/chap.ros');
  const parsed = parseRoster(rosterData.toString());
  expect(parsed._name).toBe('chappy');
  expect(parsed.forces.length).toBe(1);
  expect(parsed.forces[0].selections[0]._name).toBe('**Chapter Selector**');
  const assaultInt = parsed.forces[0].selections[4];
  expect(assaultInt.selections[0]._name).toBe('Assault Intercessor Sgt');
  const sarge = parsed.forces[0].selections[4].selections[0];
  expect(sarge.selections[0]._name).toBe('Frag & Krak grenades');
  expect(sarge.profiles[0].characteristics[2]._name).toBe('BS');
  expect(sarge.profiles[0].characteristics[2].__text).toBe('3+');
});
