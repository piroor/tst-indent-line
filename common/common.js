/*
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
'use strict';

import Configs from '/extlib/Configs.js';

export const configs = new Configs({
  autoShow: true,
  debug: false,
}, {
  localKeys: [
    'debug',
  ]
});

export async function log(message, ...args)
{
  const useConsole = configs && (await configs.$loaded) && configs.debug;
  if (!useConsole)
    return;

  args = args.map(arg => typeof arg == 'function' ? arg() : arg);

  const nest = (new Error()).stack.split('\n').length;
  let indent = '';
  for (let i = 0; i < nest; i++) {
    indent += ' ';
  }

  const line = `tst-indent-line: ${indent}${message}`;
  console.log(line, ...args);
}
