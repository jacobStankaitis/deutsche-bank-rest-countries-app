import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

interface FavoritesToggleProps {
  checked: boolean;
  onChange: () => void;
}

function FavoritesToggle({ checked, onChange }: FavoritesToggleProps) {
  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={onChange} />}
      label="Show Favorites Only"
    />
  );
}

export default FavoritesToggle;
