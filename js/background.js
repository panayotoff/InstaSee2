'use strict';

chrome.contextMenus.create({
    'title': 'Open media in new tab',
    'contexts': ['page', 'link'],
    'onclick': onClick
});

function onClick(event) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length && tabs[0]) {
            const currentTabId = tabs[0]['id'];
            chrome.tabs.sendMessage(currentTabId, 'processMediaUnderMouse', (response) => {
                const mediaUrl = String(response.mediaUrl);
                mediaUrl.length && chrome.tabs.create({ 'url': mediaUrl });
            });
        }
    });
}