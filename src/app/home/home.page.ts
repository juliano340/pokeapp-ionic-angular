import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  limit = 20;
  offset = 0;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons().subscribe((response) => {
      this.pokemons = response.results.map((pokemon: any) => {
        const id = pokemon.url
          .split('/')
          .filter((x: string) => x)
          .pop();

        return {
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });
    });
  }

  nextPage() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  previousPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadPokemons();
    }
  }

  goToDetails(pokemonName: string) {
    this.router.navigate(['/details', pokemonName]);
  }

  toggleFavorite(pokemon: any) {
    if (this.favoritesService.isFavorite(pokemon.name)) {
      this.favoritesService.removeFavorite(pokemon.name);
    } else {
      this.favoritesService.addFavorite({
        name: pokemon.name,
        imageUrl: pokemon.imageUrl,
      });
    }
  }

  isFavorite(pokemonName: string): boolean {
    return this.favoritesService.isFavorite(pokemonName);
  }
}
