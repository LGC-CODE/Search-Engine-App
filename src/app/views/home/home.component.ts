import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';
import {AppConfigService} from '../../services/app-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public menuItems;

  constructor(public oktaAuth: OktaAuthService, private appConfigService: AppConfigService) {
      this.appConfigService.toggleMenuItems.subscribe(
          menu => {
            this.menuItems = menu;
          }
      );
   }

  ngOnInit() {
      this.oktaAuth.getUser().then(
          resp => {
              console.log(resp);
          }
      );

      this.menuItems.newSearch = false;
      this.menuItems.addHcp = false;
      this.menuItems.user = true;
      this.appConfigService.toggleMenuItems.next(this.menuItems);
  }

}
