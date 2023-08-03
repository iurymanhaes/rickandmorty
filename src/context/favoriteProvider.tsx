import React, { useState } from "react";
import { FavoriteContext} from "./favoriteContext";

type CharacterProviderProps = {
  children: React.ReactNode;
};



export const FavoriteProvider = ({ children }: CharacterProviderProps) => {
  const [favorites, setFavorites] = useState<ICharacter[]>([]);

  const addFavorite = (character: ICharacter) => {
    setFavorites((prevFavorites) => [...prevFavorites, character]);
  };
  
  const removeFavorite = (character: ICharacter) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== character.id)
    );
  };


  return (
    <FavoriteContext.Provider value={{favorites,addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
