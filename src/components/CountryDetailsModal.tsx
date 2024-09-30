import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Country } from "../types/Country";

interface CountryDetailsModalProps {
  country: Country;
  open: boolean;
  onClose: () => void;
}

function CountryDetailsModal({
  country,
  open,
  onClose,
}: CountryDetailsModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{country.name.common}</DialogTitle>
      <DialogContent dividers>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          style={{ width: "100%", marginBottom: "20px" }}
        />
        <List>
          <ListItem>
            <ListItemText
              primary="Official Name"
              secondary={country.name.official}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Capital"
              secondary={country.capital?.join(", ") || "N/A"}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Region" secondary={country.region} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Subregion"
              secondary={country.subregion || "N/A"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Population"
              secondary={country.population.toLocaleString()}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Languages"
              secondary={Object.values(country.languages || {}).join(", ")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Currencies"
              secondary={Object.values(country.currencies || {})
                .map((currency) => currency.name)
                .join(", ")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Timezones"
              secondary={country.timezones.join(", ")}
            />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default CountryDetailsModal;
