import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  constructor(private pokeApiService: PokeApiService) { }

  private setAllPokemons: any
  public getAllPokemons: any
  public apiError: boolean = false

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      next => {
        this.setAllPokemons = next.results
        this.getAllPokemons = this.setAllPokemons
      },
      error => {
        this.apiError = true
      }
    )
  }

  public getSearch(value: string){
    const filter = this.setAllPokemons.filter(
      ( next: any) => {
        return !next.name.indexOf(value.toLocaleLowerCase())
      }
    )
    this.getAllPokemons = filter
  }

}
