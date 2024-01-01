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
  } else if (request.message === "reloadGrade") {
    // reload
    fetchAndDisplayGrade();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const reloadButton = document.createElement("button");
  reloadButton.textContent = "Reload Grade";
  reloadButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ message: "reloadGrade" });
  });

  document.body.appendChild(reloadButton);
});
