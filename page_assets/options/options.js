if (!navigator.userAgent.includes('CrOS')) {
    document.getElementById('osdoption').style.display = "block";
}
document.getElementById('back').addEventListener('click', function () {
    window.close();
});
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get({
        osdOptOut: false,
        contextMenu: true,
        adBlocking: false,
        ytCookieBlock: false,
        nweaPopupAllow: true,
        goguardianInfoPopup: false,
        goguardianInfo: true,
        keyboardShortcuts: true,
        allowCors: false
    }, function (items) {
        for (let name of Object.keys(items)) {
            document.getElementById(name).checked = items[name];
        }
    });
});

document.getElementById('advanced').addEventListener('click', function () {
    document.getElementById('advancedContent').style.display = document.getElementById('advancedContent').style.display == "none" ? "block" : "none";
});

[...document.getElementsByClassName('form-check-input')].forEach(element => {
    element.addEventListener('change', function () {
        chrome.storage.local.set({
            [element.id]: element.checked
        });
    });
});

[...document.getElementsByClassName('link')].forEach(element => {
    element.addEventListener('click', function () {
        chrome.runtime.sendMessage({
            "action": [element.id]
        }, function (response) {
            return response.received
        });
    });
});