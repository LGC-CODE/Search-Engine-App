import {Component, OnInit} from '@angular/core';
import {AppConfigService} from '../../services/app-config.service';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    public menuItems;

    constructor(private appConfigService: AppConfigService) {
        this.appConfigService.toggleMenuItems.subscribe(
            menu => {
                this.menuItems = menu;
            }
        );
    }

    ngOnInit() {
        this.menuItems.newSearch = true;
        this.menuItems.addHcp = true;
        this.menuItems.user = true;
        this.appConfigService.toggleMenuItems.next(this.menuItems);
    }

}
