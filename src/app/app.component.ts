import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
import {OktaAuthService} from '@okta/okta-angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isAuthenticated: boolean;

    constructor(public oktaAuth: OktaAuthService, public router: Router) {
        this.oktaAuth.$authenticationState.subscribe(
            (isAutheticated: boolean) => this.isAuthenticated = isAutheticated
        );
    }

    async ngOnInit() {
        this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    }
}
