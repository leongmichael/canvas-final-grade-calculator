chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "getGrade") {
        const gradeElement = document.querySelector('span#grade'); // TODO: FIX 
        if (gradeElement) {
            sendResponse({ grade: gradeElement.textContent });
        } else {
            sendResponse({ grade: null });
        }
    }
});
