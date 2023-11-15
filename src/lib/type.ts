export interface PokemonInfoProps {
  pokemon: PokemonType | null;
  abilities?: string[];
  types?: string[];
  species?: string[];
  flavorText?: string;
  genus?: string;
  onFormChange?: (formName: string) => void;
  formName?: string;
}
export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface StatusProps {
  baseStats: Stat[];
}

export type KeyValueType = {
  [key: string]: string;
};

export type AbilitysType = {
  ability: {
    name: string;
    url: string;
  };
};

export type TypesType = {
  type: {
    name: string;
    url: string;
  };
};

export type StatsType = {
  base_stat: number;
};

export type MovesType = {
  move: {
    name: string;
    url: string;
  };
};

export type Sprites = {
  front_default: string | null;
  back_default: string | null;
  other?: {
    'official-artwork': {
      front_default: string | null;
    };
  };
  animated?: {
    front_default: string | null;
    back_default: string | null;
  };
};

export type PokemonType = {
  id: number;
  height: number;
  weight: number;
  stats: StatsType[];
  abilities: AbilitysType[];
  types: TypesType[];
  name: string;
  moves: MovesType[];
  sprites: Sprites;
  forms: {
    name: string;
  };
};

export interface Pokemon {
  name: string;
  url: string;
}
