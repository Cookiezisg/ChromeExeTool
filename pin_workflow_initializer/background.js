// Default URL list and cache
const defaultUrls = [
    'https://mail.google.com/mail/u/0/#inbox',
    'https://calendar.google.com/calendar/u/0/r',
    'https://drive.google.com/drive/u/0/my-drive'
];
let cachedUrls = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// Get saved URL list with cache
async function getUrlsToPin() {
    const now = Date.now();
    if (cachedUrls && (now - lastCacheTime < CACHE_DURATION)) {
        return cachedUrls;
    }

    return new Promise((resolve) => {
        chrome.storage.sync.get(['pinnedUrls'], function(result) {
            cachedUrls = result.pinnedUrls || defaultUrls;
            lastCacheTime = now;
            resolve(cachedUrls);
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

// Collapse all tab groups in parallel
function collapseAllGroups(windowId) {
    chrome.tabGroups.query({ windowId: windowId }, function(groups) {
        Promise.all(groups.map(group => 
            chrome.tabGroups.update(group.id, { collapsed: true })
        ));
    });
}

// Close other windows in parallel
async function closeOtherWindows(focusedWindowId) {
    const windows = await chrome.windows.getAll();
    await Promise.all(
        windows
            .filter(window => window.id !== focusedWindowId)
            .map(window => chrome.windows.remove(window.id))
    );
}

// Clear ungrouped tabs and manage pinned tabs
async function clearAllTabs() {
    // Get URLs and focused window in parallel
    const [urlsToPin, focusedWindow] = await Promise.all([
        getUrlsToPin(),
        chrome.windows.getLastFocused({ populate: true })
    ]);

    // Close other windows in parallel
    await closeOtherWindows(focusedWindow.id);

    // Get all tabs in one query
    const allTabs = await chrome.tabs.query({ windowId: focusedWindow.id });

    // Classify tabs in one pass
    const { pinnedTabs, ungroupedTabs } = allTabs.reduce((acc, tab) => {
        if (tab.pinned) acc.pinnedTabs.push(tab);
        if (tab.groupId === -1) acc.ungroupedTabs.push(tab);
        return acc;
    }, { pinnedTabs: [], ungroupedTabs: [] });

    // Execute all tab operations in parallel
    await Promise.all([
        // Unpin all pinned tabs
        ...pinnedTabs.map(tab => 
            chrome.tabs.update(tab.id, { pinned: false })
        ),
        // Remove all ungrouped tabs
        ungroupedTabs.length > 0 ? 
            chrome.tabs.remove(ungroupedTabs.map(tab => tab.id)) : 
            Promise.resolve(),
        // Create all new tabs (including the final active tab)
        ...[
            ...urlsToPin.map((url, index) => 
                chrome.tabs.create({
                    url: url,
                    pinned: true,
                    active: false
                })
            ),
            chrome.tabs.create({
                url: 'chrome://newtab',
                active: true,
                pinned: false
            })
        ]
    ]);

    // Collapse groups at the end (no need to wait)
    collapseAllGroups(focusedWindow.id);
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

// Listen for storage changes to update cache
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.pinnedUrls) {
        cachedUrls = changes.pinnedUrls.newValue || defaultUrls;
        lastCacheTime = Date.now();
    }
}); 