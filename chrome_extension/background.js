// 需要固定的URL列表
const urlsToPin = [
    'https://mail.google.com/mail/u/0/#inbox',
    'https://calendar.google.com/calendar/u/0/r',
    'https://drive.google.com/drive/u/0/my-drive',
    'https://datasuite.shopee.io/studio',
    'https://datasuite.shopee.io/datamap/home'
];

// 清除所有标签页和固定标签页
function clearAllTabs() {
    chrome.windows.getAll({ populate: true }, (windows) => {
        windows.forEach(window => {
            const tabs = window.tabs;
            const tabIds = tabs.map(tab => tab.id);
            
            // 先取消所有固定状态
            tabs.forEach(tab => {
                if (tab.pinned) {
                    chrome.tabs.update(tab.id, { pinned: false });
                }
            });
            
            // 保留最后一个标签页，关闭其他所有标签页
            if (tabIds.length > 1) {
                chrome.tabs.remove(tabIds.slice(0, -1), () => {
                    // 在所有标签页关闭后，使用最后一个标签页打开第一个URL
                    const lastTabId = tabIds[tabIds.length - 1];
                    chrome.tabs.update(lastTabId, { 
                        url: urlsToPin[0],
                        pinned: true
                    }, () => {
                        // 打开剩余的标签页
                        openRemainingTabs();
                    });
                });
            }
        });
    });
}

// 打开剩余的标签页
function openRemainingTabs() {
    // 打开剩余的固定标签页（从第二个开始）
    for (let i = 1; i < urlsToPin.length; i++) {
        chrome.tabs.create({ 
            url: urlsToPin[i], 
            pinned: true,
            active: false
        });
    }
    
    // 最后打开新标签页并激活它
    chrome.tabs.create({ 
        url: 'chrome://newtab', 
        active: true,
        pinned: false
    });
}

// 监听键盘快捷键
chrome.commands.onCommand.addListener((command) => {
    if (command === 'clear-tabs') {
        clearAllTabs();
    }
}); 