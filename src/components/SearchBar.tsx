import React, { useState, ChangeEvent } from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { Country } from "../types/Country";

interface SearchBarProps {
  countries: Country[];
  onSearch: (results: Country[]) => void;
}

function SearchBar({ countries, onSearch }: SearchBarProps) {
  const [searchCategory, setSearchCategory] = useState<string>("name");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchCategory(event.target.value);
    setSearchTerm("");
    onSearch([]);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const results = countries.filter((country) => {
      if (searchCategory === "name") {
        return country.name.common.toLowerCase().includes(term);
      } else if (searchCategory === "language") {
        return Object.values(country.languages || {}).some((lang) =>
          lang.toLowerCase().includes(term),
        );
      } else if (searchCategory === "currency") {
        return Object.values(country.currencies || {}).some((currency) =>
          currency.name.toLowerCase().includes(term),
        );
      }
      return false;
    });

    onSearch(results);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        select
        label="Search By"
        value={searchCategory}
        onChange={handleCategoryChange}
        variant="outlined"
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="language">Language</MenuItem>
        <MenuItem value="currency">Currency</MenuItem>
      </TextField>
      <TextField
        label={`Search ${searchCategory}`}
        value={searchTerm}
        onChange={handleSearch}
        variant="outlined"
        fullWidth
      />
    </Box>
  );
}

export default SearchBar;
