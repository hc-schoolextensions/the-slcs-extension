chrome.storage.local.get({
    contextMenu: true,
    adBlocking: false,
    nweaPopupAllow: true
}, function (items) {
    if (items.contextMenu === true)
        enableContextMenus(items.contextMenu);
    if (items.adBlocking === true)
        enableAdBlocking(items.adBlocking);
    if (items.nweaPopupAllow === true)
        enableNweaPopups(items.nweaPopupAllow);
    return true
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (changes.contextMenu)
        enableContextMenus(changes.contextMenu.newValue);
    if (changes.adBlocking)
        enableAdBlocking(changes.adBlocking.newValue);
    if (changes.ytCookieBlock)
        enableYtCookieBlock(changes.ytCookieBlock.newValue);
    if (changes.nweaPopupAllow)
        enableNweaPopups(changes.nweaPopupAllow.newValue);
    if (changes.allowCors)
        enableDisableCors(changes.allowCors.newValue);
    return true
});

function enableContextMenus(enable) {
    if (enable === true || enable === undefined) {
        chrome.contextMenus.removeAll();
        chrome.contentSettings.cookies.get({
            primaryUrl: "https://www.youtube.com/"
        }, function (details) {
            chrome.contextMenus.create({
                "title": "View blocked page info",
                "contexts": ["page", "frame"],
                "documentUrlPatterns": ["*://*.blocked.goguardian.com/*"],
                "id": "blockedDataPage"
            });
            chrome.contextMenus.create({
                "title": "Copy link to blocked page info",
                "contexts": ["page", "frame"],
                "documentUrlPatterns": ["*://*.blocked.goguardian.com/*"],
                "id": "copyBlockedLinkData"
            });
            chrome.contextMenus.create({
                "type": "separator",
                "id": "sep1",
                "contexts": ["page"],
                "documentUrlPatterns": ["*://*.blocked.goguardian.com/*"]
            });
            chrome.contextMenus.create({
                "title": "View blocked URL data",
                "contexts": ["link"],
                "targetUrlPatterns": ["*://*.blocked.goguardian.com/*"],
                "id": "blockedDataLink"
            });
            chrome.contextMenus.create({
                "title": "Copy link to blocked info",
                "contexts": ["link"],
                "targetUrlPatterns": ["*://*.blocked.goguardian.com/*"],
                "id": "copyBlockedUrlData"
            });
            chrome.contextMenus.create({
                "title": "Block cookies",
                "contexts": ["page", "frame"],
                "documentUrlPatterns": ["*://*.youtube.com/*"],
                "id": "youtubeDeleteCookies",
                "type": "checkbox",
                "checked": details.setting == "block"
            });
            chrome.contextMenus.create({
                "type": "separator",
                "id": "sep2",
                "contexts": ["page", "frame"],
                "documentUrlPatterns": ["*://*.youtube.com/*"]
            });
            chrome.contextMenus.create({
                "title": "Clear cookie settings",
                "contexts": ["page", "frame"],
                "documentUrlPatterns": ["*://*.youtube.com/*"],
                "id": "clearCookieSettings"
            });
            chrome.contextMenus.create({
                "type": "separator",
                "id": "sep3",
                "contexts": ["page", "frame"],
                "documentUrlPatterns": ["*://*.youtube.com/*"]
            });
            chrome.contextMenus.create({
                "type": "separator",
                "id": "sep4",
                "contexts": ["link"],
                "targetUrlPatterns": ["*://*.blocked.goguardian.com/*"]
            });
            chrome.contextMenus.create({
                "title": "Open frame in new tab",
                "contexts": ["frame"],
                "id": "openFrame"
            });
            chrome.contextMenus.create({
                "title": "Copy frame address",
                "contexts": ["frame"],
                "id": "copyFrameLink"
            });
            chrome.contextMenus.create({
                "title": "View frame source",
                "contexts": ["frame"],
                "id": "viewSourceFrame"
            });
            chrome.contextMenus.create({
                "type": "separator",
                "contexts": ["frame"],
                "id": "sep5"
            });
            chrome.contextMenus.create({
                "title": "Copy as data URL",
                "contexts": ["image", "video", "audio"],
                "id": "copyAsDataUrl"
            });
            chrome.contextMenus.create({
                "title": "View link source",
                "contexts": ["link"],
                "id": "viewSourceLink"
            });
            chrome.contextMenus.create({
                "title": "View page source",
                "contexts": ["page"],
                "id": "viewSourcePage"
            })
        });
    } else {
        chrome.contextMenus.removeAll();
    }
}

function onClickHandler(info, tab) {
    if (info.menuItemId.startsWith('blockedData')) {
        chrome.tabs.create({
            url: `info.html#${info.menuItemId == "blockedDataLink" ? info.linkUrl : info.pageUrl.includes('://blocked.goguardian.com/') ? info.pageUrl : info.frameUrl}`,
            index: tab.index + 1,
            openerTabId: tab.id,
            windowId: tab.windowId
        });
    }
    if (info.menuItemId == "youtubeDeleteCookies") {
        chrome.contentSettings.cookies.set({
            primaryPattern: "*://*.youtube.com/*",
            setting: info.checked ? "block" : "allow",
            scope: "regular"
        });
        chrome.storage.local.set({
            ytCookieBlock: info.checked
        });
        if (tab.url == "https://www.youtube.com/t/restricted_access?blocked=4") {
            chrome.tabs.update(tab.id, {
                url: "https://www.youtube.com/"
            });
        } else {
            chrome.tabs.reload(tab.id);
        }
    }
    if (info.menuItemId == "clearCookieSettings") {
        chrome.contentSettings.cookies.clear({});
        chrome.tabs.reload(tab.id);
        chrome.contentSettings.cookies.get({
            primaryUrl: tab.url
        }, function (details) {
            chrome.contextMenus.update("youtubeDeleteCookies", {
                "checked": details.setting == "block"
            });
        });
    }
    if (info.menuItemId.startsWith('viewSource')) {
        chrome.tabs.create({
            url: `view-source:${info.menuItemId == "viewSourceLink" ? info.linkUrl : info.menuItemId == "viewSourceFrame" ? info.frameUrl : info.pageUrl}`,
            index: tab.index + 1,
            openerTabId: tab.id
        });
    }
    if (info.menuItemId == "openFrame") {
        chrome.tabs.create({
            url: info.frameUrl,
            index: tab.index + 1,
            openerTabId: tab.id,
            windowId: tab.windowId
        });
    }
    if (info.menuItemId == "copyFrameLink") {
        copy(info.frameUrl);
    }
    if (info.menuItemId == "copyBlockedLinkData") {
        copy(`https://goguardian-info.pages.dev/info#${info.pageUrl.includes('://blocked.goguardian.com/') ? info.pageUrl : info.frameUrl}`);
    }
    if (info.menuItemId == "copyBlockedUrlData") {
        copy(`https://goguardian-info.pages.dev/info#${info.linkUrl}`);
    }
    if (info.menuItemId == "copyAsDataUrl") {
        copyDataUrl(info.srcUrl);
    }
    return true
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

function enableAdBlocking(enable) {
    if (enable === true) {
        var adblockRequest = new Request('https://raw.githubusercontent.com/hc-schoolextensions/the-slcs-extension/data/adblockfilters.txt');
        var adblockRequest2 = new Request('https://raw.githubusercontent.com/hc-schoolextensions/the-slcs-extension/data/adblockexclusions.txt');
        fetch(adblockRequest)
            .then(response => response.text())
            .then(filters => addAdblock(filters.split(", ")));

        function addAdblock(filters) {
            fetch(adblockRequest2)
                .then(response => response.text())
                .then(exclusions => runAdBlock(exclusions.split(", ")));

            function runAdBlock(exclusions) {
                chrome.declarativeNetRequest.getDynamicRules(function (result) {
                    chrome.declarativeNetRequest.updateDynamicRules({
                        removeRuleIds: range(result.length, 1)
                    }, function () {
                        filters.forEach((domain, index) => {
                            let id = index + 1;
                            chrome.declarativeNetRequest.updateDynamicRules({
                                addRules: [{
                                    id: id,
                                    priority: 1,
                                    action: {
                                        type: "block"
                                    },
                                    condition: {
                                        excludedInitiatorDomains: exclusions,
                                        urlFilter: domain,
                                        resourceTypes: ["sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "webtransport", "webbundle", "other"]
                                    },
                                }, ],
                                removeRuleIds: [id],
                            });
                        });
                    });
                });
            }
        }
    } else {
        chrome.declarativeNetRequest.getDynamicRules(function (result) {
            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: range(result.length, 1)
            });
        });
    }
}

function enableYtCookieBlock(enabled) {
    chrome.contentSettings.cookies.set({
        primaryPattern: "*://*.youtube.com/*",
        setting: enabled ? "block" : "allow",
        scope: "regular"
    });
    chrome.storage.local.get({
        contextMenu: true
    }, function (items) {
        if (!items.contextMenu === false) {
            chrome.contextMenus.update("youtubeDeleteCookies", {
                "checked": enabled
            });
        }
    });
}

function enableNweaPopups(allowvalue) {
    if (allowvalue === undefined)
        allowvalue = true;
    chrome.contentSettings.popups.set({
        primaryPattern: "*://*.test.mapnwea.org/*",
        setting: allowvalue ? "allow" : "block",
        scope: "regular"
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action == "clearLocalStorage") {
        chrome.storage.local.clear();
        sendResponse({
            received: true
        });
    }
    return true
});

function copy(copydata) {
    function copyToClipboard(copyInfo) {
        navigator.clipboard.writeText(copyInfo);
    }
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.scripting.executeScript({
            target: {
                tabId: tabs[0].id
            },
            func: copyToClipboard,
            args: [copydata],
        });
    });
}

function copyDataUrl(ogURL) {
    function dataURL(originalUrl) {
        (async function () {
            let blob = await fetch(originalUrl).then(r => r.blob());
            let dataUrl = await new Promise(resolve => {
                let reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
            navigator.clipboard.writeText(dataUrl);
        })();
    }
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.scripting.executeScript({
            target: {
                tabId: tabs[0].id
            },
            func: dataURL,
            args: [ogURL],
        });
    });
}

function enableDisableCors(allowcors) {
    if (allowcors === true) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ["ruleset_1"]
        });
    } else {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ["ruleset_1"]
        });
    }
}

chrome.commands.onCommand.addListener((command) => {
    chrome.storage.local.get({
        keyboardShortcuts: true
    }, function (items) {
        if (items.keyboardShortcuts === true)
            kbShortcuts(command);
    });
});

function kbShortcuts(command) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        if (command == "view-page-source") {
            chrome.tabs.create({
                url: `view-source:${tabs[0].url}`,
                index: tabs[0].index + 1,
                openerTabId: tabs[0].id,
                windowId: tabs[0].windowId
            });
        }
        if (command == "youtube-block-cookies") {
            if (tabs[0].url.startsWith("https://music.youtube.com") || tabs[0].url.startsWith("https://www.youtube.com")) {
                chrome.storage.local.get({
                    "ytCookieBlock": false
                }, function (result) {
                    chrome.storage.local.set({
                        "ytCookieBlock": !result.ytCookieBlock
                    });
                });
                if (tabs[0].url == "https://www.youtube.com/t/restricted_access?blocked=4") {
                    chrome.tabs.update(tabs[0].id, {
                        url: "https://www.youtube.com/"
                    });
                } else {
                    chrome.tabs.reload(tabs[0].id);
                }
            }
        }
    });
}

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function nweaTabsProtect() {
    var searchString;
    var searchResult;

    function handleWindowFocusChange(eventWindowId) {
        chrome.tabs.query({}, function (data) {
            searchString = 'https://test.mapnwea.org';
            searchResult = data.findIndex((taburl) => {
                return taburl.url.startsWith(searchString);
            }, searchString);
            if (searchResult > -1) {
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function (tabs) {
                    if (tabs[0]) {
                        if (tabs[0].url) {
                            chrome.tabs.query({
                                "url": "*://test.mapnwea.org/*"
                            }, function (tabsdata) {
                                if (tabsdata[tabsdata.length - 1].url !== "https://test.mapnwea.org/#/lockdown") {
                                    chrome.windows.update(tabsdata[tabsdata.length - 1].windowId, {
                                        "focused": true,
                                        "state": "fullscreen"
                                    });
                                } else if (tabsdata[tabsdata.length - 1].url === "https://test.mapnwea.org/#/lockdown") {
                                    chrome.contentSettings.popups.get({
                                        primaryUrl: "https://test.mapnwea.org"
                                    }, function (details) {
                                        if (details.setting == "allow") {
                                            chrome.tabs.remove(tabsdata[tabsdata.length - 1].id);
                                        }
                                    });
                                } else {
                                    chrome.windows.update(tabsdata[tabsdata.length - 1].windowId, {
                                        "focused": false,
                                        "state": "normal"
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    chrome.tabs.onCreated.addListener(handleWindowFocusChange);
    chrome.tabs.onUpdated.addListener(handleWindowFocusChange);
    chrome.tabs.onRemoved.addListener(handleWindowFocusChange);
    chrome.windows.onFocusChanged.addListener(handleWindowFocusChange);
    chrome.windows.onBoundsChanged.addListener(handleWindowFocusChange);
}
nweaTabsProtect();