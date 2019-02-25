import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {BackendApiService} from '../../../services/backend-api.service';
import {debounceTime, tap, switchMap, finalize} from 'rxjs/operators';
import {PaginationService} from '../../../services/pagination.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

    searchResults: object;
    isLoading;

    constructor(private route: ActivatedRoute, private backendApi: BackendApiService,
                private router: Router, private paginationService: PaginationService) {
                    // enable pagination
                    this.paginationService.paginationEnabled.next(true);
                }

    ngOnInit() {
        // const valsChange = this.route.queryParams
        //     .pipe(
        //         debounceTime(300),
        //         tap(() => this.isLoading = true),
        //         switchMap(value => {
        //             console.log(value);
        //             return this.backendApi.search(typeof value === 'string' ? value : value.query, 1)
        //                 .pipe(
        //                     finalize(() => this.isLoading = false),
        //                 );
        //         }
        //         )
        //     )
        //     .subscribe(users => this.searchResults = users[0]);

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
