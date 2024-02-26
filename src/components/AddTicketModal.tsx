import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";

import React from "react";
function AddTicketModalComponent({ isOpen, handleModalClose }) {
  const [state, setState] = React.useState({
    classType: "Klasa 1",
  });

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ classType: (event.target as HTMLInputElement).value });
  };

  return (
    <Modal open={isOpen} onClose={() => handleModalClose(state.classType)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "20vw",
          bgcolor: "background.paper",
          border: "2px solid lightgrey",
          borderRadius: "5px",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Box component="h3" sx={{ color: "darkblue" }}>
          Dodaj bilet okresowy
        </Box>
        <Box sx={{ mt: 2 }}>
          <form>
            <FormControl sx={{ m: 3 }} variant="standard">
              <RadioGroup value={state.classType} onChange={handleRadioChange}>
                <FormControlLabel
                  value="Klasa 1"
                  control={<Radio />}
                  label="Klasa 1"
                />
                <FormControlLabel
                  value="Klasa 2"
                  control={<Radio />}
                  label="Klasa 2"
                />
              </RadioGroup>
              <Button
                sx={{ mt: 1, mr: 1 }}
                onClick={() => handleModalClose(state.classType)}
              >
                Zapisz
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
export default AddTicketModalComponent;
