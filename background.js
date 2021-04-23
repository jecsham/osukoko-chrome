chrome.runtime.onMessage.addListener((request, sender) => {
    switch (request) {
        case 'osu_koko_remove_tab': {
            chrome.tabs.remove(sender.tab.id);
            break;
        }
    }
});