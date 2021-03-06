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

  tab-item { --indent-level: 0; }
  tab-item[data-level="1"] { --indent-level: 1; }
  tab-item[data-level="2"] { --indent-level: 2; }
  tab-item[data-level="3"] { --indent-level: 3; }
  tab-item[data-level="4"] { --indent-level: 4; }
  tab-item[data-level="5"] { --indent-level: 5; }
  tab-item[data-level="6"] { --indent-level: 6; }
  tab-item[data-level="7"] { --indent-level: 7; }
  tab-item[data-level="8"] { --indent-level: 8; }
  tab-item[data-level="9"] { --indent-level: 9; }
  tab-item[data-level="10"] { --indent-level: 10; }
  tab-item[data-level="11"] { --indent-level: 11; }
  tab-item[data-level="12"] { --indent-level: 12; }
  tab-item[data-level="13"] { --indent-level: 13; }
  tab-item[data-level="14"] { --indent-level: 14; }
  tab-item[data-level="15"] { --indent-level: 15; }
  tab-item[data-level="16"] { --indent-level: 16; }
  tab-item[data-level="17"] { --indent-level: 17; }
  tab-item[data-level="18"] { --indent-level: 18; }
  tab-item[data-level="19"] { --indent-level: 19; }
  tab-item[data-level="20"] { --indent-level: 20; }
  tab-item[data-level="21"] { --indent-level: 21; }
  tab-item[data-level="22"] { --indent-level: 22; }
  tab-item[data-level="23"] { --indent-level: 23; }
  tab-item[data-level="24"] { --indent-level: 24; }
  tab-item[data-level="25"] { --indent-level: 25; }
  tab-item[data-level="26"] { --indent-level: 26; }
  tab-item[data-level="27"] { --indent-level: 27; }
  tab-item[data-level="28"] { --indent-level: 28; }
  tab-item[data-level="29"] { --indent-level: 29; }
  tab-item[data-level="30"] { --indent-level: 30; }
  tab-item[data-level="31"] { --indent-level: 31; }
  tab-item[data-level="32"] { --indent-level: 32; }
  tab-item[data-level="33"] { --indent-level: 33; }
  tab-item[data-level="34"] { --indent-level: 34; }
  tab-item[data-level="35"] { --indent-level: 35; }
  tab-item[data-level="36"] { --indent-level: 36; }
  tab-item[data-level="37"] { --indent-level: 37; }
  tab-item[data-level="38"] { --indent-level: 38; }
  tab-item[data-level="39"] { --indent-level: 39; }
  tab-item[data-level="40"] { --indent-level: 40; }
  tab-item[data-level="41"] { --indent-level: 41; }
  tab-item[data-level="42"] { --indent-level: 42; }
  tab-item[data-level="43"] { --indent-level: 43; }
  tab-item[data-level="44"] { --indent-level: 44; }
  tab-item[data-level="45"] { --indent-level: 45; }
  tab-item[data-level="46"] { --indent-level: 46; }
  tab-item[data-level="47"] { --indent-level: 47; }
  tab-item[data-level="48"] { --indent-level: 48; }
  tab-item[data-level="49"] { --indent-level: 49; }
  tab-item[data-level="50"] { --indent-level: 50; }
  tab-item[data-level="51"] { --indent-level: 51; }
  tab-item[data-level="52"] { --indent-level: 52; }
  tab-item[data-level="53"] { --indent-level: 53; }
  tab-item[data-level="54"] { --indent-level: 54; }
  tab-item[data-level="55"] { --indent-level: 55; }
  tab-item[data-level="56"] { --indent-level: 56; }
  tab-item[data-level="57"] { --indent-level: 57; }
  tab-item[data-level="58"] { --indent-level: 58; }
  tab-item[data-level="59"] { --indent-level: 59; }
  tab-item[data-level="60"] { --indent-level: 60; }
  tab-item[data-level="61"] { --indent-level: 61; }
  tab-item[data-level="62"] { --indent-level: 62; }
  tab-item[data-level="63"] { --indent-level: 63; }
  tab-item[data-level="64"] { --indent-level: 64; }
  tab-item[data-level="65"] { --indent-level: 65; }
  tab-item[data-level="66"] { --indent-level: 66; }
  tab-item[data-level="67"] { --indent-level: 67; }
  tab-item[data-level="68"] { --indent-level: 68; }
  tab-item[data-level="69"] { --indent-level: 69; }
  tab-item[data-level="70"] { --indent-level: 70; }
  tab-item[data-level="71"] { --indent-level: 71; }
  tab-item[data-level="72"] { --indent-level: 72; }
  tab-item[data-level="73"] { --indent-level: 73; }
  tab-item[data-level="74"] { --indent-level: 74; }
  tab-item[data-level="75"] { --indent-level: 75; }
  tab-item[data-level="76"] { --indent-level: 76; }
  tab-item[data-level="77"] { --indent-level: 77; }
  tab-item[data-level="78"] { --indent-level: 78; }
  tab-item[data-level="79"] { --indent-level: 79; }
  tab-item[data-level="80"] { --indent-level: 80; }
  tab-item[data-level="81"] { --indent-level: 81; }
  tab-item[data-level="82"] { --indent-level: 82; }
  tab-item[data-level="83"] { --indent-level: 83; }
  tab-item[data-level="84"] { --indent-level: 84; }
  tab-item[data-level="85"] { --indent-level: 85; }
  tab-item[data-level="86"] { --indent-level: 86; }
  tab-item[data-level="87"] { --indent-level: 87; }
  tab-item[data-level="88"] { --indent-level: 88; }
  tab-item[data-level="89"] { --indent-level: 89; }
  tab-item[data-level="90"] { --indent-level: 90; }
  tab-item[data-level="91"] { --indent-level: 91; }
  tab-item[data-level="92"] { --indent-level: 92; }
  tab-item[data-level="93"] { --indent-level: 93; }
  tab-item[data-level="94"] { --indent-level: 94; }
  tab-item[data-level="95"] { --indent-level: 95; }
  tab-item[data-level="96"] { --indent-level: 96; }
  tab-item[data-level="97"] { --indent-level: 97; }
  tab-item[data-level="98"] { --indent-level: 98; }
  tab-item[data-level="99"] { --indent-level: 99; }

  tab-item:not(.pinned):not(.collapsed) ::part(%EXTRA_CONTENTS_PART% indent-line) {
    bottom: 0;
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

  /*
  tab-item:not(.pinned):not(.collapsed) ::part(%EXTRA_CONTENTS_PART% connector-line) {
    border-top: 1px solid var(--tab-border);
    height: 1px;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transition: opacity var(--collapse-animation);
    width: var(--tab-indent);
  }

  :root.left tab-item:not(.pinned) ::part(%EXTRA_CONTENTS_PART% connector-line) {
    left: calc((var(--indent-size) * 0.75) + calc(var(--indent-size) * (var(--indent-level) - 1)));
  }

  :root.right tab-item:not(.pinned) ::part(%EXTRA_CONTENTS_PART% connector-line) {
    right: calc((var(--indent-size) * 0.75) + calc(var(--indent-size) * (var(--indent-level) - 1)));
  }
  */
`;

const AUTO_STYLE = `${BASE_STYLE}
  tab-item:not(.pinned):not(.collapsed) ::part(%EXTRA_CONTENTS_PART% indent-line) {
    background-image: var(--indent-line-highlighted);
    opacity: var(--indent-line-opacity);
  }

  :root:hover tab-item:not(.pinned):not(.collapsed) ::part(%EXTRA_CONTENTS_PART% indent-line) {
    background-image: var(--indent-line-highlighted), var(--indent-line);
    --indent-line-opacity: 1;
  }
`;

const ALWAYS_SHOW_STYLE = `${BASE_STYLE}
  tab-item:not(.pinned):not(.collapsed) ::part(%EXTRA_CONTENTS_PART% indent-line) {
    background-image: var(--indent-line-highlighted), var(--indent-line);
    opacity: 1;
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

configs.$addObserver(key => {
  switch (key) {
    case 'autoShow':
      applyStyles();
      return;
  }
});

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
    if (!activeTab)
      return;

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
    style: `
      ${configs.autoShow ? AUTO_STYLE : ALWAYS_SHOW_STYLE}
      ${Array.from(stylesForWindow.values()).join('\n')}
    `,
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
    contents: [
      '<span id="indent-line" part="indent-line"></span>',
      '<span id="connector-line" part="connector-line"></span>',
    ].join(''),
  });
}
