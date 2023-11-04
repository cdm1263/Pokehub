import { PokemonInfoProps } from '@/lib/type';

const PokemonImg = ({ pokemon }: PokemonInfoProps) => {
  const pokemonOfficialImage =
    pokemon?.sprites.other?.['official-artwork'].front_default;

  return (
    <>
      <div>{pokemon?.name}</div>
      <div>
        <img
          loading="lazy"
          src={pokemonOfficialImage || undefined}
          alt="Official Artwork"
        />
      </div>
    </>
  );
};

export default PokemonImg;
