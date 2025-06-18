import { Injectable } from '@angular/core';

export interface FavoritePokemon {
  name: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageKey = 'favoritePokemons';

  constructor() {}

  getFavorites(): FavoritePokemon[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addFavorite(pokemon: FavoritePokemon) {
    const favorites = this.getFavorites();
    if (!favorites.some((fav) => fav.name === pokemon.name)) {
      favorites.push(pokemon);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(pokemonName: string) {
    const favorites = this.getFavorites().filter(
      (fav) => fav.name !== pokemonName
    );
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(pokemonName: string): boolean {
    return this.getFavorites().some((fav) => fav.name === pokemonName);
  }
}
