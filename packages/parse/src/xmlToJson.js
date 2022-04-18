/**
 * These elements exist solely to contain other elements
 * e.g. <selectionEntries><selectionEntry>...<selectionEntry>...
 */
 const containerElements = [
  // catalog elements start here
  'publications',
  'profileTypes',
  'costTypes',
  'characteristicTypes',
  'categoryEntries',
  'modifiers',
  'modifierGroups',
  'conditions',
  'repeats',
  'conditionGroups',
  'constraints',
  'entryLinks',
  'categoryLinks',
  'infoLinks',
  'infoGroups',
  'forceEntries',
  'selectionEntries',
  'selectionEntryGroups',
  'sharedSelectionEntries',
  'sharedSelectionEntryGroups',
  'sharedProfiles',
  'sharedRules',
  'sharedInfoGroups',
  'catalogueLinks',
  // roster elements
  'forces',
  'categories',
  'selections',
  'costs',
  // shared elements
  'rules',
  'profiles',
  'characteristics',
];

/**
 * Converts an xml file into json, with some tweaks specific to BSData files.
 */
 function xmlToJson(xml) {
  if (xml.nodeType === 3) {
    // text
    return xml.nodeValue;
  }

  // check if this is a special container node, that has no attributes
  // and only contains other elements
  const isContainer = containerElements.includes(xml.nodeName);
  if (isContainer) {
    const container = [];
    xml.childNodes.forEach((item) => {
      container.push(xmlToJson(item));
    });
    return container;
  }

  const obj = { _nodeName: xml.nodeName };
  if (xml.nodeType === 1) {
    // store attributes
    if (xml.attributes.length > 0) {
      for (let j = 0; j < xml.attributes.length; j += 1) {
        const attribute = xml.attributes.item(j);
        const attrName = `_${attribute.nodeName}`;
        if (attribute.nodeValue === 'true') {
          obj[attrName] = true;
        } else if (attribute.nodeValue === 'false') {
          obj[attrName] = false;
        } else if (attribute.nodeName === 'number') {
          obj[attrName] = parseInt(attribute.nodeValue, 10);
        } else {
          obj[attrName] = attribute.nodeValue;
        }
      }
    }
  }

  // if all text nodes inside, get concatenated text from them.
  const textNodes = [].slice.call(xml.childNodes).filter((node) => {
    return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    // if childnodes are all text, set the __text attribute and stop recursing
    const texts = [].slice.call(xml.childNodes).reduce((text, node) => {
      return text + node.nodeValue;
    }, '');
    obj.__text = texts;
  } else if (xml.hasChildNodes()) {
    xml.childNodes.forEach((item) => {
      const { nodeName } = item;
      if (typeof obj[nodeName] === 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push === 'undefined') {
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    });
  }
  return obj;
}

export default xmlToJson;
