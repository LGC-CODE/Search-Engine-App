import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public oktaAuth: OktaAuthService) { }

  ngOnInit() {
      this.oktaAuth.getUser().then(
          resp => {
              console.log(resp);
          }
      );
  }

}
