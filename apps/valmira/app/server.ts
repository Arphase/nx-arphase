import 'zone.js/dist/zone-node';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const domino = require('domino');
const win = domino.createWindow('');
const HTMLAnchorElement = domino.impl.HTMLAnchorElement;

global['window'] = win;
global['Node'] = win.Node;
global['navigator'] = win.navigator;
global['Event'] = win.Event;
global['KeyboardEvent'] = win.Event;
global['MouseEvent'] = win.Event;
global['Event']['prototype'] = win.Event.prototype;
global['document'] = win.document;
global['HTMLAnchorElement'] = HTMLAnchorElement;

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import '../api/src/main';
export * from './src/main.server';
