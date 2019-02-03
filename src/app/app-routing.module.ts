import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {ListComponent} from './views/results/list/list.component';
import {MapComponent} from './views/results/map/map.component';
import {WelcomeComponent} from './views/welcome/welcome.component';
import {ResultsComponent} from './views/results/results.component';
import {CardsComponent} from './views/results/cards/cards.component';

const routes: Routes = [
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'home', component: HomeComponent},
    {
        path: 'results', component: ResultsComponent,
        children: [
            {path: 'list', component: ListComponent},
            {path: 'map', component: MapComponent},
            {path: 'cards', component: CardsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
