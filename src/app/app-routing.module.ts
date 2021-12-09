import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeComponent } from './components/heroe/heroe.component';
import { ListaComponent } from './components/lista/lista.component';

const ROUTES: Routes = [
{path: 'lista', component: ListaComponent},
{path: 'heroe/:id', component: HeroeComponent},
{path: '**', pathMatch: 'full', redirectTo: 'lista'},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
