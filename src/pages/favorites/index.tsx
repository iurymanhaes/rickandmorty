import React, { useContext, useState, useEffect } from "react";

import Link from "next/link";

import { Grid, Pagination, PaginationItem } from "@mui/material";

import CharacterCard from "@src/components/Home/CharacterCard";
import { FavoriteContext } from "@src/context/favoriteContext";

export default function Favorites() {
  const { favorites } = useContext(FavoriteContext);
  const [page, setPage] = useState(1);
  const favoritesPerPage = 20;
  const [favoritesToDisplay, setFavoritesToDisplay] = useState<ICharacter[]>(
    []
  );

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const startIndex = (page - 1) * favoritesPerPage;
    const endIndex = page * favoritesPerPage;
    setFavoritesToDisplay(favorites.slice(startIndex, endIndex));
  }, [favorites, page]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={2}
        columnSpacing={2}
      >
        {favoritesToDisplay.length > 0 ? (
          favoritesToDisplay.map((char: ICharacter) => {
            return (
              <Grid item lg={3} md={6} xs={12} key={char.id}>
                <CharacterCard character={char} />
              </Grid>
            );
          })
        ) : (
          <h5>
            Nenhum favorito encontrado você pode ver os personagens clicando{" "}
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "#000",
              }}
            >
              aqui
            </Link>
            .
          </h5>
        )}
      </Grid>

      {favorites.length > favoritesPerPage && (
        <Pagination
          count={Math.ceil(favorites.length / favoritesPerPage)}
          page={page}
          onChange={handleChangePage}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              style={{
                color: page === item.page ? "#A4FE91" : "black",
                backgroundColor: page === item.page ? "#1ABED6" : "white",
              }}
            />
          )}
        />
      )}
    </>
  );
}
