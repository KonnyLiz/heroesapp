import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private URL = 'https://heroesapp-de139-default-rtdb.firebaseio.com';

  constructor(
    private http: HttpClient
  ) { }

  // el .json en los endpoints son propios de firebase
  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.URL}/heroes.json`, heroe).pipe(
      map((res: any) => {
        heroe.id = res.name;
        console.log('heroe agregado');
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    };

    // el campo a borrar debe ser opcional en el interface
    delete heroeTemp.id;

    console.log('heroe actualizado');

    return this.http.put(`${this.URL}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroe(id: string  | null) {
    return this.http.get(`${this.URL}/heroes/${id}.json`);
  }

  getHeroes() {
    return this.http.get(`${this.URL}/heroes.json`).pipe(
      map(this.crearArreglo)
      // tambien se puede reumir asi
      // le decimos que la res sera el primero argumento de la funcion
      // map( res => this.crearArreglo(res))
    );
  }

  // funcion para sacar los datos del objeto respuesta
  private crearArreglo(heroesObj: any) {
    const heroes: HeroeModel[] = [];

    // validando que hayan datos en la respuesta
    // si no, devolvemos un arreglo vacio
    if (heroesObj === null) {
      return [];
    }

    // // creamos un arreglo de ids
    const ids: any = [];
    Object.keys(heroesObj).forEach(k => {
      let id = k;
      ids.push(id);
    });

    // asignamos el valor de cada array al heroe
    let c = 0;
    Object.values(heroesObj).forEach((i: any) => {
      let h: HeroeModel = new HeroeModel;
      h = i;

    //   // agregamos el id
      h.id =ids[c];
      c ++;

    //   // agregamos al arreglo nuevo de heroes
      heroes.push(h);
    });

    return heroes;
  }
}
