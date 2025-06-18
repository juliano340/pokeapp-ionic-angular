import { Component, OnInit } from '@angular/core';
import {
  FavoritesService,
  FavoritePokemon,
} from '../../services/favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements OnInit {
  favoritePokemons: FavoritePokemon[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoritePokemons = this.favoritesService.getFavorites();
  }

  goToDetails(pokemonName: string) {
    this.router.navigate(['/details', pokemonName]);
  }
}
