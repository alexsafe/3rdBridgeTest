export type Pokemon = {
  name: string
  url: string
}

export type Moves = {
  name: string
  url: string
}

export type ChainSpecies = {
  name: string
  url: string
}

export type Chain = {
  evolves_to:Chain[]
  species: ChainSpecies
}

export type Species = {
  name: string
  url: string
  id: string
  pokeUrl:string
  evolution_chain: string
}

export type Sprites = {
  front_default: string,
}

export type Type = {
  name: string
  url: string
}

export type PokemonInfo = {
  id: string
  url:string
  name:string
  sprites:Sprites
  moves: Moves[]
  species: Species
  types: Type[]
}
