import {Component, OnInit} from '@angular/core';
import {AppConfigService} from '../../services/app-config.service';
import {ActivatedRoute} from '@angular/router';
import {PaginationService} from '../../services/pagination.service';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    public menuItems;
    public activeRoute;
    public paginationEnabled;

    constructor(private appConfigService: AppConfigService, private route: ActivatedRoute,
                private paginationService: PaginationService) {
        this.appConfigService.toggleMenuItems.subscribe(
            menu => {
                this.menuItems = menu;
            }
        );

        this.paginationService.paginationEnabled.subscribe(
            enabled => {
                this.paginationEnabled = enabled;
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
