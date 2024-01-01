chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "checkUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let activeTab = tabs[0];
      if (activeTab.url.includes("sjusd.instructure.com")) {
        sendResponse({ isOnSjusdPage: true });
      } else {
        sendResponse({ isOnSjusdPage: false });
      }
    });
    return true; // Indicates response will be sent asynchronously
  }
});
