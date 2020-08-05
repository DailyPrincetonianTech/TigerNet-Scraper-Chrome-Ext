chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({entries: new Array(20)}, function() {
        console.log("Empty entries list has been set.");
    });
    chrome.storage.local.set({links: []}, function() {
        console.log("Empty link list has been set.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'tigernet.princeton.edu'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
