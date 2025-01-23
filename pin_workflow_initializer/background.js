// Default URL list
const defaultUrls = [
    'https://mail.google.com/mail/u/0/#inbox',
    'https://calendar.google.com/calendar/u/0/r',
    'https://drive.google.com/drive/u/0/my-drive'
];

// Get saved URL list
function getUrlsToPin() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['pinnedUrls'], function(result) {
            resolve(result.pinnedUrls || defaultUrls);
        });
    });
}

// Get the currently focused window
function getFocusedWindow() {
    return new Promise((resolve) => {
        chrome.windows.getLastFocused({ populate: true }, (window) => {
            resolve(window);
        });
    });
}

// Close all other windows except the focused one - now synchronous
function closeOtherWindows(focusedWindowId) {
    chrome.windows.getAll({}, (windows) => {
        windows
            .filter(window => window.id !== focusedWindowId)
            .forEach(window => chrome.windows.remove(window.id));
    });
}

// Clear all tabs and pinned tabs
async function clearAllTabs() {
    const [urlsToPin, focusedWindow] = await Promise.all([
        getUrlsToPin(),
        getFocusedWindow()
    ]);
    
    // Immediately close other windows without waiting
    closeOtherWindows(focusedWindow.id);
    
    // Then handle the focused window
    const tabs = focusedWindow.tabs;
    const tabIds = tabs.map(tab => tab.id);
    
    // First unpin all tabs
    tabs.forEach(tab => {
        if (tab.pinned) {
            chrome.tabs.update(tab.id, { pinned: false });
        }
    });
    
    // If there's only one tab
    if (tabIds.length === 1) {
        // Use the existing tab for the first URL
        chrome.tabs.update(tabIds[0], { 
            url: urlsToPin[0],
            pinned: true
        }, () => {
            // Open remaining tabs
            openRemainingTabs(urlsToPin);
        });
    } else {
        // Close all tabs except the last one
        chrome.tabs.remove(tabIds.slice(0, -1), () => {
            // Use the last remaining tab for the first URL
            const lastTabId = tabIds[tabIds.length - 1];
            chrome.tabs.update(lastTabId, { 
                url: urlsToPin[0],
                pinned: true
            }, () => {
                // Open remaining tabs
                openRemainingTabs(urlsToPin);
            });
        });
    }
}

// Open remaining tabs
function openRemainingTabs(urlsToPin) {
    // Open remaining pinned tabs (starting from second)
    for (let i = 1; i < urlsToPin.length; i++) {
        chrome.tabs.create({ 
            url: urlsToPin[i], 
            pinned: true,
            active: false
        });
    }
    
    // Finally open and activate a new tab
    chrome.tabs.create({ 
        url: 'chrome://newtab', 
        active: true,
        pinned: false
    });
}

// Listen for keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
    if (command === 'clear-tabs') {
        clearAllTabs();
    }
});

// Listen for extension icon clicks
chrome.action.onClicked.addListener(() => {
    clearAllTabs();
}); 