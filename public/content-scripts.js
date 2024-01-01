chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getGrade") {
    const gradeElement = document.querySelector(
      ".student_assignment.final_grade span.grade",
    );
    if (gradeElement) {
      sendResponse({ grade: gradeElement.textContent });
    } else {
      sendResponse({ grade: null });
    }
  }
});
