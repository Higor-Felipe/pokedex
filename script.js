const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonID');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonTypes = document.querySelector('.pokemon_types');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const typeTranslations = {
  fire: 'Fogo',
  grass: 'Grama',
  water: 'Água',
  electric: 'Elétrico',
  poison: 'Venenoso',
  flying: 'Voador',
  ice: 'Gelo',
  fighting: 'Lutador',
  ground: 'Terrestre',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  dark: 'Sombrio',
  steel: 'Aço',
  fairy: 'Fada',
  normal: 'Normal'
};

const fetchPokemon = async (pokemon) => {
  try {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!APIResponse.ok) throw new Error('Pokémon não encontrado');
    const data = await APIResponse.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error.message);
    return null;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  pokemonTypes.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] || data['sprites']['front_default'];

    // Gera spans para cada tipo com tradução
    const types = data.types.map(typeInfo => {
      const typeName = typeInfo.type.name;
      const translatedType = typeTranslations[typeName] || typeName;
      return `<span class="pokemonTypes type-${typeName}">${translatedType}</span>`;
    });
    pokemonTypes.innerHTML = types.join(' ');

    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not Found';
    pokemonNumber.innerHTML = '';
    pokemonTypes.innerHTML = 'N/A';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);