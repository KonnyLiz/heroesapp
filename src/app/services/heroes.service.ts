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

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.URL}/heroes.json`, heroe).pipe(
      map((res: any) => {
        heroe.id = res.name;
        console.log('heroe agregado');
        return heroe;
      })
    );
  }
}
