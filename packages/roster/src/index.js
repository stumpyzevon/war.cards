import { parseRoster } from '@war.cards/parse';
import createRoster from '../src/roster';
import createSelection from '../src/selection';

function createRosterFromXML(xml) {
  const parsed = parseRoster(xml);
  return createRoster(parsed);
}

export {
  createRoster,
  createRosterFromXML,
  createSelection,
};
