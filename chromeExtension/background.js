console.log('background.js');

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, "Action");
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    // if (request === 'Action') {
    //     chrome.runtime.sendMessage(article.uniqueUnknownWords());
    // }
});
