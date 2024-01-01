import { useEffect, useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

function App() {
  const [isOnCanvasPage, setIsOnCanvasPage] = useState(false);
  const [grade, setGrade] = useState<string | null>(null);

  const [minGrade, setMinGrade] = useState("");
  const [finalWeight, setFinalWeight] = useState("");
  const [result, setResult] = useState("");
  const [displayMinGrade, setDisplayMinGrade] = useState(""); // prevents constant updating of minGrade in the final result text

  const handleCalculate = () => {
    const currentGrade = Number(grade?.substring(0, grade.length - 1)); // remove % sign
    const result = (
      (Number(minGrade) - currentGrade * (1 - Number(finalWeight) / 100)) /
      (Number(finalWeight) / 100)
    ).toFixed(2);
    setResult(result);
    setDisplayMinGrade(minGrade);
  };

  const checkPage = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (
        activeTab &&
        activeTab.id !== undefined &&
        activeTab.url &&
        activeTab.url.includes("instructure.com")
      ) {
        setIsOnCanvasPage(true);
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
        setIsOnCanvasPage(false);
        setGrade(null);
      }
    });
  };

  useEffect(() => {
    checkPage();
  }, []);

  return (
    <>
      {isOnCanvasPage ? (
        <>
          {grade ? (
            <>
              <Typography variant="body1">Your grade: {grade}</Typography>
              <Box sx={{ flexGrow: 0, marginTop: 1 }}>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      Minimum desired grade (%){" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="number"
                      size="small"
                      value={minGrade}
                      onChange={(e) => setMinGrade(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={1} sx={{ marginTop: 1 }}>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      Weight of final (%){" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="number"
                      size="small"
                      value={finalWeight}
                      onChange={(e) => setFinalWeight(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  sx={{ marginTop: 1 }}
                  onClick={handleCalculate}
                >
                  Calculate
                </Button>

                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  You need a {result}% on the final to get a {displayMinGrade}%
                  in the class.
                </Typography>
              </Box>
            </>
          ) : (
            <Typography variant="body1">
              Grade not found. Please navigate to the 'Grades' section of the
              class. Refresh the page if you are on the 'Grades' section but
              still see this message.
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="body2">
          You must go to a Canvas class 'Grades' page to use this extension.
        </Typography>
      )}
    </>
  );
}

export default App;
