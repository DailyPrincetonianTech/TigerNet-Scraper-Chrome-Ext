let loadBtn = document.getElementById('load');
let clearBtn = document.getElementById('clear');
let rmvDupBtn = document.getElementById('rmvDup');
let rmvNoneBtn = document.getElementById('rmvNone');
let entriesList = document.getElementById('csv');
let linksList = document.getElementById('links');

function loadEntries() {
    var entriesStr = "";
    chrome.storage.local.get(['entries'], function(result) {
        for (i = 0; i < result.entries.length; i++) {
            if (result.entries[i] != null) {
                entriesStr += `<div>` + result.entries[i] + `</div>`;
            }
        }
        entriesList.innerHTML += entriesStr;
    });

    // linksList.innerHTML = "";
    // var linksStr = "";
    // chrome.storage.local.get(['links'], function(result) {
    //     for (i = 0; i < result.links.length; i++) {
    //         linksStr += `<div>` + result.links[i] + `</div>`;
    //     }
    //     linksList.innerHTML = linksStr;
    // });

}

function clearEntries() {
    entriesList.innerHTML = "";
    chrome.storage.local.set({entries: []}, function() {
        console.log('Cleared entries.');
    });
}

function removeDuplicates() {
    var newStr = "";
    entries = entriesList.children;
    for (i = 0; i < entries.length; i++) {
        for (j = 0; j < i; j++) {
            if (entries[i].innerHTML === entries[j].innerHTML) {
                break;
            }
        }
        if (j == i) {
            newStr += `<div>` + entries[i].innerHTML + `</div>`;
        }
    }
    entriesList.innerHTML = newStr;
}

function removeNone() {
    var newStr = "";
    entries = entriesList.children;
    for (i = 0; i < entries.length; i++) {
        if (entries[i].innerHTML !== "NONE NONE,NONE") {
            newStr += `<div>` + entries[i].innerHTML + `</div>`;
        }
    }
    entriesList.innerHTML = newStr;
}

loadEntries();
loadBtn.onclick = loadEntries;
clearBtn.onclick = clearEntries;
rmvDupBtn.onclick = removeDuplicates;
rmvNoneBtn.onclick = removeNone;
