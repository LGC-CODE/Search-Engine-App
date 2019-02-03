import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NavigationComponent} from './globals/navigation/navigation.component';
import {HomeComponent} from './views/home/home.component';
import {ListComponent} from './views/results/list/list.component';
import {MapComponent} from './views/results/map/map.component';
import {WelcomeComponent} from './views/welcome/welcome.component';
import {RequestCardComponent} from './components/request-card/request-card.component';
import {MessagesCardComponent} from './components/messages-card/messages-card.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule,
         MatAutocompleteModule, MatProgressSpinnerModule, MatTableModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ResultsComponent } from './views/results/results.component';
import { CardsComponent } from './views/results/cards/cards.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        HomeComponent,
        ListComponent,
        MapComponent,
        WelcomeComponent,
        RequestCardComponent,
        MessagesCardComponent,
        SearchBarComponent,
        ResultsComponent,
        CardsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatTableModule
    ],
    exports: [
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatTableModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
