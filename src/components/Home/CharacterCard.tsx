import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

import { robotoFont, robotoFontNormal } from "@src/styles/fonts";
import Link from "next/link";
import { FavoriteButton } from "../Character/FavoriteButton";

type Props = {
  character: ICharacter;
};
const CharacterCard = ({ character }: Props) => {
  return (
    <Link
      href={`/character/${character.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          height: "244px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
       <FavoriteButton character={character} />
        <CardMedia
          image={character.image}
          title="Random image"
          sx={{
            height: "168px",
            margin: "auto",
            width: "100%",
            position: "relative",
          }}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={robotoFont.className}
          >
            {character.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={robotoFontNormal.className}
          >
            {character.species}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CharacterCard;
