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
const BASE_STYLE = `
  :root {
    --highlighted-indent-level: -1;
    --indent-line-opacity: 0;
  }

  tab-item:not(.pinned):not(.collapsed) ::part(%EXTRA_CONTENTS_PART% indent-line) {
    background-image: var(--indent-line-highlighted);
    bottom: 0;
    opacity: var(--indent-line-opacity);
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: opacity var(--collapse-animation);
    width: var(--tab-indent);
    --indent-line-left: repeating-linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0px,
      var(--tab-border) 0px,
      var(--tab-border) 1px,
      rgba(0, 0, 0, 0) 1px,
      rgba(0, 0, 0, 0) var(--indent-size)
    );
    --indent-line-right: repeating-linear-gradient(
      to left,
      rgba(0, 0, 0, 0) 0px,
      var(--tab-border) 0px,
      var(--tab-border) 1px,
      rgba(0, 0, 0, 0) 1px,
      rgba(0, 0, 0, 0) var(--indent-size)
    );
    --indent-line-highlighted-left: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) calc(var(--indent-size) * (var(--highlighted-indent-level))),
      currentcolor calc(var(--indent-size) * (var(--highlighted-indent-level))),
      currentcolor calc(var(--indent-size) * (var(--highlighted-indent-level)) + 1px),
      rgba(0, 0, 0, 0) calc(var(--indent-size) * (var(--highlighted-indent-level)) + 1px)
    );
    --indent-line-highlighted-right: linear-gradient(
      to left,
      rgba(0, 0, 0, 0) calc(var(--indent-size) * (var(--highlighted-indent-level))),
      currentcolor calc(var(--indent-size) * (var(--highlighted-indent-level))),
      currentcolor calc(var(--indent-size) * (var(--highlighted-indent-level)) + 1px),
      rgba(0, 0, 0, 0) calc(var(--indent-size) * (var(--highlighted-indent-level)) + 1px)
    );
  }

  :root.left tab-item:not(.pinned) ::part(%EXTRA_CONTENTS_PART% indent-line) {
    --indent-line: var(--indent-line-left);
    --indent-line-highlighted: var(--indent-line-highlighted-left);
    left: calc(var(--indent-size) * 0.75);
  }

  :root.right tab-item:not(.pinned) ::part(%EXTRA_CONTENTS_PART% indent-line) {
    --indent-line: var(--indent-line-right);
    --indent-line-highlighted: var(--indent-line-highlighted-right);
    right: calc(var(--indent-size) * 0.75);
  }

  :root:hover tab-item:not(.pinned):not(.collapsed) ::part(%EXTRA_CONTENTS_PART% indent-line) {
    background-image: var(--indent-line-highlighted), var(--indent-line);
    --indent-line-opacity: 1;
  }
`;

const stylesForWindow = new Map();

async function registerToTST() {
  try {
    await browser.runtime.sendMessage(TST_ID, {
      type: 'register-self' ,
      name: browser.i18n.getMessage('extensionName'),
      //icons: browser.runtime.getManifest().icons,
      listeningTypes: [
        'sidebar-show',
        'tree-attached',
        'tree-detached',
        'tree-collapsed-state-changed',
      ],
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
            reserveToUpdateActiveTreeStyle(message.windowId);
          });
          break;

        case 'tree-attached':
        case 'tree-detached':
        case 'tree-collapsed-state-changed':
          reserveToUpdateActiveTreeStyle(message.tab.windowId);
          break;
      }
      break;
  }
});

browser.tabs.onCreated.addListener(tab => {
  insertLine(tab.id);
  reserveToUpdateActiveTreeStyle(tab.windowId);
});

browser.tabs.onActivated.addListener(activeInfo => {
  reserveToUpdateActiveTreeStyle(activeInfo.windowId);
});

browser.tabs.onRemoved.addListener((_tabId, removeInfo) => {
  reserveToUpdateActiveTreeStyle(removeInfo.windowId);
});

browser.tabs.onMoved.addListener((_tabId, moveInfo) => {
  reserveToUpdateActiveTreeStyle(moveInfo.windowId);
});

browser.tabs.onAttached.addListener((_tabId, attachInfo) => {
  reserveToUpdateActiveTreeStyle(attachInfo.newWindowId);
});

browser.tabs.onDetached.addListener((_tabId, detachInfo) => {
  reserveToUpdateActiveTreeStyle(detachInfo.oldWindowId);
});

browser.tabs.onUpdated.addListener((_tabId, _changeInfo, tab) => {
  reserveToUpdateActiveTreeStyle(tab.windowId);
}, { properties: ['pinned'] });

browser.windows.onRemoved.addListener(windowId => {
  stylesForWindow.delete(windowId);
  applyStyles();
});

function reserveToUpdateActiveTreeStyle(windowId) {
  const timer = reserveToUpdateActiveTreeStyle.timers.get(windowId);
  if (timer)
    clearTimeout(timer);
  reserveToUpdateActiveTreeStyle.timers.set(windowId, setTimeout(async () => {
    reserveToUpdateActiveTreeStyle.timers.delete(windowId);

    const [activeTab] = await browser.tabs.query({ active: true, windowId });
    const [activeTreeItem, parentTreeItem] = await browser.runtime.sendMessage(TST_ID, {
      type: 'get-tree',
      tabs: [activeTab.id, `parent-of-${activeTab.id}`],
    });

    const highlightUpperLevel = (activeTreeItem.children.length == 0) || activeTreeItem.states.includes('subtree-collapsed');
    const highlightLevelOffset = highlightUpperLevel ? -1 : 0;
    const level = parseInt(activeTreeItem.indent || 0) + highlightLevelOffset;

    let tabIds = [];
    if (highlightUpperLevel) {
      if (parentTreeItem) {
        tabIds = collectTabIds(parentTreeItem.children);
      }
    }
    else {
      tabIds = collectTabIds(activeTreeItem.children);
    }

    stylesForWindow.set(windowId, tabIds.length > 0 ? `
      ${tabIds.map(id => `#tab-${id}`).join(',')} {
        --highlighted-indent-level: ${level};
        --indent-line-opacity: 1;
      }
    ` : '');

    applyStyles();
  }, 100));
}
reserveToUpdateActiveTreeStyle.timers = new Map();

function collectTabIds(treeItems, tabIds = []) {
  for (const treeItem of treeItems) {
    tabIds.push(treeItem.id);
    if (treeItem.children && treeItem.children.length > 0)
      collectTabIds(treeItem.children, tabIds);
  }
  return tabIds;
}

function applyStyles() {
  browser.runtime.sendMessage(TST_ID, {
    type: 'register-self' ,
    style: `${BASE_STYLE}\n${Array.from(stylesForWindow.values()).join('\n')}`,
  });
}

function tryReset() {
  if (tryReset.reserved)
    clearTimeout(tryReset.reserved);
  tryReset.reserved = setTimeout(() => {
    tryReset.reserved = null;
    browser.tabs.query({}).then(tabs => {
      for (const tab of tabs) {
        insertLine(tab.id);
        reserveToUpdateActiveTreeStyle(tab.windowId);
      }
    });
  }, 100);
}
tryReset.reserved = null;

function insertLine(tabId) {
  browser.runtime.sendMessage(TST_ID, {
    type:     'set-extra-tab-contents',
    id:       tabId,
    place:    'indent',
    contents: '<span id="indent-line" part="indent-line"></span>',
  });
}
