interface ICharacter {
  key: number;
  type: string;
  id: number;
  name: string;
  status:  string;
  species: string;
  gender: string
  origin: {
    name: string;
    link: string;
  };
  location: {
    name: string;
    link: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface ICharacters {
  info: {
    count: internal;
    pages: int;
    next?: string;
    prev?: string;
  };
  results: ICharacter[];
}
