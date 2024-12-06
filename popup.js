// popup.js

document.addEventListener('DOMContentLoaded', async () => {
    const loadTimeDisplay = document.getElementById('loadTime');

    // Get last load time and URL from storage
    const { lastLoadTime, lastLoadURL } = await chrome.storage.local.get(['lastLoadTime', 'lastLoadURL']);

    if (typeof lastLoadTime === 'number' && typeof lastLoadURL === 'string') {
        const seconds = (lastLoadTime / 1000).toFixed(2);
        loadTimeDisplay.textContent = `URL: ${lastLoadURL}\n` +
            `Load Time: ${lastLoadTime} ms (${seconds} s)`;
    } else {
        loadTimeDisplay.textContent = 'No data yet';
    }
});
