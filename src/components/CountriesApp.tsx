import React, { useEffect, useState } from "react";
import { Container, Snackbar, Typography } from "@mui/material";
import { Country } from "../types/Country";
import { fetchAllCountries } from "../services/countryApiService";
import CountryGrid from "./CountryGrid";

function CountriesApp() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const cachedData = localStorage.getItem("countriesData");
        if (cachedData) {
          setCountries(JSON.parse(cachedData));
        } else {
          const data = await fetchAllCountries();
          setCountries(data);
          localStorage.setItem("countriesData", JSON.stringify(data));
        }
      } catch (err) {
        setError("Failed to fetch countries data.");
        setOpenSnackbar(true);
        console.error(err);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    ) as string[];
    setFavorites(savedFavorites);
  }, []);

  const handleAddFavorite = (countryCode: string) => {
    const updatedFavorites = [...favorites, countryCode];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (countryCode: string) => {
    const updatedFavorites = favorites.filter((code) => code !== countryCode);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const displayCountries = countries;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        REST Countries
      </Typography>
      <CountryGrid
        countries={displayCountries}
        favorites={favorites}
        onAddFavorite={handleAddFavorite}
        onRemoveFavorite={handleRemoveFavorite}
      />
      <Snackbar
        open={openSnackbar}
        message={error}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      />
    </Container>
  );
}

export default CountriesApp;
