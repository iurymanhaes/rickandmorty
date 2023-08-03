import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import { Container, Grid, Typography, Box, IconButton } from "@mui/material";
import { ArrowBack, Star, StarBorder } from "@mui/icons-material";

import { robotoFontNormal } from "@src/styles/fonts";
import { DetailsCardEpisode, DetailsCard } from "@src/components/Character";

import { api } from "@src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { FavoriteContext } from "@src/context/favoriteContext";
import { useContext } from "react";
import { getEpisodesByIds } from "@src/utils/getEpisodesByIds";

export const getStaticPaths: GetStaticPaths = async () => {
  const characters = await api.get<ICharacters>("/character");
  const paths = characters.data.results.map((character) => ({
    params: { id: character.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const character = await api.get<ICharacter>(`/character/${params?.id}`);

  return { props: { character: character.data }, revalidate: 60 * 60 };
};

type Props = {
  character: ICharacter;
};

function Character({ character }: Props) {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoriteContext);

  const isFavorite = favorites?.some((fav) => fav.id === character?.id);

  const handleFavorite = () => {
    if (character) {
      if (isFavorite) {
        removeFavorite(character);
      } else {
        addFavorite(character);
      }
    }
  };

  const {
    data: episodeData,
    isLoading,
    isError,
    isFetching,
  } = useQuery<IEpisode[]>({
    queryKey: ["episodes"],
    queryFn: () => getEpisodesByIds(character),
  });

  const gender: { [key: string]: string } = {
    Male: "Macho",
    Female: "Femea",
    Genderless: "Sem genero",
    unknown: "Desconhecido",
  };

  const status: { [key: string]: string } = {
    Alive: "Vivo",
    Dead: "Morto",
    unknown: "Desconhecido",
  };

  const infos = [
    { title: "Genêro", subtitle: gender[character?.gender] },
    { title: "Status", subtitle: status[character?.status] },
    { title: "Especie", subtitle: character?.species },
    { title: "Origem", subtitle: character?.origin.name },
    { title: "Tipo/Subespécie", subtitle: character?.type },
    { title: "Localização", subtitle: character?.location.name },
  ];
  return (
    <Container>
      {!isLoading && (
        <Grid container justifyContent="center" alignContent="center">
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item sm={3} xs={12}>
              <Link href="/" style={{ textDecoration: "none", color: "#000" }}>
                <Box display="flex" alignItems="center" gap="10px">
                  <ArrowBack fontSize="large" />
                  <Typography fontWeight="bold">VOLTAR</Typography>
                </Box>
              </Link>
            </Grid>
            <Grid item sm={4} xs={12} display="flex" flexDirection="column">
              <img
                src={character?.image}
                alt="Imagem do personagem"
                style={{
                  width: "100%",
                  borderRadius: "50%",
                }}
              />
              <Typography
                gutterBottom
                variant="h3"
                className={robotoFontNormal.className}
                sx={{ textAlign: "center", color: "#081F32" }}
              >
                {character?.name}
              </Typography>
            </Grid>
            <Grid item sm={3} xs={12} display="flex" justifyContent="center">
              <IconButton sx={{ width: "40px", height: "40px" }}>
                <Star
                  fontSize="large"
                  onClick={handleFavorite}
                  sx={{
                    color: isFavorite ? "#A4FE91" : "#1ABED6",
                    backgroundColor: isFavorite ? "#1ABED6" : "#A4FE91",
                    boxShadow: "0px 0px 10px 3px #1ABED6",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="space-around"
            alignContent="center"
            mt={4}
          >
            <Grid item xl={6} sx={{ width: "100%", maxWidth: "413px" }}>
              <Typography mb={4}>Informações</Typography>
              {infos.map((info, index) => {
                return (
                  <DetailsCard
                    title={info.title}
                    subtitle={info.subtitle}
                    key={`${info.title}-${index}`}
                  />
                );
              })}
            </Grid>
            <Grid item xl={6} sx={{ width: "100%", maxWidth: "413px" }}>
              <Typography mb={4}>Episódios</Typography>
              {episodeData && episodeData.length > 0 ? (
                episodeData?.map((episode: IEpisode) => (
                  <DetailsCardEpisode key={episode.id} episode={episode} />
                ))
              ) : (
                <h1>Nada</h1>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Character;
