/* import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

type a = {
  englishName: string;
  koreanName: string;
};

const App = () => {
  const [pokemonNames, setPokemonNames] = useState<a[]>([]);

  useEffect(() => {
    const fetchPokemonNames = async () => {
      const docRef = doc(collection(db, 'pokemonNames'), 'allNames'); // 문서 참조 가져오기
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setPokemonNames(docSnap.data().names); // 상태에 포켓몬 이름 저장
      } else {
        // 문서가 존재하지 않을 때의 처리
        console.log('No such document!');
      }
    };

    fetchPokemonNames();
  }, []);

  return (
    <div>
      <h1>포켓몬 이름 목록</h1>
      <ul>
        {pokemonNames.map((pokemon, index) => (
          <li key={index}>
            {pokemon.englishName} / {pokemon.koreanName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
 */

/* import axios from 'axios';
import { useState, useEffect } from 'react';

interface LanguageName {
  language: {
    name: string;
  };
  name: string;
}

interface Species {
  name: string;
  url: string;
}

interface NamesData {
  [key: string]: string;
}

const fetchPokemonSpecies = async (): Promise<Species[]> => {
  const url = 'https://pokeapi.co/api/v2/ability?limit=363';
  const response = await axios.get(url);
  return response.data.results;
};

const fetchNameByLanguage = async (
  url: string,
  language: string,
): Promise<string | null> => {
  const response = await axios.get(url);
  const names = response.data.names as LanguageName[];
  const nameEntry = names.find((name) => name.language.name === language);
  return nameEntry ? nameEntry.name : null;
};

const fetchName = async (url: string): Promise<string> => {
  let name = await fetchNameByLanguage(url, 'ko');
  if (!name) {
    name = await fetchNameByLanguage(url, 'en');
  }
  return name || '이름 없음';
};

const PokemonNames = () => {
  const [pokemonNames, setPokemonNames] = useState<NamesData>({});

  useEffect(() => {
    const getPokemonNames = async () => {
      const speciesList = await fetchPokemonSpecies();
      const namesData: NamesData = {};

      for (const species of speciesList) {
        const name = await fetchName(species.url);
        namesData[name] = species.name;
      }

      setPokemonNames(namesData);
    };

    getPokemonNames();
  }, []);

  return <div>{JSON.stringify(pokemonNames, null, 2)}</div>;
};

export default PokemonNames; */

/* import { useState, useEffect } from 'react';
import axios from 'axios';

interface PokemonResult {
  name: string;
  url: string;
}

interface FormNameData {
  [key: string]: string;
}

interface LanguageName {
  language: {
    name: string;
  };
}

// 포켓몬 종(species) 목록을 가져오는 함수
const fetchPokemonSpecies = async (): Promise<PokemonResult[]> => {
  const url = 'https://pokeapi.co/api/v2/pokemon?offset=1017&limit=1292';
  const response = await axios.get(url);
  console.log(response.data.results);
  return response.data.results;
};

// 포켓몬의 form name을 가져오는 함수
const fetchPokemonFormNames = async (pokemonData: PokemonResult[]) => {
  const formNamesData: FormNameData = {};

  for (const pokemon of pokemonData) {
    try {
      const response = await axios.get(pokemon.url);
      const forms = response.data.forms;

      if (forms) {
        // forms[0]의 URL을 통해 추가 정보를 가져옵니다.
        const formResponse = await axios.get(forms[0].url);
        const formNames = formResponse.data.form_names;

        console.log(formResponse);
        // 한국어 이름이 있으면 그것을 사용합니다.
        const koreanNameEntry = formNames.find(
          (nameEntry: LanguageName) => nameEntry.language.name === 'ko',
        );
        formNamesData[pokemon.name] = koreanNameEntry
          ? koreanNameEntry.name
          : forms[0].name;
      }
    } catch (error) {
      console.error(`Error fetching form name for ${pokemon.name}:`, error);
    }
  }

  return formNamesData;
};

// React 컴포넌트
const PokemonNames = () => {
  const [pokemonFormNames, setPokemonFormNames] = useState<FormNameData>({});

  useEffect(() => {
    const getPokemonFormNames = async () => {
      const speciesList = await fetchPokemonSpecies();
      const formNamesData = await fetchPokemonFormNames(speciesList);
      setPokemonFormNames(formNamesData);
    };

    getPokemonFormNames();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(pokemonFormNames, null, 2)}</pre>
    </div>
  );
}; */
