import {
  Box,
  Typography,
  IconButton,
  Popper,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import { AccessTime, KeyboardArrowDown } from "@mui/icons-material";
import { useState, useRef } from "react";

interface OpeningHoursDisplayProps {
  openingHours?: string;
  allOpeningHours?: string[];
}

export const OpeningHoursDisplay = ({
  openingHours,
  allOpeningHours,
}: OpeningHoursDisplayProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const arrowRef = useRef<HTMLButtonElement | null>(null);

  const handleArrowClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        height: 48,
        px: 2,
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 4,
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: 6,
        },
        position: "relative",
        minWidth: 320,
      }}
    >
      <AccessTime color="primary" />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          Today's Hours
        </Typography>
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {openingHours}
        </Typography>
      </Box>
      {allOpeningHours && allOpeningHours.length === 7 && (
        <IconButton
          size="small"
          ref={arrowRef}
          onClick={handleArrowClick}
          sx={{ ml: 1, p: 0.5 }}
        >
          <KeyboardArrowDown fontSize="small" />
        </IconButton>
      )}
      {allOpeningHours && allOpeningHours.length === 7 && (
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          style={{ zIndex: 1300 }}
          disablePortal={false}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper sx={{ p: 2, minWidth: 260, boxShadow: 6 }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                Full Opening Hours
              </Typography>
              {allOpeningHours.map((desc, idx) => (
                <Typography key={idx} variant="body2" sx={{ lineHeight: 2 }}>
                  {desc}
                </Typography>
              ))}
            </Paper>
          </ClickAwayListener>
        </Popper>
      )}
    </Box>
  );
};
