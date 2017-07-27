'use strict';

const documentUrlPatterns = ['https://instagram.com/*', 'https://www.instagram.com/*'];

chrome.contextMenus.create({
    'title': 'Open in new tab',
    'documentUrlPatterns': documentUrlPatterns,
    'contexts': ['page', 'link'],
    'onclick': onClick
});

function onClick(event) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length && tabs[0]) {
            const currentTabId = tabs[0]['id'];
            chrome.tabs.sendMessage(currentTabId, 'processMediaUnderMouse', (response) => {
                const mediaUrl = orig(String(response.mediaUrl));
                mediaUrl.length && chrome.tabs.create({ 'url': mediaUrl });
            });
        }
    });
}

function orig(src)
{
	return src.substring(0,src.indexOf('/', 8)+1) + 'x' + src.substring(src.lastIndexOf('/'));

}
