interface Name {
  name: string;
}

export interface Type {
  type: Name;
}

export interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  id: string;
  types: Type[];
}
