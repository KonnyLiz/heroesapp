import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

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
      this.heroes = res;
    });
  }

  ngOnInit(): void {
  }

  borrarHeroe(heroe: HeroeModel, i: number) {

    // la respuestas se obtienen en una promesa
    Swal.fire({
      title: 'Borrar',
      text: `Esta seguro de borrar a ${heroe.nombre}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(res => {

      if (res.value) {
        this.heroesService.borrarHeroe(heroe.id).subscribe(() => {

          // borramos el elemento del arreglo de heroes
          // posicion, numero de elementos a borrar
          this.heroes.splice(i, 1);
        });
      }
    });

  }

}
