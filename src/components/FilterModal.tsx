import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Modal,
} from "@mui/material";
import React from "react";
function FilterModalComponent({ isOpen, classFilters, handleModalClose }) {
  const [state, setState] = React.useState({ classFilters: classFilters });
  return (
    <Modal open={isOpen} onClose={() => handleModalClose(state.classFilters)}>
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
          Filtry
        </Box>
        <Box sx={{ mt: 2 }}>
          <FormControl>
            <FormControlLabel
              label="Obie klasy"
              control={
                <Checkbox
                  checked={state.classFilters[0] && state.classFilters[1]}
                  indeterminate={
                    state.classFilters[0] !== state.classFilters[1]
                  }
                  onChange={() =>
                    setState({
                      ...state,
                      classFilters:
                        state.classFilters[0] && state.classFilters[1]
                          ? [false, false]
                          : [true, true],
                    })
                  }
                />
              }
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              <FormControlLabel
                label="Klasa 1"
                control={
                  <Checkbox
                    checked={state.classFilters[0]}
                    onChange={() =>
                      setState({
                        ...state,
                        classFilters: [
                          !state.classFilters[0],
                          state.classFilters[1],
                        ],
                      })
                    }
                  />
                }
              />
              <FormControlLabel
                label="Klasa 2"
                control={
                  <Checkbox
                    checked={state.classFilters[1]}
                    onChange={() =>
                      setState({
                        ...state,
                        classFilters: [
                          state.classFilters[0],
                          !state.classFilters[1],
                        ],
                      })
                    }
                  />
                }
              />
            </Box>
            <Button
              sx={{ mt: 1, mr: 1 }}
              onClick={() => handleModalClose(state.classFilters, true)}
            >
              Zatwierdź
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Modal>
  );
}
export default FilterModalComponent;
