import React, { useState, useRef, useCallback } from "react";

import Head from "next/head";
import Image from "next/image";

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";

import CharacterCard from "@src/components/Home/CharacterCard";
import logo from "../../public/assets/logo.svg";

import { useQuery } from "@tanstack/react-query";
import { Search } from "@mui/icons-material";
import { getAllCharacters } from "@src/utils/getAllCharacters";

type filters = {
  name: string;
  species: string;
  gender: string;
  status: string;
  type: string;
};
function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentFilteredPage, setCurrentFilteredPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();
  const [filtered, setFiltered] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [searchParams, setSearchParams] = useState<filters>({
    name: "",
    species: "",
    gender: "",
    status: "",
    type: "",
  });

  const { data, isLoading, isError, isFetching, refetch } =
    useQuery<ICharacters>({
      queryKey: ["characters", filtered ? currentFilteredPage : currentPage],
      queryFn: () =>
        getAllCharacters(
          filtered ? currentFilteredPage : currentPage,
          searchParams
        ),
      keepPreviousData: true,
      onSuccess: (data) => {
        setTotalPages(data.info.pages);
      },
      refetchOnWindowFocus: false,
    });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (filtered) {
      setCurrentFilteredPage(value);
    } else {
      setCurrentPage(value);
    }
  };

  const handleSearchParamsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParams({
      ...searchParams,
      [event.target.name as string]: event.target.value as string,
    });
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const speciesRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);

  const isFormValid = () => {
    if (
      nameRef.current?.value === "" &&
      speciesRef.current?.value === "" &&
      genderRef.current?.value === "" &&
      statusRef.current?.value === "" &&
      typeRef.current?.value === ""
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!isFormValid()) {
        setOpenSnackbar(true);
        return;
      }
      setFiltered(true);
      setCurrentPage(1);
      setCurrentFilteredPage(1);
      refetch();
    },
    [refetch, nameRef, speciesRef, genderRef, statusRef, typeRef]
  );

  return (
    <>
      <Head>
        <title>Desafio Técnico Frontend Web</title>
        <meta name="description" content="Desafio Técnico Frontend Web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container justifyContent="center" alignContent="center">
        <Grid item xl={12}>
          <Image
            src={logo}
            alt="Logo Rick And Morty"
            style={{
              maxWidth: "600px",
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
      {isLoading ? (
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid
            container
            spacing={2}
            mb={2}
            component="form"
            onSubmit={handleSubmit}
          >
            <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
              <TextField
                fullWidth
                inputRef={nameRef}
                label="Nome"
                name="name"
                value={searchParams.name}
                aria-label="Informe o nome do personagem"
                onChange={handleSearchParamsChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
              <TextField
                inputRef={speciesRef}
                name="species"
                value={searchParams.species}
                fullWidth
                label="Espécie"
                aria-label="Informe espécie do personagem"
                onChange={handleSearchParamsChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
              <TextField
                inputRef={genderRef}
                name="gender"
                label="Genêro"
                value={searchParams.gender}
                aria-label="Informe o status do personagem"
                onChange={handleSearchParamsChange}
                fullWidth
                select
                variant="outlined"
              >
                <MenuItem value="">
                  <em>Selecione um gênero</em>
                </MenuItem>
                <MenuItem value="female">Fêmea</MenuItem>
                <MenuItem value="male">Macho</MenuItem>
                <MenuItem value="genderless">Sem gênero</MenuItem>
                <MenuItem value="unknown">Desconhecido</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
              <TextField
                inputRef={statusRef}
                name="status"
                label="Status"
                value={searchParams.status}
                aria-label="Informe o status do personagem"
                onChange={handleSearchParamsChange}
                fullWidth
                select
                variant="outlined"
              >
                <MenuItem value="">
                  <em>Selecione um status</em>
                </MenuItem>
                <MenuItem value="alive">Vivo</MenuItem>
                <MenuItem value="dead">Morto</MenuItem>
                <MenuItem value="unknown">Desconhecido</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
              <TextField
                fullWidth
                label="Tipo/Subespécie"
                inputRef={typeRef}
                value={searchParams.type}
                name="type"
                aria-label="Informe o Tipo/Subespécie do personagem"
                onChange={handleSearchParamsChange}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              lg={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                fullWidth
                size="large"
                type="submit"
                sx={{
                  backgroundColor: "#A4FE91",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#A4FE9199",
                  },
                }}
                startIcon={
                  <Search
                    aria-label="Pesquisar personagem"
                    cursor="pointer"
                    fontSize="large"
                    sx={{
                      color: "#1ABED6",
                    }}
                  />
                }
              >
                Pesquisar
              </Button>
            </Grid>
          </Grid>

          <Grid container alignItems="center" spacing={2}>
            {data?.results?.map((char: ICharacter) => {
              return (
                <Grid item lg={3} md={6} xs={12} key={char.id}>
                  <CharacterCard character={char} />
                </Grid>
              );
            })}
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center", gap: 17 }}
            >
              <Pagination
                count={totalPages}
                page={filtered ? currentFilteredPage : currentPage}
                onChange={handlePageChange}
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    style={{
                      color:
                        (filtered ? currentFilteredPage : currentPage) ===
                        item.page
                          ? "#A4FE91"
                          : "black",
                      backgroundColor:
                        (filtered ? currentFilteredPage : currentPage) ===
                        item.page
                          ? "#1ABED6"
                          : "white",
                    }}
                  />
                )}
              ></Pagination>
            </Grid>
          </Grid>
        </>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          Por favor, preencha pelo menos um campo.
        </Alert>
      </Snackbar>
    </>
  );
}

export default Home;
