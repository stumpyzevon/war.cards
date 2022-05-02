# war.cards

![Discord Shield](https://discordapp.com/api/guilds/960633449893482557/widget.png?style=shield)
<span><a href="https://npmjs.org/@war.cards/roster" title="View this project on NPM"><img src="https://img.shields.io/npm/v/badges.svg" alt="NPM version" /></a></span>
<span><a href="https://npmjs.org/@war.cards/parse" title="View this project on NPM"><img src="https://img.shields.io/npm/v/badges.svg" alt="NPM version" /></a></span>

This is a collection of Javascript utilities for manipulating Battlescribe rosters.

These utilities are used in the https://war.cards roster editor.

There is also a live demo [here](https://stumpyzevon.github.io/war.cards/). The code for the demo is in the
`examples` folder of this repository.

For additional help, hit up @stumpyzevon in the [war.cards Discord channel](https://discord.gg/4KFEYsCpG2).

## Usage

First install the roster package:

```sh
  $ npm install @war.cards/roster
```

Then load a roster from the .ros XML data. In this snippet it's loaded from a file, but it could be string data from
an HTML File object:

```js
import { createRosterFromXML } from '@war.cards/roster';
import fs from 'fs';

const rosterData = fs.readFileSync('./test_roster.ros');
const roster = createRosterFromXML(rosterData.toString());

roster.forces.forEach((force) => {
  console.log(force._name);
  force.selections.forEach((selection) => {
    console.log(selection._name);
  });
});
```

## Docs

Coming soon! For now you can browse the roster.js and selection.js source files to see how the objects are structured and what functions are available.

## Example

There is an example roster viewer in the `examples` folder. It's currently published [here](https://stumpyzevon.github.io/war.cards/).

The example doesn't use any particular Javascript framework, but it does use Bootstrap.

It uses the [localforage](https://github.com/localForage/localForage) package to store the serialized roster in the browser.