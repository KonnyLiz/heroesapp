import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  heroes: HeroeModel[] = [];

  constructor(
    private heroesService: HeroesService
  ) {
    this.heroesService.getHeroes().subscribe(res => {
      // como viene de firebase, no es un objeto iterable
      console.log(res);
      this.heroes = res;
    });
  }

  ngOnInit(): void {
  }

}
