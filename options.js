let loadBtn = document.getElementById('load');
let entriesList = document.getElementById('csv');
let linksList = document.getElementById('links');

function loadEntries() {
    entriesList.innerHTML = "";
    var entriesStr = "";
    chrome.storage.local.get(['entries'], function(result) {
        for (i = 0; i < result.entries.length; i++) {
            entriesStr += `<div>` + result.entries[i] + `</div>`;
        }
        entriesList.innerHTML = entriesStr;
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

loadEntries();
loadBtn.onclick = loadEntries;
