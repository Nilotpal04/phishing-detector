const params = new URLSearchParams(window.location.search);
const url = params.get("url");

async function checkSite() {
    let suspicious = false;

    if (url.includes("@") || url.length > 75) {
        suspicious = true;
    }

    try {
        const response = await fetch("https://openphish.com/feed.txt");
        const text = await response.text();

        if (text.includes(url)) {
            suspicious = true;
        }
    } catch (err) {
        console.log("API error", err);
    }

    if (suspicious) {
        chrome.tabs.update({
            url:
                chrome.runtime.getURL("block.html") +
                "?url=" +
                encodeURIComponent(url),
        });
    } else {
        chrome.tabs.update({
            url: url,
        });
    }
}

checkSite();
