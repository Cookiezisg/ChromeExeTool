// 需要固定的URL列表
const urlsToPin = [
    'https://mail.google.com/mail/u/0/#inbox',
    'https://calendar.google.com/calendar/u/0/r',
    'https://drive.google.com/drive/u/0/my-drive',
    'https://datasuite.shopee.io/studio',
    'https://datasuite.shopee.io/datamap/home'
];

// 清除所有标签页和固定标签页，然后执行一次性固定
function clearAllTabs() {
    chrome.windows.getAll({ populate: true }, (windows) => {
        windows.forEach(window => {
            const tabs = window.tabs;
            const tabIds = tabs.map(tab => tab.id);
            
            // 批量更新所有固定状态
            const unpinPromises = tabs
                .filter(tab => tab.pinned)
                .map(tab => chrome.tabs.update(tab.id, { pinned: false }));
            
            Promise.all(unpinPromises).then(() => {
                // 关闭所有标签页（除了最后一个）
                if (tabIds.length > 1) {
                    chrome.tabs.remove(tabIds.slice(0, -1));
                }
                // 确保最后一个标签页是新标签页
                chrome.tabs.update(tabIds[tabIds.length - 1], { url: 'chrome://newtab' });
            });
        });
    });
}

// 一次性固定标签页并切换到新标签页
function pinTabsOnce() {
    chrome.tabs.query({}, (tabs) => {
        let newTabId = null;
        const pinPromises = [];
        
        tabs.forEach(tab => {
            // 记录新标签页的ID
            if (tab.url === 'chrome://newtab/') {
                newTabId = tab.id;
                return;
            }
            
            // 检查标签页URL是否在列表中
            const shouldPin = urlsToPin.some(url => {
                const baseUrl = url.split('#')[0].split('?')[0];
                return tab.url.includes(baseUrl);
            });
            
            if (shouldPin && !tab.pinned) {
                pinPromises.push(chrome.tabs.update(tab.id, { pinned: true }));
            }
        });
        
        // 等待所有固定操作完成后再切换到新标签页
        Promise.all(pinPromises).then(() => {
            if (newTabId) {
                chrome.tabs.update(newTabId, { active: true });
            }
        });
    });
}

// 监听键盘快捷键
chrome.commands.onCommand.addListener((command) => {
    if (command === 'clear-tabs') {
        clearAllTabs();
        // 等待标签页加载完成后执行一次性固定
        setTimeout(pinTabsOnce, 2000);
    }
}); 