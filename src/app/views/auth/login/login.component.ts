import {Component, OnInit} from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public signIn;
    public isAuthenticated;
    public widget = new OktaSignIn({
        baseUrl: 'https://dev-298781.oktapreview.com',
        logo: '/assets/welcome/incyte_logo.png',
        helpLinks: {
            custom: [
                {
                    text: 'Single Sign-On is enabled',
                    href: '#'
                }
            ]
        }
    });

    constructor(public oktaAuth: OktaAuthService, public router: Router) {
        this.signIn = oktaAuth;

        this.oktaAuth.$authenticationState.subscribe(
            (isAuthenicated: boolean) => {
                this.isAuthenticated = isAuthenicated;
                console.log(this.isAuthenticated);
                this.router.navigate(['/home']);
            }
        );
    }

    login() {
        this.oktaAuth.loginRedirect('/home');
    }

    logout() {
        this.oktaAuth.logout('/');
    }

    async ngOnInit() {

        this.isAuthenticated = await this.oktaAuth.isAuthenticated().then(
            resp => {
                console.log(resp);
                if (resp) {
                    this.router.navigate(['/home']);
                }
            }
        );

        this.widget.renderEl({
            el: '#okta-signin-container'
        },
            (res) => {
                console.log(res);
                if (res.status === 'SUCCESS') {
                    this.signIn.loginRedirect('/home', {sessionToken: res.session.token});
                    // Hide the widget
                    this.widget.hide();
                }
            },
            (err) => {
                throw err;
            }
        );

    }

}
