import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any
  public isLoading: boolean = false
  public apiError: boolean = false

  constructor(
    private activetedRoute: ActivatedRoute,
    private pokeService: PokeApiService
    ) { }

  ngOnInit(): void {
    this.getPokemon()
  }

  public getPokemon(){
    const id = this.activetedRoute.snapshot.params['id']
    const pokemon = this.pokeService.apiGetPokemon(`${this.urlPokemon}/${id}`)
    const name = this.pokeService.apiGetPokemon(`${this.urlName}/${id}`)
    console.log(pokemon);

    return forkJoin([pokemon, name]).subscribe(
      next => {
        this.pokemon = next
        this.isLoading = true
      },
      error => {
        this.pokemon = true
      }
    )
  }
}
