import { api } from "@src/lib/api";

type filters = {
    name: string;
    species: string;
    gender: string;
    status: string;
    type: string;
};

export const getAllCharacters = async (currentPage = 1, searchParams: filters) => {
    try {
      const params = {
        ...searchParams,
        page: currentPage,
      };
      const response = await api.get<ICharacters>(`/character`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar personagens"); //colocar mensagem par o usuario
    }
  };