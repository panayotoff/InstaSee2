(function (window, document, undefined) {

    const mediaRegex = /img|video/gi;
    let lastKnownMediaSource = '';

    document.addEventListener('mousedown', (event) => {
        if (event.button == 2) {
            const elements = document.elementsFromPoint(event.clientX, event.clientY);
            const media = elements.find(element => mediaRegex.test(element.tagName));
            lastKnownMediaSource = media.getAttribute('src');
        }
    });
    
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request == 'processMediaUnderMouse') {
            sendResponse({ mediaUrl: lastKnownMediaSource });
        }
    });
    
})(window, document);