import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
     if(id !== 'nuevo'){
this.heroesService
     }
  }

  guardar(formulario: NgForm) {
    if (formulario.invalid) {
      console.error('Formulario invalido');
    }

    // creando el alert
    Swal.fire({
      title: 'Espere',
      text: 'Guardando...',
      icon: 'info',

      // para que cuando den click afuera no cierre
      allowOutsideClick: false
    });

    // para mostrar un cargando y no se cierre
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      // si existe vamos a actualizar
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      // si no, vamos a crear
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(res => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se guardo correctamente',
        icon: 'success'
      });
    });

  }

}
