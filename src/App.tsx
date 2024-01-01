import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isOnSjusdPage, setIsOnSjusdPage] = useState(false);
  const [grade, setGrade] = useState<string | null>(null);

  const checkPage = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (
        activeTab &&
        activeTab.id !== undefined &&
        activeTab.url &&
        activeTab.url.includes("sjusd.instructure.com")
      ) {
        setIsOnSjusdPage(true);
        // Ensure activeTab.id is defined before using it
        chrome.tabs.sendMessage(
          activeTab.id,
          { message: "getGrade" },
          (response) => {
            if (response) {
              setGrade(response.grade);
            }
          },
        );
      } else {
        setIsOnSjusdPage(false);
        setGrade(null);
      }
    });
  };

  const handleReloadGrade = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.id !== undefined) {
        chrome.tabs.sendMessage(activeTab.id, { message: "reloadGrade" });
      }
    });
  };

  useEffect(() => {
    checkPage();
  }, []);

  return (
    <>
      {isOnSjusdPage ? (
        <>
          <p>You are on 'sjusd.instructure.com'</p>
          {grade ? <p>Your grade: {grade}</p> : <p>Grade not found</p>}
          <button onClick={handleReloadGrade}>Reload Grade</button>
        </>
      ) : (
        <p>You are not on 'sjusd.instructure.com'</p>
      )}
    </>
  );
}

export default App;
