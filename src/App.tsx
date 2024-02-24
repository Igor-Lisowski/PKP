import {
  Add,
  ArrowForwardIos,
  ExpandMore,
  FilterList,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React from "react";
import "./App.css";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
      </Box>
    );
  }

  return (
    <Box className="container">
      <Box className="title">Moje bilety</Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Bilety" />
        <Tab label="Historia podróży" />
        <Tab label="Zwrócone" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Box>
          <TextField
            id="input-with-icon-textfield"
            label="Szukaj biletu"
            sx={{ width: "40vw" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Button
            variant="outlined"
            sx={{ mt: "12px", ml: "6px", width: "19.4vw" }}
            endIcon={<FilterList />}
          >
            Filtry
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "0.5rem 0",
          }}
        >
          <Button size="small" startIcon={<Add sx={{ color: "orange" }} />}>
            Dodaj bilet okresowy
          </Button>
        </Box>
        <Box sx={{ border: "1px solid lightgrey", padding: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box
              sx={{
                backgroundColor: "lightgrey",
                width: "fit-content",
                padding: "0.5rem",
                borderRadius: "3px",
              }}
            >
              <Box component="span" sx={{ color: "blue" }}>
                Numer biletu
              </Box>
              &emsp;
              <Box component="span" sx={{ color: "darkblue" }}>
                XX123456789
              </Box>
            </Box>
            <Box>
              <Button size="small">Trasa twojego pociągu</Button>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "1rem",
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridTemplateRows: "repeat(2, 1fr)",
                }}
              >
                <Box sx={{ color: "blue" }}>Data</Box>
                <Box sx={{ color: "blue" }}>Czas</Box>
                <Box sx={{ color: "blue" }}>Klasa</Box>
                <Box sx={{ fontWeight: "bold", color: "darkblue" }}>
                  DD.MM.YYYY
                </Box>
                <Box sx={{ fontWeight: "bold", color: "darkblue" }}>
                  HH:MM{" "}
                  <ArrowForwardIos
                    sx={{
                      fontSize: "0.75rem",
                      color: "darkorange",
                    }}
                  />{" "}
                  HH:MM
                </Box>
                <Box sx={{ fontWeight: "bold", color: "darkblue" }}>
                  123,45 zł
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                <Box sx={{ color: "blue" }}>Trasa</Box>
                <Box>
                  Warszawa Cent.{" "}
                  <ArrowForwardIos
                    sx={{
                      fontSize: "0.75rem",
                      color: "darkorange",
                    }}
                  />{" "}
                  Kraków Gł.
                </Box>
                <Box>
                  <Box
                    component="span"
                    sx={{
                      color: "darkorange",
                      fontStyle: "italic",
                      fontWeight: "bold",
                    }}
                  >
                    IC
                  </Box>
                  &nbsp;2620
                </Box>
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "white",
                    color: "darkorange",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >
                  Pobierz PDF
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "white",
                    color: "darkorange",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >
                  Stwórz profil zakupowy
                </Button>
              </Box>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{ textTransform: "uppercase" }}
                >
                  Inne funkcje dla tego biletu
                </AccordionSummary>
                <AccordionDetails>TODO</AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        TODO
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        TODO
      </CustomTabPanel>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React.js
        </a>
      </header> */}
    </Box>
  );
}

export default App;
