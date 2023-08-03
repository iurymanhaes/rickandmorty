import { api } from "@src/lib/api";

function getEpisodeIds(character: ICharacter) {
  const episodeIds: string[] = character?.episode.length
    ? character?.episode.map((url: string) => {
        const parts: string[] = url.split("/");
        return parts[parts.length - 1];
      })
    : [];
  return episodeIds;
}

export const getEpisodesByIds = async (character: ICharacter) => {
try {
    const episodeIds: string[] = getEpisodeIds(character);

    if (episodeIds.length > 0) {
      const episodes = await api.get<IEpisode[]>(`/episode/[${episodeIds}]`);
      return episodes.data;
    } else {
      throw new Error("Nenhum episodio encontrado para esse personagem"); //colocar mensagem para usuario
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
