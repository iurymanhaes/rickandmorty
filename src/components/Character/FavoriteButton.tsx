import { Star } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FavoriteContext } from "@src/context/favoriteContext";
import React, { useContext } from "react";

type Props = {
  character: ICharacter;
};

export function FavoriteButton({ character }: Props) {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoriteContext);

  const isFavorite = favorites?.some((fav) => fav.id === character?.id);

  const handleFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (character) {
      if (isFavorite) {
        removeFavorite(character);
      } else {
        addFavorite(character);
      }
    }
  };
  
  return (
    <Button
      onClick={handleFavorite}
      style={{
        position: "absolute",
        fontSize: "10px",
        zIndex: 1,
        background: isFavorite ? "#1ABED6" : "#A4FE91",
        color: isFavorite ? "#A4FE91" : "#1ABED6",
        border: "none",
        outline: "none",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        borderRadius: "0px 8px 8px 0",
        margin: "20px 0 0 0",
      }}
    >
      <Star
        fontSize="small"
        sx={{
          color: isFavorite ? "#A4FE91" : "#1ABED6",
        }}
        aria-label={isFavorite ? "Desfavoritar" : "Favoritar"}
      />
      {isFavorite ? "Desfavoritar" : "Favoritar"}
    </Button>
  );
}
