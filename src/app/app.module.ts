import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NavigationComponent } from './globals/navigation/navigation.component';
import { HomeComponent } from './views/home/home.component';
import { ListComponent } from './views/results/list/list.component';
import { MapComponent } from './views/results/map/map.component';
import { WelcomeComponent } from './views/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ListComponent,
    MapComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
