chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function (tabs) {
    chrome.storage.local.get({
        goguardianInfoPopup: false
    }, function (items) {
        if (tabs[0].url.startsWith('://blocked.goguardian.com/', 5) && items.goguardianInfoPopup === true) {
            goguardianinfo(tabs[0].url);
        } else {
            slcsapps();
        }
    });
});

function slcsapps() {
    document.querySelector('.outercontainer').innerHTML = `<div style="display: flex; align-items: center; margin-bottom: 10px;" id="mb10div"><img src="../icon.png" alt="SLCS logo" width="50px" style="margin-right: 10px;"><span style="font-size: 2.2rem; font-weight: bolder;">SLCS Apps</span></div><a href="options.html"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="fill: gray; width: 35px; position: absolute; top: 11px; right: 11px; cursor: pointer;"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"/></svg></a><div id="osdwarning" style="display: none;"><div style="display: flex; align-items: center;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="fill: orange; width: 35px; margin-right: 5px;"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M336 0C362.5 0 384 21.49 384 48V232.2C344.9 264.5 320 313.3 320 368C320 417.5 340.4 462.2 373.3 494.2C364.5 505.1 351.1 512 336 512H240V432C240 405.5 218.5 384 192 384C165.5 384 144 405.5 144 432V512H48C21.49 512 0 490.5 0 464V48C0 21.49 21.49 0 48 0H336zM64 272C64 280.8 71.16 288 80 288H112C120.8 288 128 280.8 128 272V240C128 231.2 120.8 224 112 224H80C71.16 224 64 231.2 64 240V272zM176 224C167.2 224 160 231.2 160 240V272C160 280.8 167.2 288 176 288H208C216.8 288 224 280.8 224 272V240C224 231.2 216.8 224 208 224H176zM256 272C256 280.8 263.2 288 272 288H304C312.8 288 320 280.8 320 272V240C320 231.2 312.8 224 304 224H272C263.2 224 256 231.2 256 240V272zM80 96C71.16 96 64 103.2 64 112V144C64 152.8 71.16 160 80 160H112C120.8 160 128 152.8 128 144V112C128 103.2 120.8 96 112 96H80zM160 144C160 152.8 167.2 160 176 160H208C216.8 160 224 152.8 224 144V112C224 103.2 216.8 96 208 96H176C167.2 96 160 103.2 160 112V144zM272 96C263.2 96 256 103.2 256 112V144C256 152.8 263.2 160 272 160H304C312.8 160 320 152.8 320 144V112C320 103.2 312.8 96 304 96H272zM352 368C352 288.5 416.5 224 496 224C575.5 224 640 288.5 640 368C640 447.5 575.5 512 496 512C416.5 512 352 447.5 352 368zM496 464C509.3 464 520 453.3 520 440C520 426.7 509.3 416 496 416C482.7 416 472 426.7 472 440C472 453.3 482.7 464 496 464zM479.1 288V368C479.1 376.8 487.2 384 495.1 384C504.8 384 511.1 376.8 511.1 368V288C511.1 279.2 504.8 272 495.1 272C487.2 272 479.1 279.2 479.1 288z"/></svg><span style="font-size: 1.4rem; font-weight: bolder;">You're being monitored by SLCS.</span></div><p style="margin-top: 2px; margin-bottom: 7.5px;">Sign out of your school account to stop being monitored.</p></div><input type="text" id="searchbox" placeholder="Search for an app..." title="Enter an app name" autofocus><ul id="myUL" class="grid-container"></ul>`;

    function search() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("searchbox");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0].getElementsByTagName("txtname")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
    document.getElementById('searchbox').addEventListener('input', search);
    var myRequest = new Request('https://raw.githubusercontent.com/hc-schoolextensions/slcs-apps-extension/data/data.txt');
    var items;
    var itemdata;
    var myul = document.getElementById('myUL');

    function additems(data) {
        items = data.split(";;");
        items.forEach(item => {
            itemdata = item.split("::");
            if (itemdata[1] != undefined) {
                myul.innerHTML += `<li class="grid-item" data-url="${itemdata[1]}" data-apptype="${itemdata[3]}"><a><div class="midiv"><span class="material-icons material-icons--rounded">${itemdata[0]}</span><txtname>${itemdata[2]}</txtname></div></a></li>`;
            }
        });
        addlinks();
    }

    function addlinks() {
        var els = document.getElementsByClassName("grid-item");
        Array.prototype.forEach.call(els, function (el) {
            el.addEventListener('click', function () {
                if (el.dataset.apptype == "popup") {
                    chrome.windows.create({
                        focused: true,
                        state: "maximized",
                        type: "popup",
                        url: el.dataset.url
                    }, function () {
                        window.close();
                    });
                } else {
                    chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    }, function (tabs) {
                        if (tabs[0].url.startsWith("chrome://newtab")) {
                            chrome.tabs.update(tabs[0].id, {
                                url: el.dataset.url
                            }, function () {
                                window.close();
                            });
                        } else {
                            chrome.tabs.create({
                                url: el.dataset.url,
                                index: tabs[0].index + 1,
                                openerTabId: tabs[0].id,
                                windowId: tabs[0].windowId
                            });
                        }
                    });
                }
            });
        });
    }

    function monitoredcheck() {
        if (!navigator.userAgent.includes('CrOS')) {
            document.getElementById('osdwarning').style.display = 'block';
            document.getElementById('mb10div').style.marginBottom = '7.5px';
        }
    }
    monitoredcheck();
    fetch(myRequest)
        .then(response => response.text())
        .then(data => additems(data));
}
const ctxprops = {
    oi: "orgID",
    ou: "originalURL",
    st: "sourceType",
    rs: "reason",
    sci: "siteCategoryID",
    api: "adminPolicyID",
    afi: "adminFilterID",
    pfi: "parentFilterID",
    x3rpi: "x3ReportPublicID",
    tsi: "teacherSceneID",
    tsfi: "teacherSceneFilterID",
    tsans: "teacherSessionAdminNames",
    v: "v"
};
const rsprops = {
    BlockWebProxies: "BlockWebProxies",
    BLOCK_WEB_PROXIES: "BlockWebProxies",
    BLOCK_DIRECT_IP_ACCESS: "BlockDirectIPAccess",
    BLOCK_CONSUMER_ACCOUNTS: "BlockConsumerAccounts",
    ADMIN_SITE_FILTER: "AdminSiteFilter",
    ADMIN_SITE_CATEGORY_FILTER: "AdminSiteCategoryFilter",
    ADMIN_SAFE_MODE: "AdminSafeMode",
    PARENT_SITE_FILTER: "ParentSiteFilter",
    PARENT_PAUSE: "ParentPause",
    PARENT_SCHEDULED_PAUSE: "ParentScheduledPause",
    X3_REPORT: "X3Report",
    TEACHER_SCENE: "TeacherScene",
    UNKNOWN: "Unknown"
}

function goguardianinfo(taburl) {
    document.querySelector('.outercontainer').innerHTML = `<div id="data"><h1 style="text-align: center;">Loading...</h1></div>`;
    var data = document.getElementById('data');
    var ctx = new URLSearchParams(atob(decodeURI(new URLSearchParams(taburl.split('?')[1]).get('ctx'))));
    var tmpdata = '';
    for (var pair of ctx.entries()) {
        tmpdata += `<strong>${ctxprops[pair[0]] ? ctxprops[pair[0]] : pair[0]}: </strong>${pair[0] == 'ou' ? decodeURI(pair[1]) : pair[0] == 'rs' ? rsprops[pair[1]] : pair[1]}<br>`;
    }
    data.innerHTML = `<p id="prefix" style="font-weight: 500;"><strong style="font-weight: bold;">GoGuardian Blocked Page Info</strong></p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 35px;" id="closeicon"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg></div><div id="innerdatacontainer">${tmpdata}</div>`;
    document.getElementById('closeicon').addEventListener('click', slcsapps);
}