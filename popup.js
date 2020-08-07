let get = document.getElementById('get');
let open = document.getElementById('open');
let parse = document.getElementById('parse');
let close = document.getElementById('close');
let check = document.getElementById('check');
let checkDiv = document.getElementById('checkDiv');



var gatherPages = `
    var profiles = document.getElementsByClassName("imod-directory-member-name");
    var profileLinks = [];
    var i;
    for (i = 0; i < profiles.length; i++) {
        var profileLink = profiles[i].getElementsByTagName('a')[0].href;
        profileLinks.push(profileLink);
        console.log(profileLink);
    }

    chrome.storage.local.set({links: profileLinks}, function() {
        console.log('Entries saved to local storage.');
    });

    chrome.storage.local.set({entries: new Array(20)}, function() {
        console.log('Entries saved to local storage.');
    });
`;

var parseInfo = `
    var labelContainer = document.getElementsByClassName("imod-profile-field-label ng-binding ng-scope");
    var dataContainer = document.getElementsByClassName("imod-profile-field-data ng-binding ng-scope");

    var i;
    var firstName = "NONE";
    var lastName = "NONE";
    var email = "NONE";

    for (i = 0; i < labelContainer.length; i++) {
        if (labelContainer[i].innerHTML === "First Name:") {
            firstName = dataContainer[i].innerHTML;
        }
        if (labelContainer[i].innerHTML === "Last Name:") {
            lastName = dataContainer[i].innerHTML;
        }
        if (labelContainer[i].innerHTML === "Primary Email:") {
            email = dataContainer[i].innerHTML;
        }
    }

    var entry = firstName + " " + lastName + "," + email;

    chrome.storage.local.get(['entries'], function(result) {
        result.entries[NUMBER] = entry;
        chrome.storage.local.set({entries: result.entries}, function() {
            console.log('New Entry: ' + entry);
        });
    });
`;

get.onclick = function(element) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id, {
                code: gatherPages
            });
    });
};

open.onclick = function(element) {
    chrome.storage.local.get(['links'], function(result) {
        for (i = 0; i < result.links.length; i++) {
            console.log("Creating tab.");
            chrome.tabs.create({ url: result.links[i], active: false});
        }
    });
};

parse.onclick = function(element) {
    chrome.tabs.query({
        url: `*://tigernet.princeton.edu/*`,
        active: false,
        currentWindow: true
    }, function(tabs) {
        var i;
        for (i = 0; i < tabs.length; i++) {
            console.log("Parsing tab.");
            chrome.tabs.executeScript(
                tabs[i].id, {
                    code: parseInfo.replace("NUMBER", i)
                });
            // Simple "timer" to ensure completion.
            for (j = 0; j < 100000000; j++)
                ;
        }
    });
};

close.onclick = function(element) {
    chrome.tabs.query({
        url: `*://tigernet.princeton.edu/*`,
        active: false,
        currentWindow: true
    }, function(tabs) {
        var i;
        for (i = 0; i < tabs.length; i++) {
            chrome.tabs.remove(tabs[i].id, function() {
                console.log("Closed tab.");
            });
        }
    });
};

check.onclick = function(element) {
    chrome.storage.local.get(['entries'], function(result) {
        var count = 0;
        for (i = 0; i < result.entries.length; i++) {
            if (result.entries[i] != null) {
                count++;
            }
        }
        checkDiv.innerHTML = count;
    });
}
