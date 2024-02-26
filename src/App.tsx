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
  Snackbar,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { Component } from "react";
import "./App.css";
import AddTicketModalComponent from "./components/AddTicketModal.tsx";
import CustomTabPanel from "./components/CustomTabPanel.tsx";
import FilterModalComponent from "./components/FilterModal.tsx";
import RouteModalComponent from "./components/RouteModal.tsx";
import { Ticket } from "./models/ticket.model";

class App extends Component<any, any> {
  constructor(props) {
    super(props);
    const tickets: Ticket[] = [
      {
        ticketNumber: new Date().valueOf(),
        from: new Date(2024, 2, 24).toLocaleDateString(),
        start: new Date(2024, 2, 24, 13, 35, 0).toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        }),
        end: new Date(2024, 2, 24, 17, 14, 0).toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        }),
        trainClass: "Klasa 1",
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
    ];
    this.state = {
      tabNumber: 0,
      searchPhrase: "",
      tickets: tickets,
      filteredTickets: tickets,
      isFilterModalOpen: false,
      classFilters: [true, true],
      isRouteModalOpen: false,
      isAddTicketModalOpen: false,
      isCreateShoppingProfileSnackbarOpen: false,
    };
  }

  handleChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState((prevState) => ({ ...prevState, tabNumber: newValue }));
  };

  handleSearchPhraseChange = (event) => {
    const searchPhrase = (event.target.value as string).toLowerCase();
    this.setState((prevState) => ({
      ...prevState,
      searchPhrase: event.target.value,
      filteredTickets: this.getFilteredTickets(
        this.state.tickets,
        searchPhrase,
        this.state.classFilters
      ),
    }));
  };

  handleFilterModalClose = (classFilters: boolean[], isConfirmed = false) => {
    if (isConfirmed) {
      this.setState({
        ...this.state,
        classFilters: classFilters,
        filteredTickets: this.getFilteredTickets(
          this.state.tickets,
          this.state.searchPhrase,
          classFilters
        ),
        isFilterModalOpen: false,
      });
    } else {
      this.setState({ ...this.state, isFilterModalOpen: false });
    }
  };

  getFilteredTickets = (
    tickets: Ticket[],
    searchPhrase: string,
    classFilters: boolean[]
  ) => {
    const filteredTickets = tickets.filter(
      (ticket) =>
        this.isSearchPhraseIncluded(ticket, searchPhrase) &&
        this.isTrainClassIncluded(ticket, classFilters)
    );
    return filteredTickets;
  };

  isSearchPhraseIncluded = (ticket, searchPhrase: string) => {
    return (
      ticket.stations[0].toLowerCase().includes(searchPhrase) ||
      ticket.stations[ticket.stations.length - 1]
        .toLowerCase()
        .includes(searchPhrase)
    );
  };

  isTrainClassIncluded = (ticket: Ticket, classFilters: boolean[]) => {
    return (
      (ticket.trainClass === "Klasa 1" && classFilters[0]) ||
      (ticket.trainClass === "Klasa 2" && classFilters[1])
    );
  };

  handleRouteModalClose = () => {
    this.setState({ ...this.state, isRouteModalOpen: false });
  };

  handleAddTicketModalClose = (classType: string, isConfirmed = false) => {
    if (isConfirmed) {
      const ticket: Ticket = {
        ticketNumber: new Date().valueOf(),
        from: new Date().toLocaleDateString(),
        start: new Date(new Date().setHours(13, 35, 0)).toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        }),
        end: new Date(new Date().setHours(17, 14, 0)).toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        }),
        trainClass: classType,
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
        price: `${(classType === "Klasa 1" ? 100 : 0) + 69},00 zł`,
      };
      const tickets: Ticket[] = this.state.tickets;
      tickets.push(ticket);
      this.setState({
        ...this.state,
        tickets: tickets,
        filteredTickets: this.getFilteredTickets(
          tickets,
          this.state.searchPhrase,
          this.state.classFilters
        ),
        isAddTicketModalOpen: false,
      });
    } else {
      this.setState({
        ...this.state,
        isAddTicketModalOpen: false,
      });
    }
  };

  createPdf = (ticketNumber: number) => {
    const input = document.getElementById(
      `ticket-${ticketNumber}`
    ) as HTMLElement;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(
        imgData,
        "JPEG",
        60,
        -88,
        0,
        0,
        `ticket-${ticketNumber}.pdf`,
        undefined,
        -90
      );
      pdf.save(`ticket-${ticketNumber}.pdf`);
    });
  };

  removeTicket = (ticketIdx: number) => {
    let tickets = this.state.tickets;
    tickets.splice(ticketIdx, 1);
    this.setState({
      ...this.state,
      tickets: tickets,
      filteredTickets: this.getFilteredTickets(
        tickets,
        this.state.searchPhrase,
        this.state.classFilters
      ),
    });
  };
  render() {
    return (
      <Box className="container">
        <Box className="title">Moje bilety</Box>
        <Tabs value={this.state.tabNumber} onChange={this.handleChange}>
          <Tab label="Bilety" />
          <Tab label="Historia podróży" />
          <Tab label="Zwrócone" />
        </Tabs>
        <CustomTabPanel value={this.state.tabNumber} index={0}>
          <Box sx={{ display: "flex", minWidth: "550px" }}>
            <TextField
              autoFocus
              value={this.state.searchPhrase}
              onChange={this.handleSearchPhraseChange}
              id="input-with-icon-textfield"
              label="Szukaj biletu"
              sx={{ flexGrow: 3 }}
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
              onClick={() =>
                this.setState({ ...this.state, isFilterModalOpen: true })
              }
              variant="outlined"
              sx={{ mt: "12px", ml: "6px", flexGrow: 1 }}
              endIcon={<FilterList />}
            >
              Filtry
            </Button>
            <FilterModalComponent
              isOpen={this.state.isFilterModalOpen}
              classFilters={this.state.classFilters}
              handleModalClose={this.handleFilterModalClose}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "0.5rem 0",
              minWidth: "540px",
            }}
          >
            <Button
              size="small"
              startIcon={<Add sx={{ color: "orange" }} />}
              onClick={() =>
                this.setState({ ...this.state, isAddTicketModalOpen: true })
              }
            >
              Dodaj bilet okresowy
            </Button>
            <AddTicketModalComponent
              isOpen={this.state.isAddTicketModalOpen}
              handleModalClose={this.handleAddTicketModalClose}
            />
          </Box>

          <Box sx={{ height: "72vh", overflowY: "auto" }}>
            {this.state.filteredTickets.map((ticket, idx) => {
              return (
                <div id={`ticket-${ticket.ticketNumber}`}>
                  <Box
                    id=""
                    sx={{
                      minWidth: "500px",
                      border: "1px solid lightgrey",
                      padding: "1rem",
                      margin: "1rem",
                    }}
                  >
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
                        <Button
                          size="small"
                          onClick={() =>
                            this.setState({
                              ...this.state,
                              isRouteModalOpen: true,
                            })
                          }
                        >
                          Trasa twojego pociągu
                        </Button>
                        <RouteModalComponent
                          isOpen={this.state.isRouteModalOpen}
                          stations={ticket.stations}
                          handleModalClose={this.handleRouteModalClose}
                        />
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
                            {ticket.from}
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
                            onClick={() => this.createPdf(ticket.ticketNumber)}
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
                            onClick={() =>
                              this.setState({
                                ...this.state,
                                isCreateShoppingProfileSnackbarOpen: true,
                              })
                            }
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
                          <Snackbar
                            open={
                              this.state.isCreateShoppingProfileSnackbarOpen
                            }
                            autoHideDuration={3000}
                            onClose={() =>
                              this.setState({
                                ...this.state,
                                isCreateShoppingProfileSnackbarOpen: false,
                              })
                            }
                            message="Stworzono profil zakupowy"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                          />
                        </Box>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMore />}
                            sx={{ textTransform: "uppercase" }}
                          >
                            Inne funkcje dla tego biletu
                          </AccordionSummary>
                          <AccordionDetails>
                            <Button
                              size="small"
                              onClick={() => this.removeTicket(idx)}
                            >
                              Zwróć bilet
                            </Button>
                          </AccordionDetails>
                        </Accordion>
                      </Box>
                    </Box>
                  </Box>
                </div>
              );
            })}
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={this.state.tabNumber} index={1}>
          TODO
        </CustomTabPanel>
        <CustomTabPanel value={this.state.tabNumber} index={2}>
          TODO
        </CustomTabPanel>
      </Box>
    );
  }
}

export default App;
