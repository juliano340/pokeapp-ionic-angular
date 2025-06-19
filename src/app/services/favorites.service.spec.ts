import { TestBed } from '@angular/core/testing';
import { FavoritesService, FavoritePokemon } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
    localStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve adicionar um Pokémon aos favoritos', () => {
    const pokemon: FavoritePokemon = {
      name: 'pikachu',
      imageUrl: 'url-pikachu',
    };
    service.addFavorite(pokemon);
    const favorites = service.getFavorites();
    expect(favorites.length).toBe(1);
    expect(favorites[0].name).toBe('pikachu');
  });

  it('não deve adicionar o mesmo Pokémon duas vezes', () => {
    const pokemon: FavoritePokemon = {
      name: 'pikachu',
      imageUrl: 'url-pikachu',
    };
    service.addFavorite(pokemon);
    service.addFavorite(pokemon);
    const favorites = service.getFavorites();
    expect(favorites.length).toBe(1);
  });

  it('deve remover um Pokémon dos favoritos', () => {
    const pokemon: FavoritePokemon = {
      name: 'pikachu',
      imageUrl: 'url-pikachu',
    };
    service.addFavorite(pokemon);
    service.removeFavorite('pikachu');
    const favorites = service.getFavorites();
    expect(favorites.length).toBe(0);
  });

  it('deve verificar corretamente se um Pokémon está nos favoritos', () => {
    const pokemon: FavoritePokemon = {
      name: 'pikachu',
      imageUrl: 'url-pikachu',
    };
    service.addFavorite(pokemon);
    expect(service.isFavorite('pikachu')).toBeTrue();
    expect(service.isFavorite('charmander')).toBeFalse();
  });
});
