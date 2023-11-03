export type AbilityType = {
  ability: {
    name: string;
    url: string;
  };
};

export type TypeType = {
  type: {
    name: string;
    url: string;
  };
};

export type StatsType = {
  base_stat: number;
};

export type PokemonType = {
  id: number;
  height: number;
  weight: number;
  stats: StatsType[];
  abilities: AbilityType[];
  types: TypeType[];
};
