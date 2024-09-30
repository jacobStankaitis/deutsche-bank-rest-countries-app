import React, { useMemo, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { Box, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import CountryDetailsModal from "./CountryDetailsModal";
import { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Country } from "../types/Country";

interface CountryGridProps {
  countries: Country[];
  favorites: string[];
  onAddFavorite: (countryCode: string) => void;
  onRemoveFavorite: (countryCode: string) => void;
}

function CountryGrid({
  countries,
  favorites,
  onAddFavorite,
  onRemoveFavorite,
}: CountryGridProps) {
  const gridRef = useRef<AgGridReact<Country>>(null);
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [favoriteJustSet, setFavoriteJustSet] = React.useState<boolean>(false);
  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "Flag",
        field: "flags",
        cellRenderer: FlagRenderer,
        colId: "flag",
        width: 100,
        sortable: false,
        filter: false,
      },
      { headerName: "Name", field: "name.common", colId: "name", flex: 1 },
      {
        headerName: "Population",
        field: "population",
        colId: "population",
        width: 150,
      },
      {
        headerName: "Languages",
        field: "languages",
        colId: "languages",
        valueGetter: (params) =>
          Object.values(params.data.languages || {}).join(", "),
        flex: 1,
      },
      {
        headerName: "Currencies",
        field: "currencies",
        colId: "currencies",
        valueGetter: (params) =>
          Object.values(params.data.currencies || {})
            .map((currency: any) => currency.name)
            .join(", "),
        flex: 1,
      },
      {
        headerName: "Favorite",
        field: "favorite",
        colId: "favorite",
        cellRenderer: (params: any) =>
          FavoriteRenderer(params, favorites, onAddFavorite, onRemoveFavorite),
        width: 100,
        sortable: false,
        filter: false,
      },
    ],
    [favorites, onAddFavorite, onRemoveFavorite],
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
    }),
    [],
  );

  function FlagRenderer(params: any) {
    return (
      <img
        src={params.value.png}
        alt={`Flag of ${params.data.name.common}`}
        style={{ width: "40px" }}
      />
    );
  }

  function FavoriteRenderer(
    params: any,
    favorites: string[],
    onAddFavorite: (countryCode: string) => void,
    onRemoveFavorite: (countryCode: string) => void,
  ) {
    const isFavorite = favorites.includes(params.data.cca3);

    const handleFavoriteClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      setFavoriteJustSet(true);
      if (isFavorite) {
        onRemoveFavorite(params.data.cca3);
      } else {
        onAddFavorite(params.data.cca3);
      }
    };

    return (
      <IconButton onClick={handleFavoriteClick} size="small">
        {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>
    );
  }

  const onRowClicked = useCallback(
    (event: any) => {
      if (favoriteJustSet) {
        setFavoriteJustSet(false);
        return;
      }
      setSelectedCountry(event.data);
      setIsModalOpen(true);
    },
    [favoriteJustSet],
  );

  return (
    <Box>
      <div
        className="ag-theme-alpine"
        style={{ height: 600, width: "100%", marginTop: "20px" }}
      >
        <AgGridReact<Country>
          ref={gridRef}
          rowData={countries}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          onRowClicked={onRowClicked}
        />
      </div>
      {selectedCountry && (
        <CountryDetailsModal
          country={selectedCountry}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Box>
  );
}

export default CountryGrid;
