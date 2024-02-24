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
  enum TrainClass {
    First = "Klasa 1",
    Second = "Klasa 2",
  }
  // const tickets: Ticket[] = [
  //   {
  //     id: 1,
  //     ticketNumber: new Date().valueOf(),
  //     day: new Date(2024, 2, 24).toLocaleDateString(),
  //     start: new Date(2024, 2, 24, 13, 35, 0).toLocaleTimeString([], {
  //       hour: "numeric",
  //       minute: "numeric",
  //     }),
  //     end: new Date(2024, 2, 24, 17, 14, 0).toLocaleTimeString([], {
  //       hour: "numeric",
  //       minute: "numeric",
  //     }),
  //     trainClass: TrainClass.First,
  //     interCityNumber: 1234,
  //     stations: [
  //       "Warszawa Centralna",
  //       "Warszawa Zachodnia",
  //       "Grodzisk Mazowiecki PKP",
  //       "Żyrardów",
  //       "Skierniewice",
  //       "Koluszki",
  //       "Tomaszów Mazowiecki",
  //       "Idzikowice",
  //       "Opoczno Południe",
  //       "Włoszczowa Północ",
  //       "Miechów",
  //       "Kraków Główny",
  //     ],
  //     price: "169,00 zł",
  //   },
  // ];
  // const [tabNumber, setTabNumber] = React.useState(0);
  // const [filteredTickets, setFilteredTickets] = React.useState(tickets);
  const [state, setState] = React.useState({
    tabNumber: 0,
    searchPhrase: "",
    tickets: [
      {
        id: 1,
        ticketNumber: new Date().valueOf(),
        day: new Date(2024, 2, 24).toLocaleDateString(),
        start: new Date(2024, 2, 24, 13, 35, 0).toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        }),
        end: new Date(2024, 2, 24, 17, 14, 0).toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        }),
        trainClass: TrainClass.First,
        interCityNumber: 1234,
        stations: [
          "Warszawa Centralna",
          "Warszawa Zachodnia",
          "Grodzisk Mazowiecki PKP",
          "Żyrardów",
          "Skierniewice",
          "Koluszki",
          "Tomaszów Mazowiecki",
          "Idzikowice",
          "Opoczno Południe",
          "Włoszczowa Północ",
          "Miechów",
          "Kraków Główny",
        ],
        price: "169,00 zł",
      },
    ],
    filteredTickets: [
      {
        id: 1,
        ticketNumber: new Date().valueOf(),
        day: new Date(2024, 2, 24).toLocaleDateString(),
        start: new Date(2024, 2, 24, 13, 35, 0).toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        }),
        end: new Date(2024, 2, 24, 17, 14, 0).toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        }),
        trainClass: TrainClass.First,
        interCityNumber: 1234,
        stations: [
          "Warszawa Centralna",
          "Warszawa Zachodnia",
          "Grodzisk Mazowiecki PKP",
          "Żyrardów",
          "Skierniewice",
          "Koluszki",
          "Tomaszów Mazowiecki",
          "Idzikowice",
          "Opoczno Południe",
          "Włoszczowa Północ",
          "Miechów",
          "Kraków Główny",
        ],
        price: "169,00 zł",
      },
    ],
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setState((prevState) => ({ ...prevState, tabNumber: newValue }));
  };

  const handleSearchPhraseChange = (event) => {
    const searchPhrase = (event.target.value as string).toLowerCase();
    const filteredTickets = state.tickets.filter(
      (ticket) =>
        ticket.stations[0].toLowerCase().includes(searchPhrase) ||
        ticket.stations[ticket.stations.length - 1]
          .toLowerCase()
          .includes(searchPhrase)
    );
    setState((prevState) => ({
      ...prevState,
      searchPhrase: event.target.value,
      filteredTickets: filteredTickets,
    }));
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  interface Ticket {
    id: number;
    ticketNumber: number;
    day: string;
    start: string;
    end: string;
    trainClass: TrainClass;
    interCityNumber: number;
    stations: string[];
    price: string;
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
      <Tabs value={state.tabNumber} onChange={handleChange}>
        <Tab label="Bilety" />
        <Tab label="Historia podróży" />
        <Tab label="Zwrócone" />
      </Tabs>
      <CustomTabPanel value={state.tabNumber} index={0}>
        <Box>
          <TextField
            autoFocus
            value={state.searchPhrase}
            onChange={handleSearchPhraseChange}
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

        {state.filteredTickets.map((ticket) => {
          return (
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
                    {ticket.ticketNumber}
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
                    <Box sx={{ color: "blue" }}>{ticket.trainClass}</Box>
                    <Box sx={{ fontWeight: "bold", color: "darkblue" }}>
                      {ticket.day}
                    </Box>
                    <Box sx={{ fontWeight: "bold", color: "darkblue" }}>
                      {ticket.start}{" "}
                      <ArrowForwardIos
                        sx={{
                          fontSize: "0.75rem",
                          color: "darkorange",
                        }}
                      />{" "}
                      {ticket.end}
                    </Box>
                    <Box sx={{ fontWeight: "bold", color: "darkblue" }}>
                      {ticket.price}
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
                      {ticket.stations[0]}{" "}
                      <ArrowForwardIos
                        sx={{
                          fontSize: "0.75rem",
                          color: "darkorange",
                        }}
                      />{" "}
                      {ticket.stations[ticket.stations.length - 1]}
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
                      &nbsp;{ticket.interCityNumber}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
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
          );
        })}
      </CustomTabPanel>
      <CustomTabPanel value={state.tabNumber} index={1}>
        TODO
      </CustomTabPanel>
      <CustomTabPanel value={state.tabNumber} index={2}>
        TODO
      </CustomTabPanel>
    </Box>
  );
}

export default App;
