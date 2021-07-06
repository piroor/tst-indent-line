/*
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
'use strict';

import {
  configs
} from '/common/common.js';

const TST_ID = 'treestyletab@piro.sakura.ne.jp';

async function registerToTST() {
  try {
    await browser.runtime.sendMessage(TST_ID, {
      type: 'register-self' ,
      name: browser.i18n.getMessage('extensionName'),
      //icons: browser.runtime.getManifest().icons,
      listeningTypes: [
        'sidebar-show'
      ],
      style: '',
    });
    tryReset();
  }
  catch(_error) {
    // TST is not available
  }
}
configs.$loaded.then(registerToTST);

/*
configs.$addObserver(key => {
  switch (key) {
    case '???':
      registerToTST();
      return;
    case '???':
      tryReset();
      return;
  }
});
*/

browser.runtime.onMessageExternal.addListener((message, sender) => {
  switch (sender.id) {
    case TST_ID:
      switch (message.type) {
        case 'ready':
          registerToTST();
          break;

        case 'sidebar-show':
          browser.tabs.query({ windowId: message.windowId }).then(tabs => {
            for (const tab of tabs) {
              insertLine(tab.id);
            }
          });
          break;
      }
      break;
  }
});

browser.tabs.onCreated.addListener(tab => {
  insertLine(tab.id);
});

function tryReset() {
  if (tryReset.reserved)
    clearTimeout(tryReset.reserved);
  tryReset.reserved = setTimeout(() => {
    tryReset.reserved = null;
    browser.tabs.query({}).then(tabs => {
      for (const tab of tabs) {
        insertLine(tab.id);
      }
    });
  }, 100);
}
tryReset.reserved = null;

function insertLine(tabId) {
  browser.runtime.sendMessage(TST_ID, {
    type:      'set-extra-tab-contents',
    id:        tabId,
    contents: [
      '<span id="indent-line" part="indent-line"></span>'
    ].join('')
  });
}
