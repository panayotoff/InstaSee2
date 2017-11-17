(function (window, document, undefined) {

	const mediaRegex = /img|video/gi;
	let lastKnownMediaSource = '';


	const getMediaSrcUnderPoint = (pointX, pointY) => {
		const elements = document.elementsFromPoint(pointX, pointY);
		const media = elements.find(element => mediaRegex.test(element.tagName));
		const mediaSources = media.querySelectorAll('source');


		if (mediaSources.length) {
			const mediaSource = mediaSources[0];
			const mediaSourceUrl = mediaSource.getAttribute('src');
			if (mediaSourceUrl && mediaSourceUrl.length) {
				return mediaSourceUrl;
			}
		}

		return media ? media.getAttribute('src') : '';
	};

	window.addEventListener('contextmenu', (event) => {
		//Instagram Stories
		if (event.defaultPrevented) {
			const mediaSource = getMediaSrcUnderPoint(event.clientX, event.clientY);

			if (mediaSource && mediaSource.length) {

				chrome.runtime.sendMessage({
					type: 'openMediaInNewTab',
					mediaUrl: mediaSource
				}, (response) => {

				});

			}
		}
	});

	document.addEventListener('mousedown', (event) => {
		if (event.button == 2) {
			lastKnownMediaSource = getMediaSrcUnderPoint(event.clientX, event.clientY);
		}
	});

	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request == 'processMediaUnderMouse') {
			sendResponse({mediaUrl: lastKnownMediaSource});
		}
	});


})(window, document);