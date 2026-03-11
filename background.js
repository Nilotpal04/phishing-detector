chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    if (details.frameId !== 0) return;

    const url = details.url;

    if (!url.startsWith("http")) return;

    const tabId = details.tabId;

    // show loading screen first
    chrome.tabs.update(tabId, {
        url:
            chrome.runtime.getURL("loading.html") +
            "?url=" +
            encodeURIComponent(url),
    });
});
