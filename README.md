# The SLCS Extension

The SLCS Extension is a custom extension for SLCS. It is designed for use by students. The extension combines the functionality of many of our extensions into one easy-to-use extension.

## Features:
- Provides quick and easy access to useful apps for students.
- Prevents students from navigating to other websites or apps during standardized testing.
- Reminds students who have logged into their browser with their school Google account on a non-school device that they are still being monitored by the school.
- Automatically fills in district code and user type for student gradebook login.
- Provides extra information on the "website blocked" page if a student tries to view a blocked website.
- Allows users to quickly complete simple tasks via context menu items and keyboard shortcuts.
- Gives users the option to disable parts of the extension if they wish.

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

| Title | Shortcut | Mac Shortcut |
| --------------- | --------------- | --------------- |
| View page source | Ctrl+Shift+U | Command+Shift+U |

## Permissions required:
| Name | Description | Use |
| --------------- | --------------- | --------------- |
| tabs | Allows the extension to access information about the user's tabs and windows, such as the titles and URLs of the webpages the user visits. | Allows the extension to show blocked page info in popup window (when applicable). Allows for features like "view page source". Allows the extension to prevent users from accessing other sites during standardized testing. |
| contextMenus | Allows the extension to add options to the context menu. | Allows the extension to add all of the context menu options above. |
| contentSettings | Allows the extension to settings to control the settings for certain types on content on websites, such as cookies or popups. | Allows the extension to block/allow cookies on YouTube (per the user's request), and allows the extension to allow popups on the standardized testing site. |
| commands | Allows the extension to add keyboard shortcuts to the browser. | Allows the extension to add the keyboard shortcuts listed above. |
| declarativeNetRequest | Allows the extension to block certain sites. | Allows the extension to enable ad blocking (per the user's request). |
| storage / unlimitedStorage | Allows the extension to store data in the browser. | Allows the extension to store and retrieve the user's settings. |

## Installation:
- Extension ID: 
- Installation URL: https://theslcsextension.pages.dev/extension.xml

&copy; Copyright 2022 [@hc-schoolextensions](https://github.dev/hc-schoolextensions/ '@hc-schoolextensions')