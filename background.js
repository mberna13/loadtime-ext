// background.js

const navigationData = {};

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    // Only track top-level frame navigations
    if (details.frameId === 0) {
        navigationData[details.tabId] = {
            startTime: Date.now(),
            url: details.url
        };
    }
});

chrome.webNavigation.onCompleted.addListener(async (details) => {
    if (details.frameId === 0 && navigationData[details.tabId]) {
        const endTime = Date.now();
        const { startTime, url } = navigationData[details.tabId];
        const loadTime = endTime - startTime;

        console.log(`Tab ${details.tabId} load time: ${loadTime} ms, URL: ${url}`);

        await chrome.storage.local.set({
            lastLoadTime: loadTime,
            lastLoadURL: url
        });

        delete navigationData[details.tabId];
    }
});
