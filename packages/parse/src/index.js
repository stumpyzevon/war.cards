import xmlToJson from './xmlToJson'

const parseRoster = (contents) => {
  // replace whitespace between tags
  const xmlText = contents.replace(/>[\s\r\n]+</g, '><');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
  const errorNode = xmlDoc.querySelector('parsererror');
  if (errorNode) {
    console.error(Error('Error while parsing'));
    return {};
  }

  const result = xmlToJson(xmlDoc.documentElement);
  return result;
}

export {
  parseRoster,
};
