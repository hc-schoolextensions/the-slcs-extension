chrome.storage.local.get({
    osdOptOut: false
}, function (items) {
    if (!items.osdOptOut && !navigator.userAgent.includes('CrOS')) {
        var osdcss = document.createElement('style');
        osdcss.innerHTML = `
      div div.osd-cont {
          z-index: 9999999999 !important;
          position: fixed !important;
          box-sizing: border-box !important;
          top: 15px;
          left: 15px;
          user-select: none;
      }
      
      div div.osd-cont * {
          box-sizing: border-box !important;
          user-select: none;
          margin: 0 !important;
          padding: 0 !important;
          font-family: Helvetica, sans-serif !important;
          font-size: 15px !important;
          text-decoration: none !important;
          line-height: 1.25 !important;
          letter-spacing: normal !important;
      }
      
      div div.osd-cont strong {
          line-height: 1 !important;
          font-weight: bold !important;
      }
      
      div div.osd-cont #osddivheader {
          background-color: #008080 !important;
          width: 50px !important;
          height: 44px !important;
          border: 2px solid #000 !important;
          border-radius: 8px !important;
      }
      
      div div.osd-cont #osddivheader #osdsvg {
          width: 35px !important;
          margin: 5.5px 5.5px !important;
          fill: white !important;
      }
      
      div div.osd-cont #osddivcontent {
          background-color: white !important;
          color: black !important;
          border: 2px solid black !important;
          margin-top: 10px !important;
          padding: 6.5px !important;
          border-radius: 5px !important;
      }
      
      div div.osd-cont #osddivcontent a {
          color: blue !important;
      }
      
      div div.osd-cont #osddivcontent a:hover {
          text-decoration: underline !important;
      }
      
      div div.osd-cont #osddivcontent a:active {
          text-decoration: underline !important;
      }
      @media (prefers-color-scheme: dark) {
        div div.osd-cont #osddivcontent {
            color: rgb(218, 218, 218) !important;
            background-color: rgb(37, 37, 37) !important;
        }
        div div.osd-cont #osddivcontent a {
            color: lightblue !important;
        }
      }
        `;
        document.head.appendChild(osdcss);
    
        var osdalert = document.createElement('div');
        osdalert.innerHTML = `
      <div class="osd-cont" id="osddiv">
        <div id="osddivheader">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" id="osdsvg"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M336 0C362.5 0 384 21.49 384 48V367.8C345.8 389.2 320 430 320 476.9C320 489.8 323.6 501.8 329.9 512H240V432C240 405.5 218.5 384 192 384C165.5 384 144 405.5 144 432V512H48C21.49 512 0 490.5 0 464V48C0 21.49 21.49 0 48 0H336zM64 272C64 280.8 71.16 288 80 288H112C120.8 288 128 280.8 128 272V240C128 231.2 120.8 224 112 224H80C71.16 224 64 231.2 64 240V272zM176 224C167.2 224 160 231.2 160 240V272C160 280.8 167.2 288 176 288H208C216.8 288 224 280.8 224 272V240C224 231.2 216.8 224 208 224H176zM256 272C256 280.8 263.2 288 272 288H304C312.8 288 320 280.8 320 272V240C320 231.2 312.8 224 304 224H272C263.2 224 256 231.2 256 240V272zM80 96C71.16 96 64 103.2 64 112V144C64 152.8 71.16 160 80 160H112C120.8 160 128 152.8 128 144V112C128 103.2 120.8 96 112 96H80zM160 144C160 152.8 167.2 160 176 160H208C216.8 160 224 152.8 224 144V112C224 103.2 216.8 96 208 96H176C167.2 96 160 103.2 160 112V144zM272 96C263.2 96 256 103.2 256 112V144C256 152.8 263.2 160 272 160H304C312.8 160 320 152.8 320 144V112C320 103.2 312.8 96 304 96H272zM576 272C576 316.2 540.2 352 496 352C451.8 352 416 316.2 416 272C416 227.8 451.8 192 496 192C540.2 192 576 227.8 576 272zM352 477.1C352 425.7 393.7 384 445.1 384H546.9C598.3 384 640 425.7 640 477.1C640 496.4 624.4 512 605.1 512H386.9C367.6 512 352 496.4 352 477.1V477.1z"/></svg>
        </div>
        <div id="osddivcontent" style="display: none; max-width: 275px;">
          <strong style="line-height: 1;">
            This browser is being monitored by St.&nbsp;Laurence&nbsp;Catholic&nbsp;School.
          </strong>
          <p style="height: 5px;"></p>
          <p>
            You are currently signed into your Google Workspace for Education account that is associated with St. Laurence Catholic School. Therefore, your browsing activity is being monitored. If you believe this is a mistake, follow <a href="https://support.google.com/chrome/answer/9159867" target="_blank">these instructions</a> to sign out.
          </p>
        </div>
      </div>
      `;
        document.body.appendChild(osdalert);
    
        if (location.href.startsWith('://blocked.goguardian.com/', 5)) {
            document.getElementById('osddiv').style.top = '80px';
        }
    
        dragElement(document.getElementById("osddiv"));
    
        function dragElement(elmnt) {
            var pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;
            if (document.getElementById(elmnt.id + "header")) {
                document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
            } else {
                elmnt.onmousedown = dragMouseDown;
            }
    
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }
    
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
    
            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    
        document.getElementById('osddivheader').addEventListener('click', function () {
            document.getElementById('osddivcontent').style.display != "none" ? document.getElementById('osddivcontent').style.display = "none" : document.getElementById('osddivcontent').style.display = "block";
        });
    }
});