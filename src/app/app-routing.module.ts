import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {ListComponent} from './views/results/list/list.component';
import {MapComponent} from './views/results/map/map.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'list', component: ListComponent},
    {path: 'map', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
