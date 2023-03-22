let page = 1

const fetchPokemons = async (page = 1) => {
  const limit = 9
  const offset = (page - 1) * limit
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  const response = await fetch(url)
  const data = await response.json() 
  // console.log(data)
  const dataResults = data.results.map(pokemon => {
    // "url": "https://pokeapi.co/api/v2/pokemon/1/"
    const id = pokemon.url.split('/').at(6) //[6]
    // console.log(id)
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    return {
      ...pokemon, //name, url
      id,
      image
    }

  })
  // console.log(dataResults)
  return dataResults
}

const renderPokemons = (pokemons) => {

  const pokemonsList = document.getElementById('pokemonsList')

  let elements = ''

  pokemons.forEach( pokemon => {
    elements += `
    <article class="pokemons-item" >
      <img src="${pokemon.image}" width="80" heigth="80" />
      <h2>#${pokemon.id} ${pokemon.name}</h2>
    </article>
    
    `
  })

  pokemonsList.innerHTML = elements

}

const documentReady = async () => {
  const nextPage = document.getElementById('nextPage')
  const prevPage = document.getElementById('prevPage')
  const currentPage = document.getElementById('currentPage')

  nextPage.addEventListener('click', async () => {
    // page = page + 1
    const pokemons = await fetchPokemons(++page)
    renderPokemons(pokemons)
    currentPage.innerHTML = page
  })

  prevPage.addEventListener('click', async () => {
    // page = page - 1
    const pokemons = await fetchPokemons(--page)
    renderPokemons(pokemons)
    currentPage.innerHTML = page
  })

  

  const pokemons = await fetchPokemons()
  console.log(pokemons)

  renderPokemons(pokemons)

}

document.addEventListener('DOMContentLoaded', documentReady)

