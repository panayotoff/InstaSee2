'use strict';

const documentUrlPatterns = ['https://instagram.com/*', 'https://www.instagram.com/*'];

chrome.contextMenus.create({
	'title': 'Open in new tab',
	'documentUrlPatterns': documentUrlPatterns,
	'contexts': ['page', 'link'],
	'onclick': onClick
});

//--------------------------------------------------------------
//	When click on media in default feed
//--------------------------------------------------------------
function onClick(event) {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		if (tabs.length && tabs[0]) {
			const currentTabId = tabs[0]['id'];
			chrome.tabs.sendMessage(currentTabId, 'processMediaUnderMouse', (response) => {
				const mediaUrl = String(response.mediaUrl);
				openMediaInNewTab(mediaUrl);
			});
		}
	});
}

//--------------------------------------------------------------
//	Open in new tab when user right-click on stories
//--------------------------------------------------------------
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === 'openMediaInNewTab') {
		openMediaInNewTab(request.mediaUrl);
	}
});

//--------------------------------------------------------------
//	Open media in new tab
//--------------------------------------------------------------
function openMediaInNewTab(mediaUrl) {
	if (mediaUrl && mediaUrl.length) {
		chrome.tabs.create({'url': mediaUrl});
	}
}