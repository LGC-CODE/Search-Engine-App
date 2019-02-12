import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public oktaAuth: OktaAuthService) { }

  ngOnInit() {
      this.oktaAuth.isAuthenticated().then(
          resp => {
              if (resp) {
                  this.oktaAuth.logout('/');
              }
          }
      );
  }

}
