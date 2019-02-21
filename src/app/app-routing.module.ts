import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {ListComponent} from './views/results/list/list.component';
import {MapComponent} from './views/results/map/map.component';
import {WelcomeComponent} from './views/welcome/welcome.component';
import {ResultsComponent} from './views/results/results.component';
import {CardsComponent} from './views/results/cards/cards.component';
import {LoginComponent} from './views/auth/login/login.component';
import {AuthComponent} from './views/auth/auth.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import {ViewComponent} from './views/hcp/view/view.component';

export function onAuthRequired({oktaAuth, router}) {
    router.navigate(['/login']);
}

const routes: Routes = [
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'home', component: HomeComponent, canActivate: [OktaAuthGuard], data: onAuthRequired},
    {
        path: 'results', component: ResultsComponent, canActivate: [OktaAuthGuard], data: onAuthRequired, // result views
        children: [
            {path: 'list', component: ListComponent},
            {path: 'map', component: MapComponent},
            {path: 'cards', component: CardsComponent}
        ]
    },
    {
        path: 'auth', component: AuthComponent, // authentication paths
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', component: LoginComponent}
        ]
    },
    {
        path: 'full-hcp', component: ViewComponent, // view full hcp
    },
    {
        path: 'implicit/callback',
        component: OktaCallbackComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
