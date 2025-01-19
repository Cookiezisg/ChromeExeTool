// Default URL list
const defaultUrls = [
    'https://mail.google.com/mail/u/0/#inbox',
    'https://calendar.google.com/calendar/u/0/r',
    'https://drive.google.com/drive/u/0/my-drive',
    'https://confluence.shopee.io/spaces/viewspace.action?key=~weilin.sun@shopee.com',
    'https://datasuite.shopee.io/studio',
    'https://datasuite.shopee.io/datamap/home'
];

// Load saved URL list
function loadUrls() {
    chrome.storage.sync.get(['pinnedUrls'], function(result) {
        const urls = result.pinnedUrls || defaultUrls;
        displayUrls(urls);
    });
}

// Display URL list
function displayUrls(urls) {
    const container = document.getElementById('urlList');
    container.innerHTML = '';
    
    urls.forEach((url, index) => {
        const div = document.createElement('div');
        div.className = 'url-item';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = url;
        
        const moveButtons = document.createElement('div');
        moveButtons.className = 'move-buttons';
        
        if (index > 0) {
            const upButton = document.createElement('button');
            upButton.innerHTML = '&uarr;';  // Up arrow HTML entity
            upButton.onclick = () => moveUrl(index, index - 1);
            moveButtons.appendChild(upButton);
        }
        
        if (index < urls.length - 1) {
            const downButton = document.createElement('button');
            downButton.innerHTML = '&darr;';  // Down arrow HTML entity
            downButton.onclick = () => moveUrl(index, index + 1);
            moveButtons.appendChild(downButton);
        }
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => removeUrl(index);
        
        div.appendChild(input);
        div.appendChild(moveButtons);
        div.appendChild(deleteButton);
        container.appendChild(div);
    });
}

// Move URL position
function moveUrl(fromIndex, toIndex) {
    chrome.storage.sync.get(['pinnedUrls'], function(result) {
        const urls = result.pinnedUrls || defaultUrls;
        const url = urls[fromIndex];
        urls.splice(fromIndex, 1);
        urls.splice(toIndex, 0, url);
        chrome.storage.sync.set({ pinnedUrls: urls }, function() {
            displayUrls(urls);
        });
    });
}

// Remove URL
function removeUrl(index) {
    chrome.storage.sync.get(['pinnedUrls'], function(result) {
        const urls = result.pinnedUrls || defaultUrls;
        urls.splice(index, 1);
        chrome.storage.sync.set({ pinnedUrls: urls }, function() {
            displayUrls(urls);
        });
    });
}

// Add new URL
document.getElementById('addUrl').addEventListener('click', function() {
    chrome.storage.sync.get(['pinnedUrls'], function(result) {
        const urls = result.pinnedUrls || defaultUrls;
        urls.push('');
        chrome.storage.sync.set({ pinnedUrls: urls }, function() {
            displayUrls(urls);
        });
    });
});

// Save settings
document.getElementById('save').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.url-item input');
    const urls = Array.from(inputs).map(input => input.value.trim()).filter(url => url);
    
    chrome.storage.sync.set({ pinnedUrls: urls }, function() {
        alert('Settings saved!');
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', loadUrls); 