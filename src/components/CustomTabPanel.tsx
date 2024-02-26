import { Box } from "@mui/material";
import React from "react";
import { TabPanelProps } from "../models/tab-panel-props.model";

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <Box hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </Box>
  );
}

export default CustomTabPanel;
