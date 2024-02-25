import { Box, Modal } from "@mui/material";
import React from "react";
function RouteModalComponent({ isOpen, stations, handleModalClose }) {
  return (
    <Modal open={isOpen} onClose={handleModalClose}>
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
          Trasa twojego pociągu
        </Box>
        <Box sx={{ display: "flexbox", flexDirection: "column" }}>
          {stations.map((station: string) => (
            <Box>{station}</Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
export default RouteModalComponent;
