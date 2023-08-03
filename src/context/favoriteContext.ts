import React, { createContext } from "react";



interface IFavorites {
  favorites: ICharacter[];
  addFavorite: (character: ICharacter) => void;
  removeFavorite: (character: ICharacter) => void;
}

const FavoriteContext = createContext<IFavorites>({
  favorites: [],
  addFavorite: (character: ICharacter) => {},
  removeFavorite: (character: ICharacter) => {},
});

export { FavoriteContext };
