import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendApiService} from '../../../services/backend-api.service';
import {debounceTime, tap, switchMap, finalize} from 'rxjs/operators';
import {FiltersService} from '../../../services/filters.service';
import {PaginationService} from '../../../services/pagination.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    searchResults: object;
    isLoading;
    openFilter;

    constructor(private route: ActivatedRoute, private backendApi: BackendApiService,
                private filterService: FiltersService, private paginationService: PaginationService,
                private router: Router) {
                    // enable pagination
                    this.paginationService.paginationEnabled.next(true);
                }

    ngOnInit() {
        this.applyFilters();
    }

    applyFilters() {
        this.route.queryParams.subscribe(
            params => {
                    console.log(params);
                    console.log(this.router.url);
                    const activeQuery = this.router.url.split('?')[1];
                    this.backendApi.generateFilteredResults(activeQuery).toPromise().then(
                        resp => {
                            console.log(resp);
                            if (resp[0].length < 20) {
                                this.paginationService.paginationPossible.next(false);
                            } else {
                                this.paginationService.paginationPossible.next(true);
                            }
                            this.searchResults = resp[0];
                        }
                    );
            }
        );
    }

}
