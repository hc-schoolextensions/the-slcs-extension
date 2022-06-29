# The SLCS Extension

The SLCS Extension is a custom extension for SLCS. It is designed for use by students. The extension combines the functionality of many of our extensions into one easy-to-use extension.

## Features:
- Provides quick and easy access to useful apps for students.
- Prevents students from navigating to other websites or apps during standardized testing.
- Reminds students who have logged into their browser with their school Google account on a non-school device that they are being monitored by the school.
- Automatically fills in district code and user type for student gradebook login.
- Provides extra information on the "website blocked" page if a student tries to view a blocked website.
- Allows users to quickly complete simple tasks via context menu items and keyboard shortcuts.
- Gives users the option to disable parts of the extension if they wish to do so.

### Context menu options:

| Title | Contexts | Type | documentUrlPatterns | targetUrlPatterns |
| --------------- | --------------- | --------------- | --------------- | --------------- |
| View blocked page info | page, frame | normal | \*://\*.blocked.goguardian.com/\* |
| Copy link to blocked page info | page, frame | normal | \*://\*.blocked.goguardian.com/\* |
| View blocked URL data | link | normal | | \*://\*.blocked.goguardian.com/\* |
| Copy link to blocked info | link | normal | | \*://\*.blocked.goguardian.com/\* |
| Block cookies | page, frame | checkbox | \*://\*.youtube.com/\* |
| Clear cookie settings | page, frame | normal | \*://\*.youtube.com/\* |
| Open frame in new tab | frame | normal |
| Copy frame address | frame | normal |
| View frame source | frame | normal |
| Copy as data URL | image, video, audio | normal |
| View link source | link | normal |
| View page source | page | normal |

### Keyboard shortcuts: 

| Title | Shortcut | Mac Shortcut | Condition |
| --------------- | --------------- | --------------- | --------------- |
| View page source | Ctrl+Shift+U | Command+Shift+U | None |
| Toogle blocking cookies on YouTube | Ctrl+Shift+E | Command+Shift+E | Only on youtube.com or music.youtube.com

## Options: 
| Title | Description | Enabled by default | Condition |
| ----- | ----------- | ------------------ | --------- |
| Disable "Off Student Device" alert on webpages. | Prevents OSD alert from appearing on webpages. | No | Option only shows on non-ChromeOS devices. |
| Enable extra context menu options. | Adds extra context menu options (detailed above). | Yes | None |
| Enable extra keyboard shortcuts. | Adds extra keyboard shortcuts (detailed above). | Yes | None |
| Enable ad and tracker blocking. | Blocks common ad and tracker sites. [[list](https://github.com/hc-schoolextensions/the-slcs-extension/blob/data/adblockfilters.txt)] | No | None |


## Permissions required:
| Name | Description | Use |
| --------------- | --------------- | --------------- |
| tabs | Allows the extension to access information about the user's tabs and windows, such as the titles and URLs of the webpages the user visits. | Allows the extension to show blocked page info in popup window (when applicable). Allows for features like "view page source". Allows the extension to prevent users from accessing other sites during standardized testing. |
| contextMenus | Allows the extension to add options to the context menu. | Allows the extension to add all of the context menu options above. |
| contentSettings | Allows the extension to settings to control the settings for certain types on content on websites, such as cookies or popups. | Allows the extension to block/allow cookies on YouTube (per the user's request), and allows the extension to allow popups on the standardized testing site. |
| commands | Allows the extension to add keyboard shortcuts to the browser. | Allows the extension to add the keyboard shortcuts listed above. |
| declarativeNetRequest | Allows the extension to block certain sites. | Allows the extension to enable ad blocking (per the user's request). |
| storage / unlimitedStorage | Allows the extension to store data in the browser. | Allows the extension to store and retrieve the user's settings. |
| scripting | Allows the extension to execute scripts on open webpages from the service worker and extension pages. | Allows the extension to copy information to the clipboard. |

## Installation:
- Extension ID: 
- Installation URL: https://theslcsextension.pages.dev/extension.xml

## Notice:

Copyright © [@hc-schoolextensions](https://github.dev/hc-schoolextensions/ '@hc-schoolextensions'), 2022. No part of the materials available through this repository may be copied, photocopied, reproduced, translated, or reduced to any electronic medium or machine-readable form, in whole or in part, without prior written consent of the owner, except through actions stated in the [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#5-license-grant-to-other-users). Any other reproduction in any form without the permission of the owner is prohibited. All materials contained in this repository are protected by United States copyright law and may not be reproduced, distributed, transmitted, displayed, published, or broadcast without the prior written permission of the owner, except as stated in the [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#5-license-grant-to-other-users). As stated in the [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#5-license-grant-to-other-users), the materials in this repository may be viewed and forked.